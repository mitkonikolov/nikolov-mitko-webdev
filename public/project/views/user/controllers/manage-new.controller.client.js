(function(){
    angular
        .module('Project')
        .controller('userNewController', userNewController);

    function userNewController($location,
                               userService,
                               $rootScope,
                               $routeParams) {
        var model = this;

        model.userId = $routeParams['userId'];

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {
            model.error = null;
            model.success = null;

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
                            userRole: "user"
                        };

                        userService
                            .register(user1)
                            .then(function(response) {
                                var user = response.data;
                                model.success = "New user was successfully created";

                            }, function(err) {
                                console.log(err);
                            });
                    }
                });



        }
    }
})();