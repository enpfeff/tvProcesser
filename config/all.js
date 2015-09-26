/**
 * Created by ianpfeffer on 9/22/15.
 */
var preferences = require('./preferences');
var _ = require('lodash');

config = {
    help: "This is a useful help message",

    //Incase we want to query tvdbs database
    TVDB_API_KEY: ''
};

module.exports = _.extend({}, config, preferences);