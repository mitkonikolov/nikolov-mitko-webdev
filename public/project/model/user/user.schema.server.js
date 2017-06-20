
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    publicEmail: Boolean,
    email: {type: String, require: true},
    publicCommitments: Boolean,
    commitments: [{type: mongoose.Schema.ObjectId, ref:"CommModelProj"}],
    sharingWith: [{type: mongoose.Schema.Types.Mixed}],
    dateCreated: Date
}, {collection: "user"});

module.exports = userSchema;