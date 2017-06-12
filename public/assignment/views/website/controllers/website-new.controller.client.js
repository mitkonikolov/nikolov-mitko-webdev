(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  userService,
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
            var s, u;

            websiteService
                .createWebsite(website)
                .then(function(newSite) {
                    s = newSite;
                    return userService.findUserById(model.userId);
                })
                .then(function(user) {
                    user.websites.push(s._id);
                    return userService.updateUser(user._id, user);
                })
                .then(function(status) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();