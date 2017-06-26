
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    userRole: {type: String, require: true, default: "user"}, // value will be either user or admin
    firstName: String,
    lastName: String,
    publicEmail: Boolean,
    email: {type: String, require: true},
    publicCommitments: Boolean,
    commitments: [{type: mongoose.Schema.ObjectId, ref:"CommitmentModel"}],
    sharingWith: [{type: mongoose.Schema.ObjectId, ref:"UserModel"}],
    facebook: {
        id:    String,
        token: String
    },
    dateCreated: Date

}, {collection: "user"});

module.exports = userSchema;