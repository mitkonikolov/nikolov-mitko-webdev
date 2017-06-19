(function () {
    "use strict";

    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService($http) {

        var url = "/api/user";

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,

            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn,
            findCurrentUser: findCurrentUser
        };
        
        function createUser(user) {
            return $http.post(url, user)
                .then(function(response) {
                    // extract the user from the response
                    return response.data;
                });
        }
        
        function findUserByUsername(username) {
            var url1 = url + "?username=" + username;
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function updateUser(userId, user) {
            var url1 = url + "/" + userId;
            return $http.put(url1, user)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function deleteUser(userId) {
            var url1 = url + "/" + userId;
            return $http.delete(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url1 = url + "?username=" + username + "&password=" + password;
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url1 = url + "/" + userId;
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var credentials = {
                username: username,
                password: password
            };

            return $http
                .post("/api/assignment/login", credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout(user) {
            return $http
                .post("/api/assignment/logout")
                .then(function (response) {
                    return response.data;
                })
        }

        function register(user) {
            return $http
                .post("/api/assignment/register", user)
                .then(function (response) {
                    return response.data;
                })
        }

        function checkLoggedIn() {
            var url = "/api/assignment/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCurrentUser() {
            var url = "/api/assignment/current";

            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();