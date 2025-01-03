import assert from 'assert';
import get from 'get-remote';
import Pinkie from 'pinkie-promise';
import sll from 'single-line-log2';

// @ts-ignore
import { fromSpecifier, getDists } from 'node-filename-to-dist-paths';

const PLAFORM_ARCHS = {
  // aix: ['ppc64'],
  darwin: ['x64', 'arm64'],
  linux: ['arm64', 'armv6l', 'armv7l', 'ppc64', 'ppc64le', 's390x', 'x64', 'x86'],
  // sunos: ['x64', 'x86'],
  win32: ['arm64', 'x64', 'x86', 'ia32'],
};

describe('specifier', () => {
  (() => {
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
    const { version } = dist;

    it(`${version} should find the paths`, async () => {
      let error = null;

      for (const platform in PLAFORM_ARCHS) {
        const archs = PLAFORM_ARCHS[platform];
        for (let i = 0; i < archs.length; i++) {
          const arch = archs[i];
          const result = fromSpecifier({ platform, arch }, version);
          try {
            await get(`https://nodejs.org/dist/${result.distPath}`).head();
            sll.stdout(`${version} ${platform} ${arch} ${result.distPath}.Status: OK`);
          } catch (err) {
            console.log(`\n${version} ${platform} ${arch} ${result.distPath}. Status: Error ${err.message}`);
            error = error || err;
          }
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
