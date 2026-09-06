import assert from 'assert';
import type { Dist } from 'node-filename-to-dist-paths';
import fromFilename, { getDists } from 'node-filename-to-dist-paths';
import getWithRetry from '../lib/retry.ts';

const BASE = 'https://nodejs.org/dist/';

// Fetches each major's published SHASUMS256.txt from nodejs.org, one request per spec.
describe('filename', () => {
  const dists = getDists();
  const majors: Record<string, boolean> = {};

  function addTests(dist: Dist) {
    const { version, files } = dist;

    it(`${version} should find the paths`, (done) => {
      getWithRetry(`${BASE}${version}/SHASUMS256.txt`, { retries: 5, delay: 1000, maxDelay: 16000, timeout: 10000 }, (err, body) => {
        if (err) return done(err);

        const listed: Record<string, boolean> = Object.create(null);
        const lines = (body || '').split('\n');
        for (let i = 0; i < lines.length; i++) {
          const name = lines[i].trim().split(/\s+/)[1];
          if (name) listed[name] = true;
        }

        for (let j = 0; j < files.length; j++) {
          const distPath = fromFilename(files[j], version);
          const rel = distPath.slice(version.length + 1);
          assert.ok(listed[rel], `${version} ${files[j]} -> ${rel} not published`);
        }
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
