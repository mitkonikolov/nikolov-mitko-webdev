(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);
    
    function websiteService($http) {

        return {
            createWebsite: createWebsite,
            findAllWebsitesByUser: findAllWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        
        function createWebsite(website) {
            var url1 = "/api/user/" + website.developerId + "/website";
            return $http.post(url1, website)
                .then(function(response) {
                    // extract the website from the response
                    return response.data;
                });
        }

        function findAllWebsitesByUser(userId) {
            var url1 = "/api/user/" + userId + "/website";
            return $http.get(url1)
                .then(function(user) {
                    return user.data;
                });
        }

        function findWebsiteById(websiteId) {
            var url1 = "/api/website/" + websiteId;
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url1 = "/api/website/" + websiteId;
            return $http.put(url1, website)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function deleteWebsite(websiteId) {
            var url1 = "/api/website/" + websiteId;
            return $http.delete(url1)
                .then(function(response) {
                    return response.data;
                });
        }

    }
})();