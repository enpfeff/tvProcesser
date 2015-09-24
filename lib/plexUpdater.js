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
    return client.find("/library/sections", {type: type});
}

function refreshLibraries(keys) {
    _.forEach(keys, function(key) {
        client.perform("/library/sections/" + key + "/refresh").then(function () {
            logger.info("refreshed library key " + key);
        }, function (err) {
            logger.error("couldn't connect to plex")
        });
    });

}


module.exports = {
    findLibraries: findLibraries,
    refreshLibraries: refreshLibraries
};