/**
 * Created by Alminin on 25.03.2016.
 */
'use strict';

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')({session: session}),
    config = require('./config');

module.exports = function(db) {
    //Initialize express app
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // CookieParser should be above session
    app.use(cookieParser());

    // Express MongoDB session storage
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: new MongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    //TODO add middleware

    return app;

}