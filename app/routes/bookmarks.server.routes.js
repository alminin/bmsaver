'use strict'

module.exports = function(app) {
    //bookmarks routing

    //get all bookmarks
    app.get('/bookmarks', function(req, res) {
        res.send('all bookmarks');
    });

    //create bookmark and send back all bookmarks
    app.post('/bookmarks', function(req, res) {
        res.send('created');
    });

    //delete bookmark
    app.delete('/bookmarks/:bookmark_id', function(req, res) {
       res.send('deleted');
    });
}