/**
 * Created by ianpfeffer on 9/22/15.
 */
var _ = require('lodash');
var args = require('minimist')(process.argv.slice(2));
var config = require('./config/all');
var utils = require('./lib/utils');

//check arguments
if ((args.h) || (args.help)) {
    // they just want help
    console.log(config.help);
    process.exit(0);
}

//The first arg should be the file you are manipulating
if (args._[0]) {
    // do it
}
