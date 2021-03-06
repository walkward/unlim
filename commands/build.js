/*
* ====================================
* Unlimited Theme - Build theme without deploying
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
exports.command = 'build'
exports.desc = 'Build fresh new theme'

exports.handler = function (argv) {

  Promise
    .all([ cleanup(), setup() ])
    .then(function() {
      msg.header("Running Webpack Build");
      shell.exec("NODE_ENV='production' ./node_modules/.bin/webpack --color=always");
      msg.message("Build Completed Successfully")
    }).then(function() {
      copy();
      process.exit(0)
    });

}
