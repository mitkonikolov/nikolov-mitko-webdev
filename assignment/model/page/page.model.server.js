
var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;


module.exports = pageModel;


function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel.create(page);
}

function findAllPagesForWebsite(websiteId){
    return pageModel.find({_website: websiteId});
}

function findPageById(pageId){
    return pageModel.findById(pageId);
}

function updatePage(pageId, page){
    return pageModel.update({_id: pageId},
        {
            $set: {
                name: page.name,
                title: page.title,
                description: page.description,
                widgets: page.widgets
            }
        }
    );
}

function deletePage(pageId){
    return pageModel.remove({_id: pageId});
}