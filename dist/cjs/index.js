"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return filenameToDists;
    }
});
var _lodashfind = /*#__PURE__*/ _interop_require_default(require("lodash.find"));
var _matchsemver = /*#__PURE__*/ _interop_require_default(require("match-semver"));
var _filenames = /*#__PURE__*/ _interop_require_default(require("./filenames"));
var _paths = /*#__PURE__*/ _interop_require_default(require("./paths"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function filenameToDists(filename, version) {
    var filenames = (0, _lodashfind.default)(_filenames.default, _matchsemver.default.bind(null, version));
    var paths = (0, _lodashfind.default)(_paths.default, _matchsemver.default.bind(null, version));
    var results = [];
    for(var key in filenames.map){
        if (filenames.map[key] !== filename) continue;
        var pathsFunction = paths.map[key];
        if (!pathsFunction && ~key.indexOf('.')) {
            results.push("".concat(version, "/").concat(key));
        } else {
            var relativePaths = (pathsFunction || paths.map.default)(key, version);
            for(var index = 0; index < relativePaths.length; index++){
                results.push("".concat(version, "/").concat(relativePaths[index]));
            }
        }
    }
    return results;
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }