(function () {
    angular
        .module('WAM')
        .controller('newPageController', newPageController);
    
    function newPageController($routeParams,
                               pageService,
                               $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.page = null;

        // event handlers
        model.createPage = createPage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
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
    }
})();