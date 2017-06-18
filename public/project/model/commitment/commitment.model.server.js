
var mongoose = require('mongoose');

var commitmentSchema = require('./commitment.schema.server');
var commitmentModel = mongoose.model('CommModelProj', commitmentSchema);

commitmentModel.createCommitment = createCommitment;
commitmentModel.findCommitmentById = findCommitmentById;
commitmentModel.findAllCommitments = findAllCommitments;
commitmentModel.updateCommitment = updateCommitment;
/*commitmentModel.findUserByCredentials = findUserByCredentials;
commitmentModel.findUserByUsername = findUserByUsername;
commitmentModel.updateUser = updateUser;
commitmentModel.deleteUser = deleteUser;*/


module.exports = commitmentModel;


function createCommitment(commitment) {
    return commitmentModel.create(commitment);
}

function findCommitmentById(commitmentId) {
    return commitmentModel.findById(commitmentId);
}

function findAllCommitments() {
    return commitmentModel.find();
}

function updateCommitment(commitmentId, newCommitment){
    return commitmentModel.update({_id: commitmentId}, {
        $set: {
            name: newCommitment.name,
            shareable: newCommitment.shareable,
            users: newCommitment.users,
            affectedEcoAreas: newCommitment.affectedEcoAreas
        }
    });
}

/*
function findUserByCredentials(uname, pass){
    return commitmentModel.findOne({username: uname, password: pass});
}

function findUserByUsername(uname){
    return commitmentModel.findOne({username: uname});
}

function updateUser(userId, newUser){
    return commitmentModel.update({_id: userId}, {
        $set: {
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone/!*,
            websites: newUser.websites*!/
        }
    });
}

function deleteUser(userId){
    return commitmentModel.remove({_id: userId});
}*/
