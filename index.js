var path = require('path');
var semver = require('semver');

var FILENAMES = require('./lib/filenames');
var PATHS = require('./lib/paths');

module.exports = function filenameToDists(filename, version) {
  var filenames = FILENAMES.latest;
  var paths = PATHS.latest;

  if (semver.lte(semver.coerce(version), '0.5.4')) {
    filenames = FILENAMES['from-0.5.4'];
    paths = PATHS['from-0.12.18'];
  } else if (semver.lte(semver.coerce(version), '0.7.0')) {
    filenames = FILENAMES['from-0.7.0'];
    paths = PATHS['from-0.12.18'];
  } else if (semver.lte(semver.coerce(version), '0.7.6')) {
    filenames = FILENAMES['from-0.7.6'];
    paths = PATHS['from-0.12.18'];
  } else if (semver.lte(semver.coerce(version), '0.11.9')) {
    filenames = FILENAMES['from-0.11.9'];
    paths = PATHS['from-0.12.18'];
  } else if (semver.lte(semver.coerce(version), '0.12.18')) {
    filenames = FILENAMES['from-0.12.18'];
    paths = PATHS['from-0.12.18'];
  }

  var results = [];
  for (var key in filenames) {
    if (filenames[key] !== filename) continue;

    var pathsFunction = paths[key];
    if (!pathsFunction && ~key.indexOf('.')) {
      results.push(path.join(version, key));
    } else {
      var paths = (pathsFunction || paths.default)(key, version);
      // eslint-disable-next-line no-redeclare
      for (var index = 0; index < paths.length; index++) {
        results.push(version + '/' + paths[index]);
      }
    }
  }

  if (!results.length) console.log('No dist paths for ' + filename + ' ' + version);
  return results;
};
