/*
* ====================================
* Unlimited Theme - Replace and rename files to prepare for deployment
* ====================================
*
*
*
*/

var shell = require('shelljs');

module.exports = function () {

  // Replace theme.js with minified version theme.js.min
  shell.sed('-i', "{{ 'theme.js' | asset_url }}", "{{ 'theme.min.js' | asset_url }}", './dist/layout/theme.liquid');

  // Replace sourceMappingURL with liquid version for accurate referencing
  shell.sed('-i', 'sourceMappingURL=theme.js.map', 'sourceMappingURL={{ "theme.js.map" | asset_url }}', './dist/assets/theme.min.js.liquid');

}
