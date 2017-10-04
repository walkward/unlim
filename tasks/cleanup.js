/*
* ====================================
* Unlimited Theme - Cleanup stray files in preparation for watching or building theme
* ====================================
*
*
*
*/

var shell = require('shelljs');
var Promise = require('bluebird');
var msg = require('../util/messages');

module.exports = function () {

  var cleanupFiles = function(){
    return new Promise(function(resolve, reject) {
      try {

        var result = (function(){
          // Remove all files from dist to be ready for resh new build
          shell.rm('-rf', './dist/*')
          // Remove all extra chunks
          shell.rm('-rf', './**/chunk*');
        })()
        return resolve(result);

      } catch (err) {
        return reject(err);
      }
    })
  }

  return cleanupFiles();

}
