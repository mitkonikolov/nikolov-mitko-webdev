
(function() {
    angular
        .module("Project")
        .config(projConf);

    function projConf($routeProvider) {
        $routeProvider
/*            .when('/', {
                templateUrl: 'views/templates/search.view.client.html',
                controller: 'homeController',
                controllerAs: 'model'
            })*/
            .when('/', {
                templateUrl: './home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/commitment', {
                templateUrl: 'views/commitment/templates/commitment-listall.view.client.html',
                controller: 'commitmentListAllController',
                controllerAs: 'model'
            })
            .when('/user/:userId/manage', {
                templateUrl: 'views/user/templates/manage.view.client.html',
                controller: 'userManagementController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/user/:userId/commitment/new', {
                templateUrl: 'views/commitment/templates/commitment-new.view.client.html',
                controller: 'commitmentNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/commitment/:commitmentId', {
                templateUrl: 'views/commitment/templates/commitment-details.view.client.html',
                controller: 'commitmentDetailsController',
                controllerAs: 'model'
            })
    }
})();