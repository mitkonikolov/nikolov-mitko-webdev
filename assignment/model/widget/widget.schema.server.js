
var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: "PageModel"},
    type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
    name: {type: String},
    text: {type: String},
    placeholder: {type: String},
    description: {type: String},
    url: {type: String},
    width: {type: String},
    height: {type: String},
    rows: {type: Number},
    size: {type: Number},
    class: {type: String},
    icon: {type: String},
    deletable: {type: Boolean},
    formatted: {type: Boolean},
    dateCreated: {type: Date}
}, {collection: "widget"});

module.exports = widgetSchema;