(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        userService
            .findUserById(model.userId)
            .then(function(user) {
                model.user = user;
            });

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
    }
})();