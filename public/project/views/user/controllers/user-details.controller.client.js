(function () {
    angular
        .module('Project')
        .controller('userDetailsController', userDetailsController);
    
    function userDetailsController(userService,
                                   $routeParams) {

        var model = this;

        init();

        function init() {
            model.userId = $routeParams['userId'];
            model.userManagedId = $routeParams['userManagedId'];
            userService
                .findUserById(model.userManagedId)
                .then(function(user) {
                    model.managedUser = user;
                })
        }
    }
})();