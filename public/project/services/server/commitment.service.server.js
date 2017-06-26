/**
 * Created by Mitko Nikolov on 6/17/17.
 */

var app = require('../../../../express');
var commitmentModel = require("../../model/commitment/commitment.model.server");

app.get("/api/2/user/:userId/commitment", findAllCommitments); // commitments the user has made(not created)
app.get("/api/2/user/:userId/commitment/:commitmentId", findCommitmentById);
app.get("/api/2/user/commitment/:ecoArea", findCommitmentsByArea);
app.post("/api/2/user/:userId/commitment", createCommitment);
app.put("/api/2/user/:userId/commitment/:commitmentId", updateCommitment);

function findAllCommitments(req, res) {
    commitmentModel
        .findAllCommitments()
        .then(function(response) {
            res.json(response);
        });
}

function createCommitment(req, res) {
    commitmentModel
        .createCommitment(req.body)
        .then(function(response) {
            res.json(response);
        });
}

function findCommitmentsByArea(req, res) {
    var ecoArea = req.params.ecoArea;
    commitmentModel
        .findCommitmentsByArea(ecoArea)
        .then(function(response) {
            res.json(response);
        });
}

function updateCommitment(req, res) {
    var commitmentId = req.params.commitmentId;
    var commitment = req.body;
    commitmentModel
        .updateCommitment(commitmentId, commitment)
        .then(function(response) {
            res.json(response);
        })
}

function findCommitmentById(req, res) {
    var commitmentId = req.params.commitmentId;
    commitmentModel
        .findCommitmentById(commitmentId)
        .then(function(response) {
            res.json(response);
        });
}