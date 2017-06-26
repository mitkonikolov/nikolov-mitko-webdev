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
        model.title = $routeParams['title'];
        model.userId = $routeParams['userId'];

/*        model.searchForAllCategories = searchForAllCategories;
        model.getCategoryDetails = getCategoryDetails;
        model.searchEventInDays = searchEventInDays;*/

        init();

        function init() {
            console.log(model.title);
            eonetService
                .searchEventInDays(model.category.id, days)
                .then(function(response) {
                    model.selectedEvents = response.data.events;
                    var ev = model.selectedEvents.find(function(ev) {
                        return ev.title === model.title;
                    });
                    model.selectedEvent = ev;
                    console.log(model.selectedEvent);
                });
        }

/*        function searchForAllCategories() {
            eonetService
                .searchForAllCategories()
                .then(function(res) {
                   model.categories=res.data.categories;
                });
        }

        function getCategoryDetails(id) {
            var categorie = model.categories.find(function(categorie) {
                return categorie.id === id;
            });
            model.category = categorie;
        }

        function searchEventInDays(days) {
            eonetService
                .searchEventInDays(model.category.id, days)
                .then(function(response) {
                    model.selectedEvents = response.data.events;
                });
        }*/
    }
})();