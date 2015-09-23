/**
 * Created by ianpfeffer on 9/22/15.
 */
var preferences = require('./preferences');
var _ = require('lodash');

config = {
    help: "This is a useful help message"
};

module.exports = _.extend({}, config, preferences);