var assert = require('assert');
var log = require('single-line-log').stdout;
var Queue = require('queue-cb');

var distPaths = require('../..');
var fetch = require('../lib/fetch');

function checkFileName(filename, version, callback) {
  var queue = new Queue(1);
  var all = distPaths(filename, version).reverse();
  assert.ok(all.length > 0, filename + ' ' + version);

  function next(callback) {
    if (!all.length) return callback();
    var distPath = all.pop();
    log(filename, distPath);
    fetch('https://nodejs.org/dist/' + distPath, { method: 'HEAD' }, function (err, res) {
      if (err) return callback(err);
      assert.equal(res.statusCode, 200, distPath);
      queue.defer(next);
      callback();
    });
  }

  queue.defer(next);
  queue.await(callback);
}

function checkFiles(dist, callback) {
  var queue = new Queue(1);
  var all = dist.files.slice().reverse();

  function next(callback) {
    if (!all.length) return callback();
    checkFileName(all.pop(), dist.version, function (err) {
      if (err) return callback(err);
      queue.defer(next);
      callback();
    });
  }

  queue.defer(next);
  queue.await(callback);
}

var SPECIFIC_VERSION = null;
var MAX_TESTS = 1;

describe('filename-to-dist', function () {
  var dists = null;

  before(function (done) {
    fetch('https://nodejs.org/dist/index.json', function (err, res) {
      if (err) return done(err);
      dists = res.body;
      if (SPECIFIC_VERSION) {
        dists = dists.filter(function (x) {
          return x.version === SPECIFIC_VERSION;
        });
      } else if (MAX_TESTS) dists = dists.slice(0, MAX_TESTS);
      done(err);
    });
  });

  it('all versions', function (done) {
    var queue = new Queue(1);
    var all = dists.slice().reverse();

    function next(callback) {
      if (!all.length) return callback();
      checkFiles(all.pop(), function (err) {
        if (err) return callback(err);
        queue.defer(next);
        callback();
      });
    }

    queue.defer(next);
    queue.await(function (err) {
      console.log('');
      done(err);
    });
  });
});
