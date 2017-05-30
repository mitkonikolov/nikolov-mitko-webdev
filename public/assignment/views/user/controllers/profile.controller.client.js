(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.user = userService.findUserById(model.userId);
    }
})();