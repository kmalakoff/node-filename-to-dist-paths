"use strict";
module.exports = [
    {
        gte: '19.9.0',
        map: require('./gte-19.9.0')
    },
    {
        gte: '0.12.18',
        map: require('./gte-0.12.18')
    },
    {
        lt: '0.12.18',
        map: require('./lt-0.12.18')
    }
];
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }