(function () {
    angular
        .module('Project')
        .controller('commitmentListAllController', commitmentListAllController);
    
    function commitmentListAllController($routeParams,
                                         commitmentService,
                                         userService,
                                         $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.userCommits = userCommits;
        model.shareWith = shareWith;

        function init() {
            commitmentService
                .findAllCommitments()
                .then(function(response) {
                    model.allCommitments = response;
                })
        }
        init();

        function userCommits(commitment) {
            var found = false;
            for(var i=0; i<commitment.users.length; i++) {
                if(commitment.users[i] === model.userId) {
                    found = true;
                    break;
                }
            }

            if(found) {
                model.message = "You have already made this commitment!"
            }
            else {
                var u;

                userService
                    .findUserById(model.userId)
                    .then(function(user) {
                        u=user;
                        var u1 = {
                            _id: u._id,
                            username: u.username,
                            firstName: u.firstName,
                            lastName: u.lastName
                        };

                        commitment.users.push(u1);
                        return commitmentService.updateCommitment(model.userId, commitment._id, commitment);
                    })
                    .then(function(response) {
                        u.commitments.push(commitment._id);
                        return userService.updateUser(u._id, u);
                    })
                    .then(function(response) {
                        $location.url('user/' + model.userId);
                    });
            }
        }

        function shareWith(uid, commitmentId) {

            var found = false;
            var user1, user2;

            userService
                .findUserById(model.userId)
                .then(function(user) {
                    user1 = user;

                    for(var i=0; i<=user1.commitments.length; i++) {
                        if(user1.commitments[i] === commitmentId) {
                            found = true;
                            break;
                        }
                    }

                    if(found) {
                        var commitment = user1.sharingWith.find(function(commitment) {
                            return (commitment.userId === uid && commitment.commId === commitmentId);
                        });

                        if(commitment===undefined) {
                            var comm = {
                                commId: commitmentId,
                                userId: uid
                            };
                            user1.sharingWith.push(comm);

                            userService
                                .updateUser(user1._id, user1)
                                .then(function(response) {
                                    return userService.findUserById(uid);
                                })
                                .then(function(user) {
                                    user2 = user;

                                    var comm2 = {
                                        commId: commitmentId,
                                        userId: model.userId
                                    };

                                    user2.sharingWith.push(comm2);
                                    return userService.updateUser(user2._id, user2)
                                })
                                .then(function(response) {
                                    $location.url('user/' + model.userId);
                                })
                        }
                        else {
                            model.alreadySharingMessage = "You are already sharing this commitment with the selected user."
                        }
                    }
                    else {
                        model.commitFirstMessage = "Please commit to the task before you share it with another user."
                    }
                });
        }
    }
})();