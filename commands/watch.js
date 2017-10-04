/*
* ====================================
* Unlimited Theme - Watch files for changes
* ====================================
*
*
*
*/


var shell = require('shelljs');
var Promise = require('bluebird');
var msg = require('../util/messages');
var cleanup = require('../tasks/cleanup');
var setup = require('../tasks/setup');
var copy = require('../tasks/copy');

/* Export command and provide explanation */
exports.command = 'watch'
exports.desc = 'Watch for changes'

exports.handler = function (argv) {

  Promise
    .all([ cleanup(), setup(), copy() ])
    .then(function() {
      
      // Check if there is a newer version of unlimited-tools
      if (shell.exec('npm outdated unlimited-tools').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
      }

      msg.header("Running Watch Tasks & Deploying Assets");
      shell.exec('webpack --config config/webpack.config.js --watch --color=always', {async:true});
      shell.exec('cd dist; theme watch --notify=../dist/.theme_update', {async:true});
    });

}
