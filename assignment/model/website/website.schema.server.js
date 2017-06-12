
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    name: {type: String},
    description: {type: String},

    pages: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}],

    dateCreated: {type: Date}
}, {collection: "website"});

module.exports = websiteSchema;