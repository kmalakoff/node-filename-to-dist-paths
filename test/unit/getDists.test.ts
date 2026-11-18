import assert from 'assert';
import fs from 'fs';
import { constants, getDist, getDists } from 'node-filename-to-dist-paths';
import path from 'path';
import useCache from '../lib/cache.ts';

describe('getDists', () => {
  const scratch = useCache('getDists');

  it('reads the shipped seed when the cachePath option names it', () => {
    const dists = getDists({ cachePath: constants.CACHE_PATH });
    assert.ok(dists && dists.length > 0);
    assert.ok(getDist('v20.0.0', { cachePath: constants.CACHE_PATH }));
  });

  it('returns null for an empty cachePath folder: that folder only, no seed', () => {
    const empty = path.join(scratch, 'empty');
    assert.strictEqual(getDists({ cachePath: empty }), null);
    assert.strictEqual(getDist('v20.0.0', { cachePath: empty }), null);
    assert.ok(!fs.existsSync(empty));
  });
});
