/*
* ====================================
* Unlimited Theme - Setup functions to be run when setting up a new theme
* ====================================
*
*
*
*/

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var file = require('../util/file');
var copy = require('./copy');
var msg = require('../util/messages');
var Promise = require('bluebird');

module.exports = function() {
  var slatePath = './src/assets';

  // Check if there is a newer version of unlimited-tools
  if (shell.exec('npm outdated unlim').code !== 0) {
    msg.message("");
    msg.error("Please install the newest version of unlimited-tools before proceeding.");
    msg.run("npm install unlim -D");
    shell.exit(0);
  }

  var replaceFiles = function(){
    return new Promise(function(resolve, reject) {
      try {

        var result = (function(){
          // Create a new theme.update file for use by the browsersync
          shell.exec('touch dist/theme.update');

          // Check if config file exists
          if (fs.existsSync('./config/config.yml')) {
            // Add config file to the new dist
            shell.cat('./config/config.yml').to('./dist/config.yml');
          } else {
            var err = new Error("Please add or update the shopify config file")
            throw err
          }

        })()
        return resolve(result);

      } catch (err) {
        return reject(err);
      }
    })
  }

  return file.directoryExists(slatePath)
  .then(function(result) {
      if(result == true) {
        return replaceFiles();
      } else {
        throw ("Error: Source assets are not present.");
      }
  });

}
