/*
* ====================================
* Unlimited Theme - Deploy theme to live website
* ====================================
*
*
*
*/

var shell = require('shelljs');
var Promise = require('bluebird');
var msg = require('../util/messages');

/* Export command and provide explanation */
exports.command = 'deploy'
exports.desc = 'Deploy changes '

exports.handler = function (argv) {

  if (argv.prod == true) {
    msg.header("Deploying To Production Theme");
    msg.note("This will overwrite the current theme.");
    shell.exec('cd dist; theme replace --force --env=production; cd -');
    process.exit(0)
  } else {
    msg.header("Deploying To Development Theme");
    msg.note("This will overwrite the current theme.");
    shell.exec('cd dist; theme replace --force; cd -');
    process.exit(0)
  }

}
