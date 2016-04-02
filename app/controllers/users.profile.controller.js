/**
 * Created by Alminin on 30.03.2016.
 */
'use strict'

var _ = require('lodash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

// Update user details

exports.update = function(req, res) {
    // Init variables
    var user = req.user;
    var message = null;

    if (user) {
        // Merge existing user
        user = _.extend(user, req.body);
        user.updated = Date.now();
        user.displayName = user.firstName + ' ' + user.lastName;

        user.save(function(err) {
            if (err) {
                return res.status(400).send(err);
            } else {
                req.login(user, function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

// Send User
exports.me = function(req, res) {
    res.json(req.user || null);
};