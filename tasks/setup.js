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
var Promise = require('bluebird');

module.exports = function() {
  var slatePath = './src/assets';

  // Check if there is a newer version of unlimited-tools
  if (shell.exec('npm outdated unlim').code !== 0) {
    msg.error("Please install newest version of unlimited-tools before proceeding");
    msg.run("npm install unlim -D");
    shell.exit(1);
  }

  var replaceFiles = function(){
    return new Promise(function(resolve, reject) {
      try {

        var result = (function(){
          // Create a new theme.update file for use by the browsersync
          shell.exec('touch dist/theme.update');

          // TODO: Add feature to check if more current version exists +enhancement id:2 gh:4

          // Check if config file exists
          if (fs.existsSync('./config/config.yml')) {
            // Add config file to the new dist
            shell.cat('./config/config.yml').to('./dist/config.yml');
          } else {
            var err = new Error("Please add or update the shopify config file")
            throw err
          }

          // Download config files which are updated using the shopify admin
          shell.exec('cd dist ; theme download config/settings_data.json config/settings_schema.json ; cd -');
          shell.cat('./dist/config/settings_data.json').to('./src/config/settings_data.json');
          shell.cat('./dist/config/settings_schema.json').to('./src/config/settings_schema.json');

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
