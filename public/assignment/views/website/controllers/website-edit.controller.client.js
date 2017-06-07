(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesByUser(model.userId)
                .then(function(sites) {
                    model.websites = sites;
                });

            websiteService
                .findWebsiteById(model.websiteId)
                .then(function(site) {
                    model.website = site;
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

        function updateWebsite(website) {
            websiteService
                .updateWebsite(website._id, website)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function(status) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();