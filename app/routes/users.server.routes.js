/**
 * Created by Alminin on 26.03.2016.
 */
'use strict';

var passport = require('passport'),
    path = require('path'),
    errorHandler = require('../controllers/errors.server.controller'),
    mongoose  = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {

    var users = require(path.resolve('./app/controllers/users.server.controller.js'));

    // Setting up the users profile api
    app.route('/users/me').get(users.me);
    app.route('/users').put(users.update);

    // Setting up the users authentication api
    app.post('/auth/signup', users.signup);
    app.post('/auth/signin', users.signin);
    app.get('/auth/signout', users.signout);

    // Binding the user middleware
    app.param('userId', users.userByID);
};
