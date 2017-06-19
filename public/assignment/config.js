(function () {
    angular
        .module('WAM')
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:userId/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html'
                ,controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model'
            })
            // page routing
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'newPageController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'editPageController',
                controllerAs: 'model'
            })
            // widget routing
            .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'newWidgetController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'editWidgetController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'editWidgetController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'ImageSearchController',
                controllerAs: 'model'
            });

        function checkLoggedIn($q, $location, userService) {
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