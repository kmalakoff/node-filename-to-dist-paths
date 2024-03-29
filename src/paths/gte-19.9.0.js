const addExtensionsFn = require('./helpers/addExtensionsFn');
const addHyphen = require('./helpers/addHyphen');
const toExtension = require('./helpers/toExtension');

module.exports = {
  'tar.gz': toExtension,
  'tar.xz': toExtension,
  pkg: toExtension,
  'aix-ppc64': addExtensionsFn(['.tar.gz']),
  default: addExtensionsFn(['.tar.gz', '.tar.xz']),
  'win-x64.7z': addHyphen,
  'win-x86.7z': addHyphen,
  'win-arm64.7z': addHyphen,
  'win-arm64.zip': addHyphen,
  'win-x64.zip': addHyphen,
  'win-x86.zip': addHyphen,
  'win-arm.zip': addHyphen,
  'x64.msi': addHyphen,
  'x86.msi': addHyphen,
};
