/**
 * Created by Mitko on 6/3/17.
 */
var app = require('../express');
var pageModel = require('../assignment/model/page/page.model.server');


var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem1" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem2" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem3" }
];

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function(writeResult) {
            res.json(writeResult);
        });
}

function findAllPagesForWebsite(req, res) {
    var wid = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(wid)
        .then(function(pages) {
            res.json(pages);
        });
}

function findPageById(req, res) {
    var pid = req.params.pageId;
    pageModel
        .findPageById(pid)
        .then(function(page) {
            res.json(page);
        });
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatePage(pageId, page)
        .then(function(writeResult) {
            res.sendStatus(200);
        });
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .deletePage(pageId)
        .then(function(writeResult) {
            if(writeResult.result.n >=1 ) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        });
}