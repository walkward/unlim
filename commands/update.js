/*
* ====================================
* Unlimited Theme - Update utilities for managing instances of Unlimited
* ====================================
*
*
*
*/

var shell = require('shelljs');
var Promise = require('bluebird');
var msg = require('../util/messages');

/* Export command and provide explanation */
exports.command = 'update'
exports.desc = 'Update a themes files'

exports.handler = function (argv) {

  if (argv.tools == true) {
    msg.header("Downloading tools within bin folder from master branch");
    shell.exec('rm -r bin');
    shell.exec('git fetch');
    shell.exec('git checkout origin/master -- ./bin/*');
  } else if (argv.docs == true) {
    msg.header("Downloading README.MD from master branch");
    shell.exec('git fetch');
    shell.exec('git checkout origin/master -- ./README.MD');
  } else if (argv.package == true) {
    msg.header("Downloading package.json from master branch");
    shell.exec('git fetch');
    shell.exec('git checkout origin/master -- ./package.json');
    shell.exec('git checkout origin/master -- ./package-lock.json');
  } else if (argv.config == true) {
    msg.header("Downloading config files within config folder from master branch");
    shell.exec('git fetch');
    shell.exec('git checkout origin/master -- ./config/.sass.lint.yml');
    shell.exec('git checkout origin/master -- ./config/webpack.config.js');
  }

}
