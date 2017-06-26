/**
 * Created by Mitko on 6/15/17.
 */
(function() {
    angular
        .module('Project')
        .controller('searchDetailsController', searchDetailsController);

    function searchDetailsController($routeParams,
                                   eonetService,
                                   commitmentService,
                                   $location) {
        var model = this;

        init();

        function init() {


            model.categoryId = $routeParams['category'];
            model.eventTitle = $routeParams['eventTitle'];
            model.userId = $routeParams['userId'];
            model.days = $routeParams['days'];

            eonetService
                .searchEventInDays(model.categoryId, model.days)
                .then(function(response) {
                    model.selectedEvents = response.data.events;

                    var ev = model.selectedEvents.find(function(ev) {
                        return ev.title === model.eventTitle;
                    });
                    model.selectedEvent = ev;
                    return commitmentService.findAllCommitments();
                })
                .then(function(response) {

                    function mySearch(array, value) {
                        var res = array.find(function(res) {
                            return res === value;
                        });

                        return res;
                    }

                    model.goals = [];

                    for(var i = 0; i<model.selectedEvent.categories.length; i++) {
                        for(var p=0; p<response.length; p++) {
                            if(mySearch(response[p].affectedEcoAreas, model.selectedEvent.categories[i].title)) {
                                model.goals.push(response[p].name);
                            }
                        }
                    }
                });
        }
    }
})();