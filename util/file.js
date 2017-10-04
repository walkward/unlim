/*
* ====================================
*
* ====================================
*
*
*
*/

var fs = require('fs');
var path = require('path');

module.exports = {

  getCurrentDirectoryBase : function() {
    return path.basename(process.cwd());
  },

  directoryExists : function(filePath) {
    return new Promise(function(resolve, reject) {
        try {
          return resolve(fs.statSync(filePath).isDirectory());
        } catch (err) {
          return resolve(err);
        }
    })
  }

};
