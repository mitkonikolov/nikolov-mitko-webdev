(function () {
    angular
        .module('Project')
        .controller('userManagementController', userManagementController);
    
    function userManagementController(userService,
                                      $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.changeRole = changeRole;
        model.deleteUser = deleteUser;

        init();

        function init() {
            userService
                .findAllUsers()
                .then(function(users) {
                    model.allUsers = users;
                })
        }

        function changeRole(user, role) {
            model.alreadyRoleMessage = null;
            model.promotedMessage = null;
            if(user.userRole===role) {
                model.alreadyRoleMessage = user.username + " already has the role of " + role + ".";
            }
            else {
                user.userRole = role;
                userService
                    .updateUser(user._id, user)
                    .then(function(response) {
                        model.promotedMessage = "The role of " + user.username + " was successfully changed!";
                    })
            }
        }

        function deleteUser(user) {
            model.userDeletedMessage = null;
            userService
                .deleteUser(user._id)
                .then(function(response) {
                    model.userDeletedMessage = "User deleted!";
                })
        }
    }
})();