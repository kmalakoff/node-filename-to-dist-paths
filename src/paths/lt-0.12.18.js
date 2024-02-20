const addExtensionsFn = require('./helpers/addExtensionsFn');
const addHyphen = require('./helpers/addHyphen');
const addVersionAndArch = require('./helpers/addVersionAndArch');
const toExtension = require('./helpers/toExtension');

module.exports = {
  'tar.gz': toExtension,
  pkg: toExtension,
  default: addExtensionsFn(['.tar.gz']),
  'x86.msi': addHyphen,
  'x64/node.msi': addVersionAndArch,
};
