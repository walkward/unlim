/**
 * Refresh browser when file updates
 * @module tasks/refresh
 */

var chokidar = require('chokidar');

module.exports = function () {

  var watcher = chokidar.watch('./dist/theme.update', {
    ignored: /[\/\\]\./,
    persistent: true
  });

  watcher.on('change', function(path, stats) {
    console.log(path);
    console.log('called');
  })

}
