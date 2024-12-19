"use strict";
var addExtensionsFn = require('./helpers/addExtensionsFn');
var addHyphen = require('./helpers/addHyphen');
var addVersionAndArch = require('./helpers/addVersionAndArch');
var toExtension = require('./helpers/toExtension');
module.exports = {
    'tar.gz': toExtension,
    pkg: toExtension,
    default: addExtensionsFn([
        '.tar.gz'
    ]),
    'x86.msi': addHyphen,
    'x64/node.msi': addVersionAndArch
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }