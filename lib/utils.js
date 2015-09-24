/**
 * Created by ianpfeffer on 9/22/15.
 */
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var Error = require('./models/Error');

var that = this;

/**
 * Checks if file or directory exists
 * @param path - path of the directory or file
 * @param create - will create if it does not exist ASSUMES its a directory
 * @param cb - callback
 */
var exists = function (path, create) {
    var ret = fs.existsSync(path);
    if (!ret && create) {
        mkdirp.sync(path);
    }
    return ret;
};


// will return the first capture group found
function getMatch(string, regex) {
    var ret = null;

    var matches = regex.exec(string);
    _.forEach(matches, function(match, index) {
        if (index !== 0) {
            if (match) {
                ret = match;
            }
        }
    });
    return ret;
}

var utils = {
    exists: exists,
    getMatch : getMatch
};

module.exports = utils;