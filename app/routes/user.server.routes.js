/**
 * Created by Alminin on 26.03.2016.
 */
'use strict';

var passport = require('passport'),
    path = require('path'),
    mongoose  = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {

    var users = require(path.resolve('./app/controllers/users.profile.controller.js'));

    // Setting up the users profile api
    app.route('/users').put(users.update);

    // Signup
    app.post('/auth/signup', function(req, res) {
        var user = new User(req.body);

        // Add missig user fields
        user.provider = 'local';
        user.displayName = user.firstName + ' ' + user.lastName;

        // Save the user
        user.save(function(err) {
            if(err) {
                return res.status(400).send(err);
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefied;

                req.login(user, function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    });

    // Signin
    app.post('/auth/signin', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err || !user) {
                res.status(400).send(info);
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;

                req.login(user, function(err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        })(req, res, next);
    });

    // Signout
    app.get('/auth/signout', function(req,res) {
        req.logout();
        res.redirect('/');
    });
};
