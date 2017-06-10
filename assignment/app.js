/**
 * Created by Mitko on 6/3/17.
 */
/*var app = require('../express');
require('../services/user.service.server.js');*/
var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost/webdev_assn');

app.get('/goodbye', sayBye);

require('../services/user.service.server.js');
require('../services/website.service.server.js');
require('../services/page.service.server.js');
require('../services/widget.service.server.js');

function sayBye() {
    return console.log("bye");
}


/*module.exports = function(app) {
    require('../services/user.service.server.js');/!*
    require("./services/website.service.server.js");
    require("./services/page.service.server.js");
    require("./services/widget.service.server.js");*!/
};*/

