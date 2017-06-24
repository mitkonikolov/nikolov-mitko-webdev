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

        function init() {
            commitmentService
                .findCommitmentById(model.userId, model.commitmentId)
                .then(function(response) {
                    model.commitment = response;
                    model.committedUsers = [];

                    var promises = [];

                    for(var i=0; i<model.commitment.users.length; i++) {
                        promises.push(userService.findUserById(model.commitment.users[i]));
                    }

                    $q.all(promises).then(function(users) {
                        for(i=0; i<users.length; i++) {
                            model.committedUsers.push(users[i]);
                        }
                    });
                })
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
                        user1.sharingWith.push(uid);

                        userService
                            .updateUser(user1._id, user1)
                            .then(function(response) {
                                return userService.findUserById(uid);
                            })
                            .then(function(user) {
                                user2 = user;

                                user2.sharingWith.push(model.userId);
                                return userService.updateUser(user2._id, user2)
                            })
                            .then(function(response) {
                                model.sharingSuccessfulMessage = "Sharing successful!";
                                $timeout(function() {
                                    $location.url('user/' + model.userId);
                                }, 3000);

                            })
                    }
                    else { // the user should first make the commitment
                        model.commitFirstMessage = "Please commit to the task before you share it with another user."
                    }
                });
        }


    }
})();