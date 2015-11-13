// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------

var _ = require('lodash');
var args = require('minimist')(process.argv.slice(2));
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var dev = false;
//check arguments
if ((args.d) || (args.dev)) {
    // they just want help
    console.log("Dev Environment Set");
    dev = true;
}
var config = dev ? require('../config/configFactory').getConfig('dev') : require('../config/configFactory').getConfig();

var CONSTANTS = require('../lib/constants');
var utils = require('../lib/utils');
var commands = require('../lib/commands');
var parser = require('../lib/parsers/scene');
var log = require('../lib/loggerFactory');
var plex = require('../lib/plexUpdater');
var Torrent = require('../lib/models/Torrent');
var logger = log.getLogger();

var tv = ((args.m) || (args.movie)) ? false : true;
var movie = ((args.m) || (args.movie)) ? true : false;
if (movie) {
    logger.info('movie found');
} else if (tv) {
    logger.info('tv found');
}


// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------

var dbUrl = utils.createMongoUrl(config.mongodb);

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
    logger.error(config.help.processTv);
    process.exit(0);
}


// ------------------------------------------------------------------------
// Process
// ------------------------------------------------------------------------

console.log(args._.length);
if (args._.length >= 1) {
    var srcFile = args._[0];
    // ok were good to go lets do our job
    if (!utils.exists(srcFile)) {
        logger.error(srcFile + ' Does not exist');
        process.exit(1);
    }

    if (tv) {
        var fileObject = parser.parse(path.basename(srcFile));

        if (!fileObject.isSeason) {
            var directoryStructure = config.directoryStructure;
            directoryStructure = directoryStructure.replace(/%n/, fileObject.seriesName);
            directoryStructure = directoryStructure.replace(/%s/, fileObject.season.toString());
            directoryStructure = directoryStructure.replace(/%o/, fileObject.fileName);

            utils.exists(config.tvDestDirectory + path.dirname(directoryStructure), true);

            var success = commands.symlink(srcFile, config.tvDestDirectory + directoryStructure);
            if (!success) {
                process.exit(1);
            }

            logger.info('symlink created: ' + config.tvDestDirectory + directoryStructure);
        } else {
            var directoryStructureSeason = config.directoryStructureSeason;
            directoryStructureSeason = directoryStructureSeason.replace(/%n/, fileObject.seriesName);
            directoryStructureSeason = directoryStructureSeason.replace(/%s/, fileObject.season);

            utils.exists(config.tvDestDirectory + directoryStructureSeason, true);
            var list = fs.readdirSync(srcFile);
            _.forEach(list, function(file) {
                commands.symlink(srcFile + '/' + file, config.tvDestDirectory + directoryStructureSeason + '/' + file);
            });
        }

        // after the symlink is created update plex
        plex.findLibraries('show').then(function(directories) {
            var keys = [];
            _.forEach(directories, function(dir) {
                keys.push(dir.key);
            });
            plex.refreshLibraries(keys);
        });
    } else if (movie){
        // after the symlink is created update plex
        plex.findLibraries('movie').then(function(directories) {
            var keys = [];
            _.forEach(directories, function(dir) {
                keys.push(dir.key);
            });
            plex.refreshLibraries(keys);
        });
    }


    var type = movie ? CONSTANTS.MOVIE : CONSTANTS.TV;
    var torrent = new Torrent(path.basename(srcFile), srcFile, type);
    MongoClient.connect(dbUrl, function(err, db) {
        torrent.insertUnique(db, CONSTANTS.DOWNLOAD_COLLECTION_NAME, function(res) {
            if (res) {
                logger.info('Successfully Updated the Database');
            } else {
                logger.info('File Already in DB');
            }
            db.close();
        })
    });

    if (logger.prowl) {
        var msg = path.basename(srcFile) + ' Successfully Downloaded';

        logger.prowl.push(msg, 'What', function( error, remaining ){
            if( error ) throw error;
        });
    }

} else {
    logger.error(config.help.processTv);
    process.exit(1);
}
