(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);
    
    function pageService($http) {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem1" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem2" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem3" }
            ];

        return {
            createPage: createPage,
            findAllPagesForWebsite: findAllPagesForWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        
        function createPage(page) {
            var url1 = "/api/website/" + page.websiteId + "/page";
            return $http.post(url1, page)
                .then(function(response) {
                    // extract the page from the response
                    return response.data;
                });
        }

        function findAllPagesForWebsite(websiteId) {
            var url1 = "/api/website/" + websiteId + "/page";
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url1 = "/api/page/" + pageId;
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            console.log(pageId);
            var url1 = "/api/page/" + pageId;
            return $http.put(url1, page)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function deletePage(pageId) {
            var url1 = "/api/page/" + pageId;
            return $http.delete(url1)
                .then(function(response) {
                    return response.data;
                });
        }

/*        function getDescription(pageId) {
            var page = pages.find(function(page) {
                return page._id===pageId;
            })

            return page.description;
        }

        function getName(pageId) {
            var page = pages.find(function(page) {
                return page._id===pageId;
            })

            return page.name;
        }*/
    }
})();