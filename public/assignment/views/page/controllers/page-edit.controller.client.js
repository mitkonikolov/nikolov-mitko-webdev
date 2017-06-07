(function () {
    angular
        .module('WAM')
        .controller('editPageController', editPageController);

    function editPageController($routeParams,
                                pageService,
                                $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                });

            pageService
                .findPageById(model.pageId)
                .then(function(page) {
                    model.page = page;
                });
        }
        init();

        // implementation
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService
                .createPage(page)
                .then(function() {
                    $location.url('/user/'+ model.userId +
                        '/website/' + model.websiteId + "/page");
                });
        }

        function updatePage(page) {
            pageService
                .updatePage(page._id, page)
                .then(function() {
                    $location.url('/user/'+ model.userId +
                        '/website/' + model.websiteId + "/page");
                });
        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function() {
                    $location.url('/user/'+ model.userId +
                        '/website/' + model.websiteId + "/page");
                });
        }
    }
    
/*    function editPageController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.pageDescription = pageService.getDescription(model.pageId);
        model.pageName = pageService.getName(model.pageId);

        function init() {
            model.pages = pageService.findAllPagesByWebsiteId(model.websiteId);
        }
        init();
    }*/
})();