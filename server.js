/**
 * Created by Alminin on 25.03.2016.
 */
'use strict';

var mongoose = require('mongoose'),
    chalk = require('chalk'),
    config = require('./config/config');

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to db!'));
        console.log(chalk.red(err));
    }
});

var app = require('./config/express')(db);

app.listen(config.port);

exports = module.exports = app;

console.log('bmsave app started on port ' + config.port);