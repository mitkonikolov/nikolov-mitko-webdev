/**
 * Created by Mitko on 6/15/17.
 */
(function() {
    angular
        .module('Project')
        .controller('searchController', searchController);

    function searchController($routeParams,
                              eonetService,
                              $location) {
        var model = this;
        model.category;
        model.userId = $routeParams['userId'];

        model.searchForAllCategories = searchForAllCategories;
        model.getCategoryDetails = getCategoryDetails;
        model.searchEventInDays = searchEventInDays;
        model.getEventDetails = getEventDetails;

        function searchForAllCategories() {
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
        }
        
        function getEventDetails(title) {
            var ev = model.selectedEvents.find(function(ev) {
                return ev.title === title;
            });
            model.selectedEvent = ev;
        }
    }
})();