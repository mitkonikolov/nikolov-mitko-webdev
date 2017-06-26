
(function() {
    angular
        .module("Project")
        .config(projConf);

    function projConf($routeProvider) {

/*        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    console.log("got user");
                    deferred.resolve(user);
                } else {
                    console.log("got error");
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };*/














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
            .when('/register/:userType', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/user/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
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
            .when('/user/:userId/manage/:userManagedId', {
                templateUrl: 'views/user/templates/user-details.view.client.html',
                controller: 'userDetailsController',
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
            });

        function checkLoggedin($q, $location, userService) {
            var deferred = $q.defer();
            userService
                .checkLoggedIn()
                .then(function (currentUser) {
                    if(currentUser === '0') {
                        deferred.reject();
                        $location.url('/login');
                    } else {
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }

    }

})();