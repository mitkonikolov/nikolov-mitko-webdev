(function () {
    angular
        .module('Project')
        .controller('commitmentNewController', commitmentNewController);
    
    function commitmentNewController($routeParams,
                                  commitmentService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.commitment = null;

        // event handlers
        model.createCommitment = createCommitment;

        function init() {
            websiteService
                .findAllWebsitesByUser(model.userId)
                .then(function(sites) {
                    model.websites = sites;
                });
        }
        //init();

        // implementation
        function createCommitment(commitment) {
/*            commitment.developerId = model.userId;
            var s, u;*/
            var newCommitment = {
                name: commitment.name,
                affectedEcoAreas: []
            };

            newCommitment.affectedEcoAreas.push(commitment.ecoArea);

            commitmentService
                .createCommitment(model.userId, newCommitment)
                .then(function(response) {
                    $location.url("/user/" + model.userId);
                })

/*            commitmentService
                .createCommitment(commitment)
                .then(function(response) {
                    console.log(response);
                    console.log("done");
                });*/
/*                .then(function(newSite) {
                    s = newSite;
                    return userService.findUserById(model.userId);
                })
                .then(function(user) {
                    user.websites.push(s._id);
                    return userService.updateUser(user._id, user);
                })
                .then(function(status) {
                    $location.url('/user/'+model.userId+'/website');
                });*/
        }
    }
})();