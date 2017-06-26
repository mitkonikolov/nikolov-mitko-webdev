(function () {
    angular
        .module('Project')
        .controller('commitmentListAllController', commitmentListAllController);
    
    function commitmentListAllController($routeParams,
                                         commitmentService,
                                         userService,
                                         $location,
                                         $timeout,
                                         $q) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.userCommits = userCommits;

        init();

        function init() {
            commitmentService
                .findAllCommitments()
                .then(function(response) {
                    model.allCommitments = response;
                })
        }

        function userCommits(commitment) {
            var found = false;
            for(var i=0; i<commitment.users.length; i++) {
                if(commitment.users[i] === model.userId) {
                    found = true;
                    break;
                }
            }

            if(found) { // the user has already made this commitment
                model.message = "You have already made this commitment!"
            }
            else { // the user has not made this commitment just yet
                commitment.users.push(model.userId);
                commitmentService
                    .updateCommitment(model.userId, commitment._id, commitment)
                    .then(function(response) {
                        return userService.findUserById(model.userId);
                    })
                    .then(function(user) {
                        user.commitments.push(commitment._id);
                        return userService.updateUser(model.userId, user);
                    })
                    .then(function(response) {
                        model.successCommittingMessage = "You successfully committed to the goal!"
                    });
            }
        }
    }
})();