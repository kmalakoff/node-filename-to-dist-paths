var findVersion = require('./lib/findVersion');

var FILENAMES = require('./lib/filenames');
var PATHS = require('./lib/paths');

module.exports = function filenameToDists(filename, version) {
  var filenames = findVersion(FILENAMES, version);
  var paths = findVersion(PATHS, version);

  var results = [];
  for (var key in filenames.map) {
    if (filenames.map[key] !== filename) continue;

    var pathsFunction = paths.map[key];
    if (!pathsFunction && ~key.indexOf('.')) {
      results.push(version + '/' + key);
    } else {
      var relativePaths = (pathsFunction || paths.map.default)(key, version);
      for (var index = 0; index < relativePaths.length; index++) {
        results.push(version + '/' + relativePaths[index]);
      }
    }
  }
  return results;
};
