(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            userService
                .login(username, password)
                .then(login2);

            function login2(found) {
                if(found!==null) {
                    $location.url('/user/' + found._id);
                }
                else {
                    handleError(found);
                }
            }

            function handleError(error) {
                model.message = "Username " + username + " or password are incorrect, please try again";
            }
        };

        model.logout = function logout() {
            userService
                .logout()
                .then(function(response) {
                    $location.url("/");
                });
        };
    }
})();