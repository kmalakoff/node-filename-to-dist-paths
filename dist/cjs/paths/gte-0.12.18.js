"use strict";
var addExtensionsFn = require('./helpers/addExtensionsFn');
var addHyphen = require('./helpers/addHyphen');
var toExtension = require('./helpers/toExtension');
module.exports = {
    'tar.gz': toExtension,
    'tar.xz': toExtension,
    pkg: toExtension,
    'aix-ppc64': addExtensionsFn([
        '.tar.gz'
    ]),
    default: addExtensionsFn([
        '.tar.gz',
        '.tar.xz'
    ]),
    'win-x64.7z': addHyphen,
    'win-x86.7z': addHyphen,
    'win-arm.7z': addHyphen,
    'win-x64.zip': addHyphen,
    'win-x86.zip': addHyphen,
    'win-arm.zip': addHyphen,
    'x64.msi': addHyphen,
    'x86.msi': addHyphen
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }