(function () {
    angular
        .module('Project')
        .controller('userDetailsController', userDetailsController);
    
    function userDetailsController(userService,
                                   $routeParams) {

        var model = this;
        model.updateUser = updateUser;

        init();

        function init() {
            model.userId = $routeParams['userId'];
            model.userManagedId = $routeParams['userManagedId'];
            userService
                .findUserById(model.userManagedId)
                .then(function(user) {
                    model.managedUser = user;
                });
        }

        function updateUser(user) {
            model.successUpdatedMessage = null;
            userService
                .updateUser(user._id, user)
                .then(function(response) {
                   model.successUpdatedMessage = "The user was successfully updated";
                });
        }
    }
})();