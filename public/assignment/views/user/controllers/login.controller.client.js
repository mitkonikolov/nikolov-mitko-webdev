(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            userService.findUserByCredentials(username, password)
                .then(login);

            function login(found) {
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
    }
})();