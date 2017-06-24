(function () {
    angular
        .module('Project')
        .controller('commitmentNewController', commitmentNewController);
    
    function commitmentNewController($routeParams,
                                  commitmentService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.commitment = null;

        // event handlers
        model.createCommitment = createCommitment;

        // implementation
        function createCommitment(commitment) {
            var newCommitment = {
                name: commitment.name,
                affectedEcoAreas: []
            };

            newCommitment.affectedEcoAreas.push(commitment.ecoArea);

            commitmentService
                .createCommitment(model.userId, newCommitment)
                .then(function(response) {
                    $location.url("/user/" + model.userId);
                })
        }
    }
})();