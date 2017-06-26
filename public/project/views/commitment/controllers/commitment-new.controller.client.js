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

        init();

        function init() {
            model.allAreas = [];

            model.area1 = {
                title: "Drought",
                status: false
            };
            model.area2 = {
                title: "Floods",
                status: false
            };
            model.area3 = {
                title: "Earthquakes",
                status: false
            };
            model.area4 = {
                title: "Temperature Extremes",
                status: false
            };
            model.area5 = {
                title: "Wildfires",
                status: false
            };
            model.area6 = {
                title: "Severe Storms",
                status: false
            };
            model.area7 = {
                title: "Sea and Lake Ice",
                status: false
            };

            model.allAreas.push(model.area1);
            model.allAreas.push(model.area2);
            model.allAreas.push(model.area3);
            model.allAreas.push(model.area4);
            model.allAreas.push(model.area5);
            model.allAreas.push(model.area6);
            model.allAreas.push(model.area7);

        }

        // implementation
        function createCommitment(commitment) {
            var newCommitment = {
                name: commitment.name,
                affectedEcoAreas: []
            };

            for(var i=0; i<model.allAreas.length; i++) {
                if(model.allAreas[i].status) {
                    newCommitment.affectedEcoAreas.push(model.allAreas[i].title);
                }
            }

            commitmentService
                .createCommitment(model.userId, newCommitment)
                .then(function(response) {
                    $location.url("/user/" + model.userId);
                });
        }
    }
})();