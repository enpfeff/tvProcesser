/**
 * Created by ianpfeffer on 9/24/15.
 */
var plex = require('../lib/plexUpdater');
var args = require('minimist')(process.argv.slice(2));
var logger = require('../lib/loggerFactory')();
var _ = require('lodash');

if (args._.length === 1) {
    var type = args._[0];
    plex.findLibraries(type).then(function (directories) {
        var keys = [];
        _.forEach(directories, function (dir) {
            keys.push(dir.key);
        });
        plex.refreshLibraries(keys);
    }, function () {
        logger.error("start-plexUpdater: there was an error in finding the libraries");
    });
} else {
    logger.error(config.help);
    process.exit(1);
}