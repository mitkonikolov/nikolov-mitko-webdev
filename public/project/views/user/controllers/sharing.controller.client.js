(function () {
    angular
        .module('Project')
        .controller('sharingController', sharingController);
    
    function sharingController(userService,
                               $routeParams,
                               $q) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.findByUsername = findByUsername;
        model.setToMultiUser = setToMultiUser;

        init();

        function init() {
            userService
                .findUserById(model.userId)
                .then(function(user) {
                    model.allUsers = [];
                    model.user = user;
                    var promises = [];
                    for(var i=0; i<model.user.sharingWith.length; i++) {
                        promises.push(userService.findUserById(model.user.sharingWith[i]));
                    }

                    $q.all(promises).then(function(response) {
                        for(i=0; i<response.length; i++) {
                            model.allUsers.push(response[i]);
                        }
                    });
                    model.single = false;
                });
        }

        function findByUsername(username) {
            model.noSuchUserMessage = null;
            userService
                .findUserByUsername(username)
                .then(function(user) {
                    if(user) {
                        model.single = true;
                        model.singleUser = user;
                    }
                    else {
                        model.noSuchUserMessage = "A user with the provided username was not found."
                    }
                });
        }

        function setToMultiUser() {
            model.noSuchUserMessage = null;
            model.single = false;
            model.singleUser = null;
            model.username = null;
        }
    }
})();