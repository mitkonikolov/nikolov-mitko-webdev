
var mongoose = require('mongoose');

var commitmentSchema = mongoose.Schema({
    name: String,
    shareable: {type: Boolean, require: true},
    users: [{type: mongoose.Schema.Types.Mixed}],
    affectedEcoAreas: [{type: String, require: true}]
}, {collection: "commitment"});

module.exports = commitmentSchema;