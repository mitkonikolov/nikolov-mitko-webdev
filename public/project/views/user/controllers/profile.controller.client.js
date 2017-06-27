(function () {
    angular
        .module('Project')
        .controller('profileController', profileController);
    
    function profileController($location, userService, commitmentService, $routeParams, $q) {

        var model = this;
        model.updateUser = updateUser;
        model.logout = logout;
        model.deleteUser = deleteUser;

        init();

        function init() {

            model.userId = $routeParams['userId'];

            if(model.userId) {
                userService
                    .findUserById(model.userId)
                    .then(function (user) {
                        model.user = user;
                        model.password2 = model.user.password;
                        model.usersSharingWith = [];
                        model.usersCommitments = [];
                        var promisesForUsers = [];
                        var promises = [];

                        for (var i = 0; i < model.user.sharingWith.length; i++) {
                            promisesForUsers.push(userService
                                .findUsernameById(model.user.sharingWith[i]));
                        }

                        $q.all(promisesForUsers).then(function (usernames) {
                            for (k = 0; k < usernames.length; k++) {
                                model.usersSharingWith.push(usernames[k]);
                            }
                        });

                        for (var ind = 0; ind < model.user.commitments.length; ind++) {
                            promises.push(commitmentService
                                .findCommitmentById(model.userId, model.user.commitments[ind]));
                        }

                        $q.all(promises).then(function (c) {
                            if (c[0] !== null) {
                                for (k = 0; k < c.length; k++) {
                                    model.usersCommitments.push(c[k].name);
                                }
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    });
            }
            else {
                userService
                    .findCurrentUser()
                    .then(handleLoad, handleLoadError);
            }
        }

        function updateUser(user) {
            model.message = null;
            model.error = null;
            model.wrongPassMessage = null;

            if(model.user.password==="") {
                model.error = "Your new password cannot be empty.";
                return;
            }

            if(model.user.password !== model.password2) {
                model.wrongPassMessage = "Your passwords do not match";
            }
            else {
                userService
                    .updateUser(user._id, user)
                    .then(function (response) {
                        model.message = "You successfully updated your account."
                    })
            }
        }

        function logout() {
            userService
                .logout()
                .then(function(response) {
                    $location.url('/');
                })
        }

        function handleLoad(user) {
            model.savedUser = user;
            model.userId = user._id;
            model.user = angular.copy(model.savedUser);
        }

        function handleLoadError(error) {
            console.log(error);
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