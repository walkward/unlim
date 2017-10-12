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

  // Download config files which are updated using the shopify admin
  shell.exec('cd dist ; theme download config/settings_data.json config/settings_schema.json ; cd -');
  shell.cat('./dist/config/settings_data.json').to('./src/config/settings_data.json');
  shell.cat('./dist/config/settings_schema.json').to('./src/config/settings_schema.json');

  // Replace sourceMappingURL with liquid version for accurate referencing
  // shell.sed('-i', 'sourceMappingURL=theme.js.map', 'sourceMappingURL={{ "theme.js.map" | asset_url }}', './dist/assets/theme.min.js.liquid');

}
