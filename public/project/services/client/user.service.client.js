(function () {
    angular
        .module('Project')
        .factory('userService', userService);
    
    function userService($http) {

        var url = "/api/2/user";

        return {
            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn,
            findCurrentUser: findCurrentUser,
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUsernameById: findUsernameById,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function login(user) {
            return $http.post("/api/login", user)
                .then(function(response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function checkLoggedIn() {
            return $http.get('/api/loggedin')
                .then(function (response) {
                    return response.data;
                });
        }
        
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

        function findAllUsers() {
            var url1 = url + "/findAll";
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                })
        }

        function findUsernameById(userId) {
            var url1 = url + "/" + userId;
            return $http.get(url1)
                .then(function(response) {
                    return response.data.username;
                });
        }

        function findCurrentUser() {
            return $http.get('/api/currentUser')
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();