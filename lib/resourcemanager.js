var fs = require('fs'),
    fsx = require('fs-extra'),
    async = require('async'),
    path = require('path'),
    io = require('./io'),
    resourceloader = require('./io/resourceloader'),
    osenv = require('osenv'),
    tmp = require('tmp'),
    tarball = require('tarball-extract');

function ResourceManager() {
}

module.exports = ResourceManager;
var rm = ResourceManager.prototype;

/**
 * Downloads and optionally explodes an archive file
 * @param url {string} archive url
 * @param targetDir {string} destination path
 * @param options {object}
 *   - explode {boolean} default=false
 *   - filename {string} filename to use for downloaded archive
 * @param callback {function} err
 */
rm.downloadArchive = function (url, targetDir, options, callback) {

  tmp.file(function(err, path) {
    if (err) return callback(err);




    callback(null, path);

  });



//  var filename = options && options.filename ? options.filename :
//  var target = path.join(targetDir,


};


rm.downloadResource = function (packageDetails) {
  try {
    async.waterfall([
      function (callback) {
        resourceloader.downloadPackage(packageDetails, function (err, data) {
          if (err) console.log(err);
          callback(err);
        });
      },
      function (callback) {
        var packagePath = path.join(process.cwd(), "/tmp/", packageDetails.packageName, "/package");
        var packageDest = path.join(process.cwd(), packageDetails.targetDir, packageDetails.packageName);

        console.log('Renaming %s to %s', packagePath, packageDest);
        resourceloader.renameFolder(packagePath, packageDest, 0, function (err, data) {
          callback();
        });
      }
    ], function (err) {
      fsx.removeSync(path.join(process.cwd(), "/tmp/"));
      console.log('Done.');
    });
  } catch (err) {
    io.error('unable to download required package');
    //this.emit('error'); //TODO: should this be an EventEmitter?
    console.log(err);
  }
};

rm.findResource = function (packageDetails) {
  try {
    resourceloader.findPackage(packageDetails, function (err, data) {
      if (err) console.log(err);
    });
  } catch (err) {
    io.error('unable to copy required package');
    //this.emit('error');
    console.log(err)
  }
};


