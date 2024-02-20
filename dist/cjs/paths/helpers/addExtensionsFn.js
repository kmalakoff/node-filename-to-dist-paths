"use strict";
module.exports = function addExtensionsFn(extensions) {
    return function addExtensions(key, version) {
        var results = [];
        for(var index = 0; index < extensions.length; index++){
            results.push([
                "node-".concat(version, "-").concat(key).concat(extensions[index])
            ]);
        }
        return results;
    };
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }