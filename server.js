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


var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);