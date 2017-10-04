/*
* ====================================
* Unlimited Theme - Copy new files into dist folder
* ====================================
*
*
*
*/

var fs = require('fs');
var shell = require('shelljs');
var Promise = require('bluebird');
var chokidar = require('chokidar');
var msg = require('../util/messages');

module.exports = function () {

  var watcher = chokidar.watch('./src', {
    ignored: /[\/\\]\./, persistent: true
  });

  var copyFiles = function(){
    return new Promise(function(resolve, reject) {
      try {

        var result = (function(){

          shell.cp('-Ru', './src/assets', './dist')
          shell.cp('-Ru', './src/config', './dist')
          shell.cp('-Ru', './src/layout', './dist')
          shell.cp('-Ru', './src/locales', './dist')
          shell.cp('-Ru', './src/sections', './dist')
          shell.cp('-Ru', './src/snippets', './dist/snippets')
          shell.cp('-Ru', './src/icons/*', './dist/snippets')
          shell.cp('-Ru', './src/templates', './dist')

        })()
        return resolve(result);

      } catch (err) {
        return reject(err);
      }
    })
  }

  return Promise
    .all([ copyFiles() ])
    .then(function() {
      // Watch task for copying files from src to dist
      watcher.on('change', function(path, stats) {
        if(path.indexOf("/icons") > -1) {
          // Copy files from icons folder into snippets folder
          shell.cp('-R', './' + path,'./' + path.replace(/src\/icons/i, 'dist/snippets'))
        } else if(path.indexOf("/styles") > -1 || path.indexOf("/scripts") > -1) {
          // Do not copy files from scripts/styles directories
          msg.message('Compiling Scripts/Styles');
        } else {
          // Copy files from src to dist
          shell.cp('-R', './' + path,'./' + path.replace(/src/i, 'dist'))
        }
      });
    });

}
