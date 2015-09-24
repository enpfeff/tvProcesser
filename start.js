/**
 * Created by ianpfeffer on 9/22/15.
 */
var _ = require('lodash');
var args = require('minimist')(process.argv.slice(2));
var config = require('./config/all');
var utils = require('./lib/utils');
var parser = require('./lib/parsers/scene');
var logger = require('./lib/logger')();
var path = require('path');

//1. check to see if destination directory exists and make it if not
utils.exists(config.tvDestDirectory, true);
//2. test to make sure the staging directory is there if not exit thats bad
if (!utils.exists(config.tvStagingDirectory)) {
    logger.error('Staging directory does not exist, exiting...');
    process.exit(1);
}

//check arguments
if ((args.h) || (args.help)) {
    // they just want help
    logger.error(config.help);
    process.exit(0);
}

if (args._.length === 1) {
    // ok were good to go lets do our job

} else {
    logger.error(config.help);
    process.exit(1);
}
