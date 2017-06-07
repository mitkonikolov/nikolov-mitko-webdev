(function () {
    angular
        .module('WAM')
        .controller('ImageSearchController', ImageSearchController);

    function ImageSearchController(FlickrService,
                                   $location,
                                   $routeParams,
                                   widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            widgetService.findWidgetById(model.widgetId)
                .then(function(wig) {
                    model.widget = wig;
                });
        }
        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
        
        function selectPhoto(photo) {
           var s = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server +
                "/" + photo.id + "_" + photo.secret + "_h.jpg";
            model.widget.url = s;
            widgetService.updateWidget(model.widgetId,model.widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId +
                '/page/' + model.pageId + '/widget/' + model.widgetId);
        }
    }
})();