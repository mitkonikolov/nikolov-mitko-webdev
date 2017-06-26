
(function(){
    angular
        .module('Project')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function login(username, password) {
            var user1 = {
                username: username,
                password: password
            };
            userService
                .login(user1)
                .then(function(response) {
                    if(response.response === "incorrect credentials") {
                        model.message = "Incorrect username or password.";
                    }
                    else {
                        $location.url('/user/' + response._id);
                    }

                }, function(error) {
                    console.log(error);
                })
        }
    }
})();