/**
 * Created by Alminin on 01.04.2016.
 */
'use strict';

module.exports = {
    app: {
        title: 'BWSaver - bookmarks saver and manager',
        description: 'Awesome MEAN App fo saving and managing your favorite web pages.',
        keywords: 'bookmarks saver, bookmarks manager'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'meanbmsaver',
    sessionCollection: 'sessions',
    assets: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css'
            ],
            js: [
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-ui-utils/ui-utils.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
            ]
        },
        css: [
            'public/css/*.css'
        ],
        js: [
            'public/app.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        tests: [
            'public/lib/angular-mocks/angular-mocks.js',
            'public/modules/*/tests/*.js'
        ]
    }
};