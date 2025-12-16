import { head } from 'get-file-compat';
import fromFilename, { getDists } from 'node-filename-to-dist-paths';
import sll from 'single-line-log2';

function headWithRetry(url, options?, callback?) {
  const retries = options?.retries || 3;
  const delay = options?.delay || 1000;

  function attempt(n) {
    head(url, (err) => {
      if (err) {
        if (n >= retries) {
          if (callback) callback(err);
          return;
        }
        setTimeout(() => attempt(n + 1), delay * n);
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
      let completed = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const distPath = fromFilename(file, version);
        headWithRetry(`https://nodejs.org/dist/${distPath}`, { retries: 3, delay: 1000 }, (err) => {
          if (err) {
            console.log(`\n${version} ${file} ${distPath}. Status: Error ${err.message}`);
            done(err);
          } else {
            sll.stdout(`${version} ${file} ${distPath}.Status: OK`);
            completed++;
            if (completed === files.length) {
              console.log(`\n${version} passed`);
              done();
            }
          }
        });
      }
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
