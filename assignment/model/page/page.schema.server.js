
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name: {type: String},
    title: {type: String},
    description: {type: String},
    widgets: [{type: mongoose.Schema.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date}
}, {collection: "page"});

module.exports = pageSchema;