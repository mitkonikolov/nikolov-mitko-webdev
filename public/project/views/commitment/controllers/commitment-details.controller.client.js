(function () {
    angular
        .module('Project')
        .controller('commitmentDetailsController', commitmentDetailsController);
    
    function commitmentDetailsController($routeParams,
                                         commitmentService,
                                         $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.commitmentId = $routeParams['commitmentId'];

        function init() {
            commitmentService
                .findCommitmentById(model.userId, model.commitmentId)
                .then(function(response) {
                    model.commitment = response;
                    console.log(model.commitment);
                })
        }
        init();


    }
})();