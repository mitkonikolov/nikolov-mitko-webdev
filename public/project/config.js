
(function() {
    angular
        .module("Project")
        .config(projConf);

    function projConf($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model'
            })
    }
})();