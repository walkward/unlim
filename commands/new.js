/*
* ====================================
* Unlimited Theme - Install Unlimited within a new store
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
exports.command = 'new'
exports.desc = 'Install Unlimited theme in a new store'

exports.handler = function (argv) {

  Promise
    .all([ cleanup(), setup(argv), copy() ])
    .then(function() {
      msg.header("Deploying files and performing setup tasks to get Unlimited Theme up and running");
      msg.note("This will overwrite the current theme contained within your config file.");

      // TODO: Theme config files should not be downloaded when initially installing a theme

      msg.header("Running Webpack Build");
      shell.exec('./node_modules/.bin/webpack --env=dev --color=always');

      msg.header("Deploying To Development Theme");
      msg.note("This will overwrite the current theme.");
      shell.exec('cd dist; theme replace --force; cd -');

      msg.message("Theme deployment successful");
      shell.exec('killall node');
    });

}
