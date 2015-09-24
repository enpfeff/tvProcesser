/**
 * Created by ianpfeffer on 9/22/15.
 */
var _ = require('lodash');
var args = require('minimist')(process.argv.slice(2));
var config = require('./config/all');
var utils = require('./lib/utils');
var parser = require('./lib/parsers/scene');

//check arguments
if ((args.h) || (args.help)) {
    // they just want help
    console.log(config.help);
    process.exit(0);
}

parser.parse('doctor_who_2005.9x01.the_magicians_apprentice.720p_hdtv_x264-fov.mkv');
parser.parse('South.Park.S19E01.720p.HDTV.x264 KILLERS.mkv');
parser.parse('South.Park.S05E12.720p.HDTV.x264 KILLERS.mkv');

//The first arg should be the file you are manipulating
if (args._[0]) {
    // do it
}
