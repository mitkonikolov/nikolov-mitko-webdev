(function(){
    angular
        .module('Project')
        .controller('registerController', registerController);

    function registerController($location,
                                userService,
                                $rootScope,
                                $routeParams) {
        var model = this;

        // event handlers
        model.register = register;

        init();

        function init() {
            model.userType = $routeParams['userType'];
        }

        // implementation
        function register(username, password, password2, secret) {
            model.error = null;
            model.wrongSecretMessage = null;

            if(password !== password2) {
                model.error = "The passwords you entered do not match.";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(function(response) {
                    if(response) {
                        model.error = "This username is already taken";
                    }
                    else {
                        var user1 = {
                            username: username,
                            password: password,
                            secret: secret
                        };

                        if(model.userType==='admin') {
                            user1.userRole = 'admin';
                        }
                        else {
                            user1.userRole = 'user';
                        }

                        userService
                            .register(user1)
                            .then(function(response) {
                                if(response.data.response === "incorrect secret") {
                                    model.wrongSecretMessage = "The secret entered is incorrect. " +
                                        "You cannot be registered " +
                                        "as an admin user.";
                                }
                                else {
                                    var user = response.data;
                                    $rootScope.currentUser = user;
                                    $location.url("/user/" + user._id);
                                }

                            }, function(err) {
                                console.log(err);
                            });
                    }
                });

        }
    }
})();