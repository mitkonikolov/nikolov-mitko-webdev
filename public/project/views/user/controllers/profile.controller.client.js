(function () {
    angular
        .module('Project')
        .controller('profileController', profileController);
    
    function profileController($location, userService, commitmentService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService
                .findUserById(model.userId)
                .then(function(user) {
                    model.user = user;
                });
        }
        init();

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
    }
})();