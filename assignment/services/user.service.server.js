/**
 * Created by Mitko on 6/3/17.
 */

var app = require('../../express');
var userModel = require('../model/user/user.model.server');

var bcrypt = require("bcrypt-nodejs");

/**
 * Login and Authentication
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get   ('/api/assignment/checkLoggedIn', checkLoggedIn);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/register', register);

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    // Encrypt the password
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (!user) {
                return done(null, false);
            }
            else if (user.username === username && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        }, function (err) {
            if (err) {
                return done(err);
            } else {
                return done(null, false);
            }
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

/**
 * End Login and Authentication
 */

/**
 * Facebook Authentication
 */
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};


app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/user',
        failureRedirect: '/assignment/index.html#!/login'
    }));

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (!user) {
                var newUser = {
                    username: profile.displayName,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };

                return userModel
                    .createUser(newUser)
                    .then(function (response) {
                        return done(null, response);
                    })
            } else {
                return userModel
                    .updateFacebookToken(user._id, profile.id, token)
                    .then(function (response) {
                        return done(null, user);
                    })
            }
        })
}
/**
 * End Facebook Authentication
 */

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.post("/api/user", createUser);
app.get("/api/user", findUser);
app.get('/api/assignment/current', getCurrentUser);
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

function getCurrentUser(req, res) {
    var user = req.user;
    res.json(user);
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