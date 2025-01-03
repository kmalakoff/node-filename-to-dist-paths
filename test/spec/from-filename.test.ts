import assert from 'assert';
import get from 'get-remote';
import Pinkie from 'pinkie-promise';
import sll from 'single-line-log2';

// @ts-ignore
import fromFilename, { getDists } from 'node-filename-to-dist-paths';

describe('filename', () => {
  (() => {
    // patch and restore promise
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      // @ts-ignore
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = rootPromise;
    });
  })();

  const dists = getDists();
  const majors = {};

  function addTests(dist) {
    const { version, files } = dist;

    it(`${version} should find the paths`, async () => {
      let error = null;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const distPath = fromFilename(file, version);
        try {
          await get(`https://nodejs.org/dist/${distPath}`).head();
          sll.stdout(`${version} ${file} ${distPath}.Status: OK`);
        } catch (err) {
          console.log(`\n${version} ${file} ${distPath}. Status: Error ${err.message}`);
          error = error || err;
        }
      }

      assert.ok(!error);
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
