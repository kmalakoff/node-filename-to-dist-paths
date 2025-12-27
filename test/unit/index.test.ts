import { head } from 'get-file-compat';
import fromFilename, { getDists } from 'node-filename-to-dist-paths';
import Queue from 'queue-cb';
import sll from 'single-line-log2';

function headWithRetry(url, options?, callback?) {
  const retries = options?.retries || 10;
  const delay = options?.delay || 2000;
  const maxDelay = options?.maxDelay || 60000;
  const timeout = options?.timeout || 20000;

  function attempt(n) {
    head(url, { timeout }, (err) => {
      if (err) {
        if (n >= retries) {
          if (callback) callback(err);
          return;
        }
        // Exponential backoff with jitter and cap
        const expDelay = Math.min(delay * 2 ** (n - 1), maxDelay);
        const jitter = Math.random() * 1000;
        setTimeout(() => attempt(n + 1), expDelay + jitter);
      } else {
        if (callback) callback(null);
      }
    });
  }

  attempt(1);
}

describe('filename', () => {
  const dists = getDists();
  const majors = {};

  function addTests(dist) {
    const { version, files } = dist;

    it(`${version} should find the paths`, (done) => {
      const queue = new Queue();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const distPath = fromFilename(file, version);

        queue.defer((callback) => {
          headWithRetry(`https://nodejs.org/dist/${distPath}`, { retries: 5, delay: 2000, timeout: 10000 }, (err) => {
            if (err) {
              console.log(`\n${version} ${file} ${distPath}. Status: Error ${err.message}`);
              callback(err);
            } else {
              sll.stdout(`${version} ${file} ${distPath}.Status: OK`);
              callback(null);
            }
          });
        });
      }

      queue.await((err) => {
        if (err) return done(err);
        console.log(`\n${version} passed`);
        done();
      });
    });
  }

  for (const key in dists) {
    const dist = dists[key];
    const guard = dist.version
      .split('.')
      .slice(0, dist.version[1] === '0' ? 2 : 1)
      .join('.');
    if (guard[1] === '0' && +dist.version.split('.')[1] < 8) continue; // no good versions before 0.8
    if (majors[guard]) continue;
    majors[guard] = true;
    addTests(dist);
  }
});
