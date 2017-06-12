/**
 * Created by Mitko on 6/3/17.
 */
var app = require('../express');
var websiteModel = require('../assignment/model/website/website.model.server');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function(writeResult) {
            res.json(writeResult);
        });
}

function findAllWebsitesForUser(req, res) {
    var devId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(devId)
        .then(function(sites) {
            res.json(sites);
        });
}

function findWebsiteById(req, res) {
    var sid = req.params['websiteId'];
    websiteModel
        .findWebsiteById(sid)
        .then(function(site) {
            res.json(site);
        });
}

function updateWebsite(req, res) {
    var site = req.body;
    var siteId = req.params['websiteId'];
    websiteModel
        .updateWebsite(siteId, site)
        .then(function(writeResult) {
            res.sendStatus(200);
        });
}

function deleteWebsite(req, res) {
    var siteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(siteId)
        .then(function(writeResult) {
            if(writeResult.result.n >=1 ) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        });
}