
var app = require('../../../../express');
var userModel = require('../../model/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Passport user serialization
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            });
}

passport.use(new LocalStrategy(localStrategy));

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function(user) {
            if(!user) {
                var response1 = {
                    response: "incorrect credentials"
                };
                return done(null, response1);
            }
            else {
                if (user.username === username && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
                else {
                    var response2 = {
                        response: "incorrect credentials"
                    };
                    return done(null, response2);
                    // return done(null, false);
                }
            }
        },
        function(err) {
            if(err) {
                return done(err);
            }
            else {
                return done(null, false);
            }
        });
}

// Loging in and loging out
app.post('/api/login',passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.post ('/api/register', register);
app.get ('/api/loggedin', loggedin);

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}


function register (req, res) {
    var user = req.body;
    if(user.userRole==='admin') {
        if(user.secret && user.secret === process.env.REG_SECRET) {
            finish();
        }
        else {
            var response = {
                response: "incorrect secret"
            };
            res.json(response);
        }
    }
    else {
        finish();
    }


    function finish() {
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
    }
}


function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}





// Facebook

var FacebookStrategy = require('passport-facebook').Strategy;

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/user',
        failureRedirect: '/project/index.html#!/login'
    }));
app.get ('/api/currentUser', findCurrentUser);

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function(user) {
            if(user===null) {
                var user1 = {
                    username: profile.displayName,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };

                return userModel
                    .createUser(user1)
                    .then(function (response) {
                        return done(null, response);
                    })
            }
            else {
                return userModel
                    .updateFacebookToken(user._id, profile.id, token)
                    .then(function (response) {
                        return done(null, user);
                    })
            }
        })
}


function findCurrentUser(req, res) {
    var user = req.user;
    res.json(user);
}




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