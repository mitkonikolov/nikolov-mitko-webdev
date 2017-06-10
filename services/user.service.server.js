/**
 * Created by Mitko on 6/3/17.
 */

var app = require('../express');
var userModel = require('../assignment/model/user/user.model.server');

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.post("/api/user", createUser);
app.get("/api/user", findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findUser(req, res) {
    if(req.query['username'] && req.query['password']) {
        findUserByCredentials(req, res);
    }
    else {
        findUserByUsername(req, res);
    }
}

function findUserByCredentials(req, res) {
    var uname = req.query['username'];
    var pass = req.query['password'];
    userModel
        .findUserByCredentials(uname, pass)
        .then(function(user) {
            console.log("user is " + user);
            res.json(user);
        });
}

function findUserByUsername(req, res) {
    var uname = req.query['username'];
    userModel
        .findUserByUsername(uname)
        .then(function(user) {
            res.json(user);
        });
}

function findUserById(req, res) {
    var userId = req.param('userId');
    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    userModel
        .updateUser(userId, user)
        .then(function(message){
            res.sendStatus(200);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function(status) {
            res.sendStatus(status);
        });
}