/**
 * Created by Alminin on 26.03.2016.
 */
'use strict';

module.exports = {
    port: process.env.PORT || 3000,
    sessionSecret: 'meanbmsaver',
    sessionCollection: 'sessions',
    db: 'mongodb://bmsaver:U2y7qivt@ds013619.mlab.com:13619/bmsaver' ||
    process.env.MONGOLAB_URI ||
    'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/bmsaver'
}