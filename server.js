// var app = require('./express');
//
// app.set('view engine', 'ejs');
// require('./utilities/filelist');
//
// app.use(app.express.static(__dirname + '/public'));
//
// var blog = require('./lectures/graduate/blog/app');
// blog(app);
//
// var todo = require('./lectures/undergraduate/todo/app');
// todo(app);
//
// app.listen(process.env.PORT || 3000);


var app = require('./express.js');
//var app = express();

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);

require('./assignment/app');

var port = process.env.PORT || 3000;

app.listen(port);