/**
 * Created by Alminin on 01.04.2016.
 */
'use strict'

exports.index = function(req, res) {
    res.render('index', {
        user: req.user || null,
        request: req
    })
};