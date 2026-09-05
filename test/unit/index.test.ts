import type { Dist } from 'node-filename-to-dist-paths';
import fromFilename, { getDists } from 'node-filename-to-dist-paths';
import Queue from 'queue-cb';
import sll from 'single-line-log2';
import headWithRetry from '../lib/retry.ts';

describe('filename', () => {
  const dists = getDists();
  const majors: Record<string, boolean> = {};

  function addTests(dist: Dist) {
    const { version, files } = dist;

    it(`${version} should find the paths`, (done) => {
      const queue = new Queue();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const distPath = fromFilename(file, version);

        queue.defer((callback) => {
          headWithRetry(`https://nodejs.org/dist/${distPath}`, { retries: 5, delay: 1000, maxDelay: 16000, timeout: 10000 }, (err) => {
            if (err) {
              console.log(`\n${version} ${file} ${distPath}. Status: Error ${err.message}`);
              return callback(err);
            }
            sll.stdout(`${version} ${file} ${distPath}.Status: OK`);
            callback(undefined);
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

  if (dists) {
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
  }
});
