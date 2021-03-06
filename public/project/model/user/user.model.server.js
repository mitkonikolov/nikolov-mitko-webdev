
var mongoose = require('mongoose');

var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.updateFacebookToken = updateFacebookToken;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;


module.exports = userModel;


function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findUserByCredentials(uname, pass){
    return userModel.findOne({username: uname, password: pass});
}

function findUserByUsername(uname){
    return userModel.findOne({username: uname});
}

function findAllUsers() {
    return userModel.find({});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function updateFacebookToken(userId, facebookId, token) {
    var facebook = {
        id: facebookId,
        token: token
    };

    return userModel
        .update({_id: userId}, {
            $set : {
                facebook: facebook
            }
        });
}


function updateUser(userId, newUser){
    return userModel.update({_id: userId}, {
        $set: {
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            userRole: newUser.userRole,
            publicEmail: newUser.publicEmail,
            email: newUser.email,
            publicCommitments: newUser.publicCommitments,
            commitments: newUser.commitments,
            sharingWith: newUser.sharingWith
        }
    });
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}