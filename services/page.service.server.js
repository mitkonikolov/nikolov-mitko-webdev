/**
 * Created by Mitko on 6/3/17.
 */
var app = require('../express');

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
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function findAllPagesForWebsite(req, res) {
    var wid = req.params.websiteId;
    var resSet = [];
    for(var p in pages) {
        if(pages[p].websiteId===wid) {
            resSet.push(pages[p]);
        }
    }
    res.json(resSet);
}

function findPageById(req, res) {
    var pid = req.params['pageId'];
    for(var p in pages) {
        if(pages[p]._id===pid) {
            res.json(pages[p]);
            return;
        }
    }
    res.json(null);
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params['pageId'];
    console.log(pageId);

    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}