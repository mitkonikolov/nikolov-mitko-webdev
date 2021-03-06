
(function() {
    angular
        .module("Project")
        .config(projConf);

    function projConf($routeProvider) {
        $routeProvider
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
            .when('/user/search/:eventId', {
                templateUrl: 'views/search/templates/search-details.view.client.html',
                controller: 'searchDetailsController',
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
            .when('/user/:userId/sharing', {
                templateUrl: 'views/user/templates/sharing.view.client.html',
                controller: 'sharingController',
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
            .when('/user/:userId/commitment/personal', {
                templateUrl: 'views/commitment/templates/commitment-personal.view.client.html',
                controller: 'commitmentPersonalController',
                controllerAs: 'model'
            })
            .when('/user/:userId/manage', {
                templateUrl: 'views/user/templates/manage.view.client.html',
                controller: 'userManagementController',
                controllerAs: 'model'
            })
            .when('/user/:userId/manage/new', {
                templateUrl: 'views/user/templates/manage-new.view.client.html',
                controller: 'userNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/manage/:userManagedId', {
                templateUrl: 'views/user/templates/user-details-manage.view.client.html',
                controller: 'userDetailsController',
                controllerAs: 'model'
            })
            .when('/user/:userId/details/:userManagedId', {
                templateUrl: 'views/user/templates/user-details.view.client.html',
                controller: 'userAllDetailsController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search/:category/:eventTitle', {
                templateUrl: 'views/search/templates/search-details.view.client.html',
                controller: 'searchDetailsController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search/:category/:eventTitle/:days', {
                templateUrl: 'views/search/templates/search-details.view.client.html',
                controller: 'searchDetailsController',
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