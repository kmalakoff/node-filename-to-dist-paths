"use strict";
module.exports = function addHyphen(key, version) {
    return [
        "node-".concat(version, "-").concat(key)
    ];
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }