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
var exists = function (path, create, cb) {
    return fs.exists(path, function (exists) {
        // if we want to create it dooo it
        if (!exists && create) {
            // this err is already an instance of Error
            return mkdir(path, function(err) {
                if (err) {
                    return cb(err);
                }
            });
        } else {
            return cb(exists);
        }

    });
};

/**
 *
 * @param path - path of the directory or file
 * @param cb - callback
 * @returns {*}
 */
var mkdir = function(path, cb) {
    return mkdirp(path, function(err) {
        if (err) {
            return cb(new Error('Cannot Create Directory', err));
        } else {
            return cb(null);
        }

    });
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
    mkdir: mkdir,
    getMatch : getMatch
};

module.exports = utils;