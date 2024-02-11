var assert = require('assert');
var log = require('single-line-log2').stdout;
var Queue = require('queue-cb');
var get = require('get-remote');

var distPaths = require('../..');

function checkFileName(filename, version, callback) {
  var queue = new Queue(1);
  var all = distPaths(filename, version).reverse();
  assert.ok(all.length > 0, `${filename} ${version}`);

  function next(callback) {
    if (!all.length) return callback();
    var distPath = all.pop();
    log(`${filename} ${distPath}`);
    get(`https://nodejs.org/dist/${distPath}`).head((err, res) => {
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
    checkFileName(all.pop(), dist.version, (err) => {
      if (err) return callback(err);
      queue.defer(next);
      callback();
    });
  }

  queue.defer(next);
  queue.await(callback);
}

var SPECIFIC_VERSION = null;
var SKIP_TESTS = 0;
var MAX_TESTS = 1;

describe('filename-to-dist', () => {
  var dists = null;

  before((done) => {
    get('https://nodejs.org/dist/index.json').json((err, res) => {
      if (err) return done(err);
      dists = res.body;
      if (SPECIFIC_VERSION) {
        dists = dists.filter((x) => x.version === SPECIFIC_VERSION);
      } else {
        if (SKIP_TESTS) dists = dists.slice(SKIP_TESTS);
        if (MAX_TESTS) dists = dists.slice(0, MAX_TESTS);
      }
      done(err);
    });
  });

  it('all versions', (done) => {
    var queue = new Queue(1);
    var all = dists.slice().reverse();

    function next(callback) {
      if (!all.length) return callback();
      checkFiles(all.pop(), (err) => {
        if (err) return callback(err);
        queue.defer(next);
        callback();
      });
    }

    queue.defer(next);
    queue.await((err) => {
      console.log('');
      done(err);
    });
  });
});
