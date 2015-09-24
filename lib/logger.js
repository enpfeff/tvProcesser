/**
 * Created by ianpfeffer on 9/23/15.
 */
var winston = require('winston');
var fs = require('fs');
var config = require('../config/all');
var utils = require('./utils');
var path = require('path');
var touch = require('touch');

function init() {
    // create the logging path if not there
    utils.exists(path.dirname(config.loggingFile), true);
    // touch a log file
    touch.sync(config.loggingFile);

    try {
        var logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({
                    stream: fs.createWriteStream(config.loggingFile, {flags: 'a'})
                })
            ]
        });
    } catch(e) {
        console.log("error creating logger", e);
    }

    var prowl = null;
    if (config.PROWL_API_KEY !== '') {
        var Prowl = require('node-prowl');
        prowl = new Prowl(config.PROWL_API_KEY);
    }

    return {
        logger: logger,
        prowl: prowl
    };
}

module.exports = init;