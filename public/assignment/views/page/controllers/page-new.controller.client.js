(function () {
    angular
        .module('WAM')
        .controller('newPageController', newPageController);
    
    function newPageController($routeParams,
                               pageService,
                               websiteService,
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
            var p;
            page.websiteId = model.websiteId;
            pageService
                .createPage(page)
                .then(function(newPage) {
                    p = newPage;
                    return websiteService.findWebsiteById(model.websiteId);
                })
                .then(function(site) {
                    site.pages.push(p._id);
                    return websiteService.updateWebsite(site._id, site);
                })
                .then(function(writeMessage) {
                    $location.url('/user/'+ model.userId +
                        '/website/' + model.websiteId + "/page");
                });
        }
    }
})();