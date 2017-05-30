(function () {
    angular
        .module('WAM')
        .controller('newPageController', newPageController);
    
    function newPageController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = pageService.findAllPagesByWebsiteId(model.websiteId);
        }
        init();
    }
})();