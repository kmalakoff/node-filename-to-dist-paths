// Network suite: refreshes the Node.js release list from nodejs.org into scratch folders.
import assert from 'assert';
import fs from 'fs';
import { getDistAsync, getDistsAsync } from 'node-filename-to-dist-paths';
import path from 'path';
import useCache from '../lib/cache.ts';

describe('getDistsAsync', () => {
  const scratch = useCache('getDistsAsync');

  it('stores a full record in an empty cachePath folder (callback)', (done) => {
    const cachePath = path.join(scratch, 'callback');
    getDistsAsync({ cachePath }, (err, dists) => {
      if (err) return done(err);
      assert.ok(dists && dists.length > 0);
      assert.ok(Array.isArray(dists[0].files));
      assert.ok(fs.readdirSync(cachePath).length > 0);
      done();
    });
  });

  it('finds one dist through getDistAsync with a cachePath', (done) => {
    getDistAsync('v20.0.0', { cachePath: path.join(scratch, 'one') }, (err, dist) => {
      if (err) return done(err);
      assert.strictEqual(dist?.version, 'v20.0.0');
      done();
    });
  });
});
