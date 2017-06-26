/**
 * Created by Mitko Nikolov on 6/17/17.
 */


(function () {
    angular
        .module('Project')
        .factory('commitmentService', commitmentService);

    function commitmentService($http) {

        var url = "/api/2/user";

        return {
            createCommitment: createCommitment,
            findAllCommitments: findAllCommitments,
            updateCommitment: updateCommitment,
            findCommitmentById: findCommitmentById,
            findCommitmentsByArea: findCommitmentsByArea
            /*createWebsite: createWebsite,
            findAllWebsitesByUser: findAllWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite*/
        };

        function createCommitment(userId, commitment) {
            var url1 = url + "/" + userId + "/commitment";
            return $http.post(url1, commitment)
                .then(function(response) {
                    return response.data;
                });
        }

        function findAllCommitments(userId) {
            var url1 = url + "/" + userId + "/commitment";
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateCommitment(userId, commitmentId, commitment) {
            var url1 = url + "/" + userId + "/commitment/" + commitmentId;
            return $http.put(url1, commitment)
                .then(function(response) {
                    return response.data;
                })
        }

        function findCommitmentById(userId, commitmentId) {
            var url1 = url + "/" + userId + "/commitment/" + commitmentId;
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }

        function findCommitmentsByArea(ecoArea) {
            var url1 = url + "/commitment/" + ecoArea;
            return $http.get(url1)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();


