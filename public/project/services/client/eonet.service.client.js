/**
 * Created by Mitko.
 */
(function() {
    angular
        .module('Project')
        .service('eonetService', eonetService);

    function eonetService($http) {
        this.searchForAllCategories = searchForAllCategories;
        this.searchEventInDays = searchEventInDays;
        this.searchByTitle = searchByTitle;

        var urlBase = "https://eonet.sci.gsfc.nasa.gov/api/v2.1";

        function searchForAllCategories() {
            var url = urlBase + "/categories";
            return $http.get(url);
        }

        function searchEventInDays(categoryID, days) {
            var url = urlBase + "/categories/" + categoryID + "?status=closed&days=" + days;
            return $http.get(url);
        }

        function searchByTitle(categoryID, title) {
            var url = urlBase + "/categories/" + categoryID + "?title=" + title;
            return $http.get(url);
        }
    }
})();