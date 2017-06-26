(function () {
    angular
        .module('Project')
        .controller('commitmentDetailsController', commitmentDetailsController);
    
    function commitmentDetailsController($routeParams,
                                         commitmentService,
                                         userService,
                                         $q) {

        var model = this;
        model.shareWith = shareWith;

        model.userId = $routeParams['userId'];
        model.commitmentId = $routeParams['commitmentId'];
        model.updateCommitment = updateCommitment;

        function init() {
            commitmentService
                .findCommitmentById(model.userId, model.commitmentId)
                .then(function(response) {
                    model.commitment = response;
                    model.committedUsers = [];

                    model.name = model.commitment.name;
                    model.shareable = model.commitment.shareable;

                    var promises = [];

                    for(var i=0; i<model.commitment.users.length; i++) {
                        promises.push(userService.findUserById(model.commitment.users[i]));
                    }

                    $q.all(promises).then(function(users) {
                        for(i=0; i<users.length; i++) {
                            model.committedUsers.push(users[i]);
                        }
                    });
                });
        }
        init();



        function shareWith(uid, commitmentId) {

            var found = false;
            var user1, user2;

            userService
                .findUserById(model.userId)
                .then(function(user) {
                    user1 = user;

                    for(var i=0; i<user1.commitments.length; i++) {
                        if(user1.commitments[i] === commitmentId) {
                            found = true;
                            break;
                        }
                    }

                    if(found) { // the current user has already made the commitment (as required to share)

                        var res = user1.sharingWith.find(function(res) {
                           return res === uid;
                        });

                        if(res) {
                            model.sharingSuccessfulMessage = "Sharing successful!";
                        }
                        else {
                            user1.sharingWith.push(uid);

                            userService
                                .updateUser(user1._id, user1)
                                .then(function (response) {
                                    return userService.findUserById(uid);
                                })
                                .then(function (user) {
                                    user2 = user;
                                    user2.sharingWith.push(model.userId);
                                    return userService.updateUser(user2._id, user2)
                                })
                                .then(function (response) {
                                    model.sharingSuccessfulMessage = "Sharing successful!";
                                });
                        }
                    }
                    else { // the user should first make the commitment
                        model.commitFirstMessage = "Please commit to the task before you share it with another user."
                    }
                });
        }


        function updateCommitment(name, shareable) {
            model.successUpdateMessage = null;
            model.pleaseChangeMessage = null;

            if(name===model.commitment.name && shareable === model.commitment.shareable) {
                model.pleaseChangeMessage = "Please change data before clicking update";
            }
            else {
                var commitment = {
                    name: name,
                    shareable: shareable,
                    users: model.commitment.users
                };

                commitmentService
                    .updateCommitment(model.userId, model.commitment._id, commitment)
                    .then(function (response) {
                        model.successUpdateMessage = "The commitment was updated successfully!";
                        return commitmentService.findCommitmentById(model.userId, model.commitmentId)
                    })
                    .then(function(commitmentNew) {
                        model.commitment = commitmentNew;
                        model.commitment.shareable = commitmentNew.shareable;
                    })
            }
        }


    }
})();