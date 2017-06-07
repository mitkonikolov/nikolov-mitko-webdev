/**
 * Created by Mitko on 6/3/17.
 */

var app = require('../express');

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
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
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
    for(var u in users) {
        if(users[u].username === uname && users[u].password === pass) {
            res.json(users[u]);
            return;
        }
    }
    res.json(null);
}

function findUserByUsername(req, res) {
    var uname = req.query['username'];
    for(var u in users) {
        if(users[u].username === uname) {
            console.log(users[u]);
            res.json(users[u]);
            return;
        }
    }
    res.json(null);
}

function findUserById(req, res) {
    var userId = req.param('userId');
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    for(var u in users) {
        user1 = users[u];
        if(userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}