var assert = require('assert');
var log = require('single-line-log').stdout;
var Queue = require('queue-cb');

var fetch = require('../lib/fetch');
var head = require('../lib/head');
var toDistPaths = require('../..');

function checkExists(distPath, filename, callback) {
  log(filename, distPath);
  head('https://nodejs.org/dist/' + distPath, function (err, res) {
    if (err) return callback(err);
    assert.equal(res.statusCode, 200, distPath);
    callback();
  });
}

function checkFileName(filename, version, callback) {
  var distPaths = toDistPaths(filename, version);
  var queue = new Queue(1);
  for (var index = 0; index < distPaths.length; index++) {
    queue.defer(checkExists.bind(null, distPaths[index], filename));
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

describe('filename-to-dist', function () {
  var dists = null;

  before(function (done) {
    fetch('https://nodejs.org/dist/index.json', function (err, json) {
      // json = json.filter(function (x) {
      //   return x.version === 'v0.8.8';
      // });
      dists = json;
      done(err);
    });
  });

  it('all versions', function (done) {
    var queue = new Queue(1);
    for (var index = 0; index < dists.length; index++) {
      queue.defer(checkFiles.bind(null, dists[index]));
    }
    queue.await(done);
  });
});
