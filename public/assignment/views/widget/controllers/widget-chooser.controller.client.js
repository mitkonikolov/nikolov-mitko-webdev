(function () {
    angular
        .module('WAM')
        .controller('newWidgetController', newWidgetController);
    
    function newWidgetController($sce,
                                 $routeParams,
                                 $location,
                                 widgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.widgets = widgetService.getAllWidgets();
            console.log(model.widgets.length)
        }
        init();

        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.switchTo = switchTo;

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);

            //https://www.youtube.com/embed/AM2Ivdi9c4E
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function switchTo(type) {
            model.widget = widgetService.findWidgetByType(type);
            $location.url('/user/' + model.userId + '/website/' +
                model.websiteId + '/page/' + model.pageId + '/widget/' + model.widget._id);
        }
    }
})();