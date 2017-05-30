(function () {
    angular
        .module('WAM')
        .controller('editPageController', editPageController);
    
    function editPageController($routeParams, pageService) {

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
    }
})();