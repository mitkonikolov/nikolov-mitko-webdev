
var mongoose = require('mongoose');

var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

userModel.findUserByFacebookId = findUserByFacebookId;
userModel.updateFacebookToken = updateFacebookToken;


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

function updateUser(userId, newUser){
    return userModel.update({_id: userId}, {
        $set: {
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            websites: newUser.websites
        }
    });
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
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

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}