var assert = require('assert');
var log = require('single-line-log').stdout;
var Queue = require('queue-cb');

var fetch = require('../lib/fetch');
var head = require('../lib/head');
var distPaths = require('../..');

// console.log(distPaths('win-x64-exe', 'v14.2.0'));
// console.log(distPaths('osx-x64-tar', 'v14.2.0'));
// console.log(distPaths('win-x64-exe', 'v0.6.18'));
// console.log(distPaths('osx-x64-tar', 'v0.6.18'));

function checkExists(distPath, filename, callback) {
  log(filename, distPath);
  head('https://nodejs.org/dist/' + distPath, function (err, res) {
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

describe.skip('filename-to-dist', function () {
  var dists = null;

  before(function (done) {
    fetch('https://nodejs.org/dist/index.json', function (err, json) {
      dists = json;
      // dists = json.filter(function (x) {
      //   return x.version === 'v0.12.18';
      // });
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
