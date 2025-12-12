'use strict';
var exit = require('exit-compat');
var Cache = require('fetch-json-cache');
var _require = require('./constants.cjs');
var CACHE_PATH = _require.CACHE_PATH;
var DISTS_URL = _require.DISTS_URL;
function cache(callback) {
  var cacheInstance = new Cache(CACHE_PATH);
  cacheInstance.get(
    DISTS_URL,
    {
      force: true,
    },
    callback
  );
}
// run patch
cache(function (err) {
  if (err) {
    console.log('postinstall failed. Error: '.concat(err.message));
    exit(-1);
  } else {
    console.log('postinstall succeeded');
    exit(0);
  }
});
/* CJS INTEROP */ if (exports.__esModule && exports.default) {
  try {
    Object.defineProperty(exports.default, '__esModule', { value: true });
    for (var key in exports) {
      exports.default[key] = exports[key];
    }
  } catch (_) {}
  module.exports = exports.default;
}
