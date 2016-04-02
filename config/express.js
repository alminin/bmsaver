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
    MongoStore = require('connect-mongo')({
        session: session
    }),
    config = require('./config'),
    path = require('path'),
    consolidate = require('consolidate');

module.exports = function(db) {
    //Initialize express app
    var app = express();

    // Models
    config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();

    // Showing stack errors
    app.set('showStackError', true);

    // Set template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './app/views');

    if (process.env.NODE_ENV === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
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
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Setting the app router and static folder
    app.use(express.static(path.resolve('./public')));

    // Routes
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // Error handling
    app.use(function(err, req, res, next) {
        if (!err) return next();
        console.error(err.stack);
        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('404', {
            url:req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;

};