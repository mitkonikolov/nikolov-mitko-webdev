(function () {
    angular
        .module('Project')
        .controller('commitmentPersonalController', commitmentPersonalController);
    
    function commitmentPersonalController($routeParams,
                                          commitmentService,
                                          userService,
                                          $q) {

        var model = this;
        model.userId = $routeParams['userId'];

        init();

        function init() {
            userService
                .findUserById(model.userId)
                .then(function(user) {
                    model.allCommitments = [];
                    var promises = [];
                   for(var i=0; i<user.commitments.length; i++) {
                       promises.push(commitmentService.findCommitmentById(model.userId, user.commitments[i]));
                   }

                   $q.all(promises).then(function(response) {
                       for(i=0; i<response.length; i++) {
                           model.allCommitments.push(response[i]);
                       }
                   });
                });
        }
    }
})();