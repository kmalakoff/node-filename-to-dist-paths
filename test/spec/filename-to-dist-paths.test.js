const assert = require('assert');
const log = require('single-line-log2').stdout;
const Queue = require('queue-cb');
const get = require('get-remote');

const distPaths = require('node-filename-to-dist-paths');

function checkFileName(filename, version, callback) {
  const queue = new Queue(1);
  const all = distPaths(filename, version).reverse();
  assert.ok(all.length > 0, `${filename} ${version}`);

  function next(callback) {
    if (!all.length) return callback();
    const distPath = all.pop();
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
  const queue = new Queue(1);
  const all = dist.files.slice().reverse();

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

const SPECIFIC_VERSION = null;
const SKIP_TESTS = 0;
const MAX_TESTS = 1;

describe('filename-to-dist', () => {
  let dists = null;

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
    const queue = new Queue(1);
    const all = dists.slice().reverse();

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
