(function () {
    angular
        .module('Project')
        .controller('profileController', profileController);
    
    function profileController($location, userService, commitmentService, $routeParams, $q) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        init();

        function init() {
            userService
                .findUserById(model.userId)
                .then(function(user) {
                    model.user = user;
                    model.usersSharingWith = [];
                    model.usersCommitments = [];
                    var promisesForUsers = [];
                    var promises = [];

                    for(var i=0; i < model.user.sharingWith.length; i++) {
                        promisesForUsers.push(userService
                            .findUsernameById(model.user.sharingWith[i]));
                    }

                    $q.all(promisesForUsers).then(function(usernames) {
                        for(k=0; k<usernames.length; k++) {
                            model.usersSharingWith.push(usernames[k]);
                        }
                    });

                    for(var ind=0; ind<model.user.commitments.length; ind++) {
                        promises.push(commitmentService
                            .findCommitmentById(model.userId, model.user.commitments[ind]));
                    }

                    $q.all(promises).then(function(c) {
                        if(c[0]!==null) {
                            for (k = 0; k < c.length; k++) {
                                model.usersCommitments.push(c[k].name);
                            }
                        }
                    }, function(err) {
                        console.log(err);
                    });
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function(response) {
                    model.message = "User updated."
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function(response) {
                    $location.url('/login');
                })
        }
    }
})();