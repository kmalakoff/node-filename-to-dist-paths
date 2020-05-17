var semver = require('semver');

module.exports = function findVersion(array, version) {
  for (var index = 0; index < array.length; index++) {
    var item = array[index];
    if (item.lte && !semver.lte(version, item.lte)) continue;
    if (item.gt && !semver.gt(version, item.gt)) continue;
    return item;
  }
  return null;
};
