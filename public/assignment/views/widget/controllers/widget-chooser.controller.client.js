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

        model.widget=null;

        model.createWidget = createWidget;
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.switchTo = switchTo;

        function createWidget(type) {
            if(type==='HEADING') {
                var new_widget = {"_id": "", "widgetType": "",
                    "pageId": "", "size": 1, "text": "New Header"};
            }
            else if(type==='HTML') {
                var new_widget = {"_id": "", "widgetType": "",
                    "pageId": "", "text": "<p>New HTML element</p>"};
            }
            else {
                var new_widget = {"_id": "", "widgetType": "",
                    "pageId": "", "width": "100%", "url": ""};
            }

            new_widget.widgetType = type;
            new_widget.pageId = model.pageId;

            widgetService
                .createWidget(new_widget)
                .then(function(widg) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId +
                        "/page/" + model.pageId + "/widget/" + widg._id)
                })
        }

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