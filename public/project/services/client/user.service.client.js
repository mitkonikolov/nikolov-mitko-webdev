(function () {
    angular
        .module('Project')
        .factory('userService', userService);
    
    function userService($http) {

        var url = "/api/2/user";

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
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
    }
})();