/**
 * Created by ianpfeffer on 9/23/15.
 */
var winston = require('winston');
var fs = require('fs');
var config = require('../config/all');
function init() {
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({
                stream: fs.createWriteStream(config.loggingFile, {flags: 'a'})
            })
        ]
    });

    return logger;
}

module.exports = init;