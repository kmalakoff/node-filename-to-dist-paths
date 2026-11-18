import assert from 'assert';
import path from 'path';
import { CACHE_PATH } from '../../../src/constants.ts';
import cacheFolders from '../../../src/lib/cacheFolders.ts';

const HOME = path.resolve(path.sep, 'home', 'someone');

describe('cacheFolders', () => {
  it('uses an explicit cachePath only', () => {
    const folders = cacheFolders('/some/where', HOME);
    assert.deepEqual(folders, { cachePath: '/some/where' });
  });

  it('an explicit cachePath ignores a missing home', () => {
    assert.deepEqual(cacheFolders('/some/where', null), { cachePath: '/some/where' });
  });

  it('uses the home v1 folder plus the seed for an absolute home', () => {
    const folders = cacheFolders(undefined, HOME);
    assert.strictEqual(folders.cachePath, path.join(HOME, '.node-filename-to-dist-paths', 'cache', 'v1'));
    assert.strictEqual(path.resolve(folders.seedPath as string), path.resolve(CACHE_PATH));
    assert.strictEqual(folders.noHome, undefined);
  });

  it('reads the seed only when home is unusable', () => {
    const values: (string | null | undefined)[] = [null, undefined, '', '.', 'rel/dir'];
    for (let i = 0; i < values.length; i++) {
      const folders = cacheFolders(undefined, values[i]);
      assert.deepEqual(folders, { cachePath: CACHE_PATH, noHome: true });
    }
  });
});
