
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,

    websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],


    facebook: {
        id:    String,
        token: String
    },


    dateCreated: Date
}, {collection: "user"});

module.exports = userSchema;