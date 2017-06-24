
var mongoose = require('mongoose');

var commitmentSchema = require('./commitment.schema.server');
var commitmentModel = mongoose.model('CommitmentModel', commitmentSchema);

commitmentModel.createCommitment = createCommitment;
commitmentModel.findCommitmentById = findCommitmentById;
commitmentModel.findAllCommitments = findAllCommitments;
commitmentModel.updateCommitment = updateCommitment;

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
