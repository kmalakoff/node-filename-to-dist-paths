"use strict";
module.exports = [
    {
        gte: '19.9.0',
        map: require('./gte-19.9.0.js')
    },
    {
        gte: '16.0.0',
        lt: '19.9.0',
        map: require('./gte-16.0.0.js')
    },
    {
        gte: '4.0.0',
        lt: '16.0.0',
        map: require('./lt-16.0.0.js')
    },
    {
        gt: '0.11.9',
        lt: '4.0.0',
        map: require('./lt-4.0.0')
    },
    {
        gt: '0.7.6',
        lte: '0.11.9',
        map: require('./lte-0.11.9')
    },
    {
        gt: '0.7.0',
        lte: '0.7.6',
        map: require('./lte-0.7.6')
    },
    {
        gt: '0.6.13',
        lte: '0.7.0',
        map: require('./lte-0.7.0')
    },
    {
        gt: '0.6.9',
        lte: '0.6.13',
        map: require('./lte-0.6.13')
    },
    {
        gt: '0.5.4',
        lte: '0.6.9',
        map: require('./lte-0.6.9')
    },
    {
        lte: '0.5.4',
        map: require('./lte-0.5.4')
    }
];
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }