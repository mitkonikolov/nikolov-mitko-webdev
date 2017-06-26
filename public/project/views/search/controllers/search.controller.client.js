/**
 * Created by Mitko on 6/15/17.
 */
(function() {
    angular
        .module('Project')
        .controller('searchController', searchController);

    function searchController($routeParams,
                              eonetService,
                              $location,
                              $rootScope) {
        var model = this;

        init();

        function init() {
            model.category;
            model.userId = $routeParams['userId'];
            if(typeof model.userId === 'undefined') {
                model.userId = "anonymous";
            }
        }

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
            model.categoryId = categorie.id;
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
            $rootScope.selectedEvent = model.selectedEvent;
            $location.url("/user/" + model.userId + "/search/details")
        }
    }
})();