/**
 * Created by Mitko on 6/15/17.
 */
(function() {
    angular
        .module('Project')
        .controller('searchDetailsController', searchDetailsController);

    function searchDetailsController($routeParams,
                                   eonetService,
                                   $location) {
        var model = this;


/*        model.searchForAllCategories = searchForAllCategories;
        model.getCategoryDetails = getCategoryDetails;
        model.searchEventInDays = searchEventInDays;*/

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
                });
        }
    }
})();