(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);
    
    function pageService() {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem1" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem2" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem3" }
            ];

        return {
            createPage: createPage,
            findAllPagesByWebsiteId: findAllPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            getDescription: getDescription,
            getName: getName
        };
        
        function createPage(websiteId, page) {
            page._id = websiteId;
            pages.push(page);
        }

/*        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    resultSet.push(pages[p]);
                }
            }
            return resultSet;
        }*/

        function findAllPagesByWebsiteId(websiteId) {
            var resultSet = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    resultSet.push(pages[p]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function updatePage(pageId, page) {
            var page1 = pages.find(function (page1) {
                return page1._id === pageId;
            });

            page1.name = page.name;
            page1.websiteId = page.websiteId;
            page1.description = page.description;
        }
        
        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function getDescription(pageId) {
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
        }
    }
})();