
(function () {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortable)
    .directive('web-dev-hello', sayHello);

    function sayHello() {
        return {
            template: "Hello World!"
        };
    }

    function wbdvSortable($routeParams, widgetService) {

        var startIndex = -1;
        var stopIndex = -1;

        function linkFunction(scope, element) {
            jQuery(element).sortable({
                axis: 'y',
                start:function(event, ui) {
                    startIndex = (jQuery(ui.item).index)();
                },
                stop:function(event, ui) {
                    stopIndex = (jQuery(ui.item).index)();
                    pageId = $routeParams.pageId;
                    widgetService.sortWidgets(pageId, startIndex, stopIndex);
                }
            });
        }

        return {
            link: linkFunction
        }
    };
})();