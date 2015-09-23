/**
 * Created by ianpfeffer on 9/22/15.
 */
var _ = require('lodash');
var args = require('minimist')(process.argv.slice(2));
var config = require('./config/all');

//check arguments
if ((args.h) || (args.help)) {
    // they just want help
    console.log(config.name);
    process.exit(0);
}

if (args._.length !== 2) {
    console.log('Omg Suck it');
}