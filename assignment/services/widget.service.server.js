/**
 * Created by Mitko on 6/3/17.
 */
var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

var widgetModel = require('../model/widget/widget.model.server');


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "111", "widgetType": "HEADING", "pageId": "432", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://cdntbs.astonmartin.com/sitefinity/Vanquish%202016/vanquish-s/IMG_3465-RT-image2.jpg"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/MOVOaGbbsTs" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "891", "widgetType": "HTML", "pageId": "321", "text": " <p>Dwayne Johnson hosted his fifth " +
    "episode of <em>Saturday Night Live </em>over the weekend, helming this year’s season finale with a mix" +
    " of the weird,the political, and the OMIGOD hide your children and your wives from this guy.<br></p> <p>Johnson" +
    " returned to <em>Saturday Night Live</em> with his typical flair and gusto, which included a pretty funny " +
    "sketch on a<em> Jurassic Park</em> ride (T-Rex hand puppet and all), the Scorpio superhero, and a <em>WWE</em> promo" +
    " that harkened back to Johnson’s early days as “The Rock.” But sadly, it wasn’t <em>SNL</em>’s finest this season," +
    "leaving things on a pretty average note. It was also the final <em>SNL</em> performances for both Vanessa Bayer " +
    "and Bobby Moynihan, and I’m going to miss both of them a lot.</p> <p>Of course, everybody’s been talking about " +
    "Johnson’s opening monologue, where he “officially” announced that he’s running for President of the United States " +
    "in 2020, with Tom Hanks as his running mate. This follows a recent appearance on <em>The Tonight Show with Jimmy " +
    "Fallon</em>, where he suggested that he has an earnest desire to replace Donald Trump as the next Commander in " +
    "Chief.</p>"}
];

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/page/:pageId/widget", updateIndex);

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function(writeResult) {
            res.json(writeResult);
        });
}

function findAllWidgetsForPage(req, res) {
    var pid = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pid)
        .then(function(widgets) {
            res.json(widgets);
        });
}

function findWidgetById(req, res) {

    var wid = req.params.widgetId;
    widgetModel
        .findWidgetById(wid)
        .then(function(widget) {
            res.json(widget);
        });
}

function updateWidget(req, res) {
    var widget = req.body;
    var wid = req.params['widgetId'];
    widgetModel
        .updateWidget(wid, widget)
        .then(function(writeResult) {
            res.sendStatus(200);
        });
}

function deleteWidget(req, res) {


    var wid = req.params.widgetId;
    widgetModel
        .deleteWidget(wid)
        .then(function(writeResult) {
            if(writeResult.result.n >=1 ) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        });
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

     widgetModel
         .findWidgetById(widgetId)
         .then(function(w) {
            var widget = w;
            //widget = {};
            widget.url = "/uploads/" + filename;
            widget.size = size;
            widget.rows = 1;

            widgetModel
                .updateWidget(widget._id, widget)
                .then(function(status) {
                    var callbackUrl   = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId +
                        "/page/" + pageId + "/widget";

                    res.redirect(callbackUrl);
                });
    });

}

function updateIndex(req, res) {
    var pageId = req.params.pageId;
    var startIndex = req.query['initial'];
    var stopIndex = req.query['final'];

    widgetModel
        .reorderWidget(pageId, startIndex, stopIndex)
        .then(function(response) {
            res.sendStatus(200)
        });
}

