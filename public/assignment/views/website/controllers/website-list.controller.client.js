(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];

        function init() {
            websiteService
                .findAllWebsitesByUser(model.userId)
                .then(function(sites) {
                    model.websites = sites;
                });
        }
        init();
    }
})();