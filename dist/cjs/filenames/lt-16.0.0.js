"use strict";
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
module.exports = _object_spread_props(_object_spread({}, require('./base')), {
    'tar.xz': 'src',
    headers: 'headers',
    'win-x64/node.exe': 'win-x64-exe',
    // 'win-x64/node.lib': 'win-x64-exe',
    'x64.msi': 'win-x64-msi',
    'x86.msi': 'win-x86-msi',
    'win-x86/node.exe': 'win-x86-exe',
    // 'win-x86/node.lib': 'win-x86-exe',
    'win-arm/node.exe': 'win-arm-exe',
    'win-x64.7z': 'win-x64-7z',
    'win-x86.7z': 'win-x86-7z',
    'win-arm.7z': 'win-arm-7z',
    'win-x64.zip': 'win-x64-zip',
    'win-x86.zip': 'win-x86-zip',
    'win-arm.zip': 'win-arm-zip'
});
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }