(function () {
    angular
        .module('Project')
        .controller('commitmentListAllController', commitmentListAllController);
    
    function commitmentListAllController($routeParams,
                                         commitmentService,
                                         userService) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.userCommits = userCommits;
        model.findByEcoArea = findByEcoArea;
        model.setToMultiGoals = setToMultiGoals;

        init();

        function init() {
            commitmentService
                .findAllCommitments()
                .then(function(response) {
                    model.allCommitments = response;
                    model.single = false;
                })
        }

        function userCommits(commitment) {
            model.message = null;
            model.successCommittingMessage = null;


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

        function findByEcoArea(ecoArea) {
            model.noSuchGoalMessage = null;

            commitmentService
                .findCommitmentsByArea(ecoArea)
                .then(function(response) {
                    if(response.length>0) {
                        model.single = true;
                        model.foundGoals = response;
                    }
                    else {
                        model.noSuchGoalMessage = "No goals found. Please make sure to write your criteria " +
                            "with first capital letter. For example: Drought";
                    }
                });
        }

        function setToMultiGoals() {
            model.noSuchGoalMessage = null;
            model.single = false;
            model.ecoArea = null;
            model.foundGoals = null;
        }
    }
})();