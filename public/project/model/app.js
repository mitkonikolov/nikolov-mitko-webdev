
var app = require('../../../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://127.0.0.1:27017/webdev_project'; // local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139761.mlab.com:39761/heroku_rnp1gfws'; // user yours
}

mongoose.connect(connectionString);

require('../services/server/user.service.server');
require('../services/server/commitment.service.server');

