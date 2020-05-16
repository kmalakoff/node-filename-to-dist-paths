var addExtensionsFn = require('./addExtensionsFn');
var addHyphen = require('./addHyphen');
var addVersionAndArch = require('./addVersionAndArch');
var toExtension = require('./toExtension');

module.exports = {
  'tar.gz': toExtension,
  pkg: toExtension,
  default: addExtensionsFn(['.tar.gz']),
  'x86.msi': addHyphen,
  'x64/node.msi': addVersionAndArch,
};
