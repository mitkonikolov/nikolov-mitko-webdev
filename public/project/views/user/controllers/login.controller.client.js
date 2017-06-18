
(function(){
    angular
        .module('Project')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function login(username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(function(found) {
                    if(found!==null) {
                        $location.url('/user/' + found._id);
                    }
                    else {
                        model.message = "Username and/or password are incorrect. Please try again or register.";
                    }
                });
        }
    }
})();