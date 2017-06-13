
var mongoose = require('mongoose');
var websiteModel = require('../website/website.model.server');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);


widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;


module.exports = widgetModel;


function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId){
    return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {
            $set: {
                name: widget.name,
                text: widget.text,
                placeholder: widget.placeholder,
                description: widget.description,
                url: widget.url,
                width: widget.width,
                height: widget.height,
                rows: widget.rows,
                size: widget.size,
                class: widget.class,
                icon: widget.icon,
                formatted: widget.formatted
            }
        }
    );
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
    var widgs;
    return this
        .findAllWidgetsForPage(pageId)
        .then(function(widgets) {
            widgs = widgets;
            var widget = widgs[start];
            widgs.splice(start, 1);
            widgs.splice(end, 0, widget);
            return widgetModel.remove({_page: pageId});
        })
        .then(function(response) {
            widgetModel.insertMany(widgs);
        });
}