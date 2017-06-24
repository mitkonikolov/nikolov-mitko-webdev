
var mongoose = require('mongoose');

var commitmentSchema = mongoose.Schema({
    name: String,
    shareable: {type: Boolean, require: true},
    users: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}],
    affectedEcoAreas: [{type: String, require: true}]
}, {collection: "commitment"});

module.exports = commitmentSchema;