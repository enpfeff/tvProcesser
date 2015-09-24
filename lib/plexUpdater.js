/**
 * Created by ianpfeffer on 9/23/15.
 */
var PlexAPI = require("plex-api");
var config = require('../config/all');
var credentials = require('plex-api-credentials');
var _ = require('lodash');
var log = require('./logger')();

var logger = log.logger;


var client = new PlexAPI({
    hostname: config.PLEX_URL
});


function findLibraries(type) {
    logger.info('find libraries called');
    return client.find("/library/sections", {type: type});
}

function refreshLibraries(keys) {
    logger.info('refreshing these keys ' + keys);
    _.forEach(keys, function(key) {
        return client.perform("/library/sections/" + key + "/refresh").then(function () {
            return logger.info("refreshed library key " + key);
        }, function (err) {
            logger.error("couldn't connect to plex")
        });
    });

}


module.exports = {
    findLibraries: findLibraries,
    refreshLibraries: refreshLibraries
};