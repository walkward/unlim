/*
* ====================================
* Unlimited Theme - Watch files for changes
* ====================================
*
*
*
*/
// TODO: Adjust browser-sync to wait for .theme-update +bug id:8

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
    .all([ cleanup(), setup(argv), copy() ])
    .then(function() {
      msg.header("Running Watch Tasks & Deploying Assets");
      shell.exec('webpack --config config/webpack.config.js --watch --color=always', {async:true});
      shell.exec('cd dist; theme watch --notify=./theme.update', {async:true});
    });

}
