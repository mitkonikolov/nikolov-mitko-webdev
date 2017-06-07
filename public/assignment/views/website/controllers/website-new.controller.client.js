(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.website = null;

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesByUser(model.userId)
                .then(function(sites) {
                    model.websites = sites;
                });
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService
                .createWebsite(website)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();