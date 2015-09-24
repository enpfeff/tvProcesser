/**
 * Created by ianpfeffer on 9/22/15.
 */
module.exports = {
    // Directory where files are downloaded to
    tvStagingDirectory: '/Users/ianpfeffer/Workspaces/Mess/tvProcessor/out/stage',

    // Directory where the files should go
    tvDestDirectory: '/Users/ianpfeffer/Workspaces/Mess/tvProcessor/out/dest',

    // where should we log use full paths
    loggingFile: '/Users/ianpfeffer/Workspaces/Mess/tvProcessor/out/log.txt',

    // should we symlink - false or move - true
    move: 'false',

    // if this is set we'll send completes via prowl
    PROWL_API_KEY: '',

    // How the Tv shows will be moved or symlinked into the tvDestDirectory
    //
    // %s - season #
    // %o - original filename
    // %n - series name
    directoryStructure: '/%n/Season %s/%o'
};