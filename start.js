/**
 * Created by ianpfeffer on 9/22/15.
 */
var _ = require('lodash');
var args = require('minimist')(process.argv.slice(2));
var config = require('./config/all');
var utils = require('./lib/utils');
var commands = require('./lib/commands');
var parser = require('./lib/parsers/scene');
var loggerInit = require('./lib/logger')();
var path = require('path');
var plex = require('./lib/plexUpdater');

var logger = loggerInit.logger;

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
    var srcFile = args._[0];
    // ok were good to go lets do our job
    if (!utils.exists(srcFile)) {
        logger.error(srcFile + ' Does not exist');
        process.exit(1);
    }
    var fileObject = parser.parse(path.basename(srcFile));

    var directoryStructure = config.directoryStructure;

    directoryStructure = directoryStructure.replace(/%n/, fileObject.seriesName);
    directoryStructure = directoryStructure.replace(/%s/, fileObject.season.toString());
    directoryStructure = directoryStructure.replace(/%o/, fileObject.fileName);

    utils.exists(config.tvDestDirectory + path.dirname(directoryStructure), true);

    commands.symlink(srcFile, config.tvDestDirectory + directoryStructure);
    logger.info('symlink created: ' + config.tvDestDirectory + directoryStructure);

    // after the symlink is created update plex
    plex.findLibraries('show').then(function(directories) {
        var keys = [];
        _.forEach(directories, function(dir) {
            keys.push(dir.key);
        });
        plex.refreshLibraries(keys);
    });

} else {
    logger.error(config.help);
    process.exit(1);
}
