(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            model.userId = $routeParams['userId'];
            if (model.userId) {
                userService
                    .findUserById(model.userId)
                    .then(function(user) {
                        model.user = user;
                    });
            } else {
                userService
                    .findCurrentUser()
                    .then(handleLoad, handleLoadError);
            }
        }
        init();

/*        userService
            .findUserById(model.userId)
            .then(function(user) {
                model.user = user;
            });*/

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function(response) {
                    model.message = "User updated."
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function(response) {
                    $location.url('/login');
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function handleLoad(user) {
            model.savedUser = user;
            model.userId = user._id;
            model.user = angular.copy(model.savedUser);
        }

        // Handles errors related to loading users.
        function handleLoadError(error) {
            console.log(error);
        }
    }
})();