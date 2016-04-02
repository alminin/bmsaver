/**
 * Created by Alminin on 02.04.2016.
 */
'use strict';

var _ = require('lodash');

// Extend user's controller
module.exports = _.extend(
    require('./users/users.authentication.server.controller'),
    require('./users/users.authorization.server.controller'),
    require('./users/users.profile.server.controller')
);