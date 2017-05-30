(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);
    
    function widgetService() {

        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://cdntbs.astonmartin.com/sitefinity/Vanquish%202016/vanquish-s/IMG_3465-RT-image2.jpg"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/MOVOaGbbsTs" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "891", "widgetType": "HTML", "pageId": "321", "text": " <p>Dwayne Johnson hosted his fifth " +
                "episode of <em>Saturday Night Live </em>over the weekend, helming this year’s season finale with a mix" +
                " of the weird,the political, and the OMIGOD hide your children and your wives from this guy.<br></p> <p>Johnson" +
                " returned to <em>Saturday Night Live</em> with his typical flair and gusto, which included a pretty funny " +
                "sketch on a<em> Jurassic Park</em> ride (T-Rex hand puppet and all), the Scorpio superhero, and a <em>WWE</em> promo" +
                " that harkened back to Johnson’s early days as “The Rock.” But sadly, it wasn’t <em>SNL</em>’s finest this season," +
                "leaving things on a pretty average note. It was also the final <em>SNL</em> performances for both Vanessa Bayer " +
                "and Bobby Moynihan, and I’m going to miss both of them a lot.</p> <p>Of course, everybody’s been talking about " +
                "Johnson’s opening monologue, where he “officially” announced that he’s running for President of the United States " +
                "in 2020, with Tom Hanks as his running mate. This follows a recent appearance on <em>The Tonight Show with Jimmy " +
                "Fallon</em>, where he suggested that he has an earnest desire to replace Donald Trump as the next Commander in " +
                "Chief.</p>"}
            ];

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            findWidgetByType: findWidgetByType,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            getAllWidgets: getAllWidgets
        };
        
        function createWidget(pageId, widget) {
            widget._id = pageId;
            widgets.push(widget);
        }
        
        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function findWidgetByType(type) {
            return widgets.find(function(widget) {
                return widget.widgetType = type;
            });
        }
        
        function updateWidget(widgetId, widget) {
            var widget1 = widgets.find(function (widget1) {
                return widget1._id === widgetId;
            });
            var id = widget1._id;
            deleteWidget(widget1);
            createWidget(id, widget);
        }
        
        function deleteWidget(widgetId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index, 1);
        }

        function getAllWidgets() {
            return widgets;
        }
    }
})();