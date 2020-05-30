var assert = require('assert');
var log = require('single-line-log').stdout;
var Queue = require('queue-cb');

var distPaths = require('../..');
var fetch = require('../lib/fetch');

function checkExists(distPath, filename, callback) {
  log(filename, distPath);
  fetch('https://nodejs.org/dist/' + distPath, { method: 'HEAD' }, function (err, res) {
    if (err) return callback(err);
    assert.equal(res.statusCode, 200, distPath);
    callback();
  });
}

function checkFileName(filename, version, callback) {
  var paths = distPaths(filename, version);
  assert.ok(distPaths.length > 0, filename + ' ' + version);

  var queue = new Queue(1);
  for (var index = 0; index < paths.length; index++) {
    queue.defer(checkExists.bind(null, paths[index], filename));
  }
  queue.await(callback);
}

function checkFiles(dist, callback) {
  var queue = new Queue(1);
  for (var index = 0; index < dist.files.length; index++) {
    queue.defer(checkFileName.bind(null, dist.files[index], dist.version));
  }
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
    for (var index = 0; index < dists.length; index++) {
      queue.defer(checkFiles.bind(null, dists[index]));
    }
    queue.await(function (err) {
      console.log('');
      done(err);
    });
  });
});
