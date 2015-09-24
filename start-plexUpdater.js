/**
 * Created by ianpfeffer on 9/24/15.
 */
var plex = require('./lib/plexUpdater');
var logger = require('./lib/logger')();

var log = logger.logger;

plex.findLibraries('show').then(function(directories) {
    var keys = [];
    _.forEach(directories, function(dir) {
        keys.push(dir.key);
    });
    return plex.refreshLibraries(keys);
}, function() {
    log.error("there was an error in finding the libraries");
});