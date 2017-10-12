#! /usr/bin/env node
/*
* ====================================
* Unlimited Theme - Entry point for tooling
* ====================================
*
*
*
*/

var argv = require('minimist')(process.argv.slice(2));

require('yargs')
  .commandDir('commands')
  .demandCommand()
  .help()
  .argv
