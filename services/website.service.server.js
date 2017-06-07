/**
 * Created by Mitko on 6/3/17.
 */
var app = require('../express');

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
    var site = req.body;
    site._id = (new Date()).getTime() + "";
    websites.push(site);
    res.json(site);
}

function findAllWebsitesForUser(req, res) {
    var devId = req.params.userId;
    var resSet = [];
    for(var w in websites) {
        if(websites[w].developerId===devId) {
            resSet.push(websites[w]);
        }
    }

    res.json(resSet);
}

function findWebsiteById(req, res) {
    var sid = req.params['websiteId'];
    for(var w in websites) {
        if(websites[w]._id===sid) {
            res.json(websites[w]);
            return;
        }
    }
    res.json(null);
}

function updateWebsite(req, res) {
    var site = req.body;
    console.log(site);
    var siteId = req.params['websiteId'];

    for(var w in websites) {
        if(websites[w]._id === siteId) {
            websites[w] = site;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {
    var siteId = req.params.websiteId;
    var site = websites.find(function (site) {
        return site._id === siteId;
    });
    var index = websites.indexOf(site);
    websites.splice(index, 1);
    res.sendStatus(200);
}