/**
 * Created by Alminin on 01.04.2016.
 */
'use strict'

module.exports = function(app) {
    // Root routing
    var core = require('../../app/controllers/core.server.controller');
    app.route('/').get(core.index);
};