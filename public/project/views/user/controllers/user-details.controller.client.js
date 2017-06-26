(function () {
    angular
        .module('Project')
        .controller('userAllDetailsController', userAllDetailsController);
    
    function userAllDetailsController(userService,
                                      commitmentService,
                                      $routeParams,
                                      $q) {

        var model = this;

        init();

        function init() {
            model.userId = $routeParams['userId'];
            model.userManagedId = $routeParams['userManagedId'];
            userService
                .findUserById(model.userManagedId)
                .then(function(user) {
                    model.usersSharingWith = [];
                    model.managedUsersCommitments = [];
                    var promises = [];
                    var promisesForUsers = [];
                    model.managedUser = user;


                    for (var i = 0; i < model.managedUser.sharingWith.length; i++) {
                        promisesForUsers.push(userService
                            .findUsernameById(model.managedUser.sharingWith[i]));
                    }

                    $q.all(promisesForUsers).then(function (usernames) {
                        for (k = 0; k < usernames.length; k++) {
                            model.usersSharingWith.push(usernames[k]);
                        }
                    });


                    for (var ind = 0; ind < model.managedUser.commitments.length; ind++) {
                        promises.push(commitmentService
                            .findCommitmentById(model.managedUser, model.managedUser.commitments[ind]));
                    }

                    $q.all(promises).then(function (c) {
                        if (c[0] !== null) {
                            for (k = 0; k < c.length; k++) {
                                model.managedUsersCommitments.push(c[k].name);
                            }
                        }
                    }, function (err) {
                        console.log(err);
                    });

                });
        }
    }
})();