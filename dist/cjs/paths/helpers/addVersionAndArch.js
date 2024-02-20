"use strict";
module.exports = function addVersionAndArch(key, version) {
    var arch = key.split("/")[0];
    var parts = key.split(".");
    return [
        "".concat(parts[0], "-").concat(version, "-").concat(arch, ".").concat(parts[1])
    ];
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }