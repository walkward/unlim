const path = require('path');
const YAML = require('yamljs');

try {
  var filename = path.join(__dirname, '../../config/config.yml');
  var config = YAML.load(filename);

} catch (err) {
  console.log(err.stack || String(err));
}

module.exports = {
    config: config
};
