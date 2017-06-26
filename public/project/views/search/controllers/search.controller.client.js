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
            model.noEventsFoundMessage = null;
        }

        model.searchForAllCategories = searchForAllCategories;
        model.getCategoryDetails = getCategoryDetails;
        model.searchEventInDays = searchEventInDays;
        model.getEventDetails = getEventDetails;

        function searchForAllCategories() {
            model.noEventsFoundMessage = null;
            eonetService
                .searchForAllCategories()
                .then(function(res) {
                   model.categories=res.data.categories;
                });
        }

        function getCategoryDetails(id) {
            model.noEventsFoundMessage = null;
            var categorie = model.categories.find(function(categorie) {
                return categorie.id === id;
            });
            model.category = categorie;
            model.categoryId = categorie.id;
        }

        function searchEventInDays(days) {
            model.noEventsFoundMessage = null;
            eonetService
                .searchEventInDays(model.category.id, days)
                .then(function(response) {
                    if(response.data.events.length > 1) {
                        model.selectedEvents = response.data.events;
                    }
                    else {
                        model.selectedEvents = null;
                        model.noEventsFoundMessage = "No events of the selected category were found" +
                            " in entered number of days in the past. Please change the category, increase the number " +
                            "or do not input one."
                    }
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