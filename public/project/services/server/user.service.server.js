
var app = require('../../../../express');
var userModel = require('../../model/user/user.model.server');

app.post("/api/2/user", createUser);
app.get("/api/2/user", findUser);
app.get("/api/2/user/findAll", findAllUsers);
app.get('/api/2/user/:userId', findUserById);
app.put('/api/2/user/:userId', updateUser);
app.delete('/api/2/user/:userId', deleteUser);

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

function findAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function(users) {
            res.json(users)
        });
}

function findUserByCredentials(req, res) {
    var uname = req.query['username'];
    var pass = req.query['password'];
    userModel
        .findUserByCredentials(uname, pass)
        .then(function(user) {
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
        .then(function(object){
            res.sendStatus(200);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function(writeResult) {
            if(writeResult.result.n >= 1) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(404);
            }
        });
}