/**
 * Created by ianpfeffer on 9/22/15.
 */
var fs = require('fs');

var move = function(src, dest) {

};

var symlink = function(src, dest) {
    fs.symlinkSync(src, dest);
};

module.exports = {
    move: move,
    symlink: symlink
}