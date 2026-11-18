import assert from 'assert';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { mkdirRecursive, rmRecursive, tmpdir } from './compat.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const SEED_PATH = path.join(__dirname, '..', '..', '.cache');

// A scratch folder under .tmp/ for one suite; the shipped seed must come out byte-identical.
export default function useCache(suite: string): string {
  const scratch = path.join(tmpdir(), `cache-${suite}-${process.pid}`);
  let seeds: { file: string; contents: Buffer }[];

  before(() => {
    rmRecursive(scratch);
    mkdirRecursive(scratch);
    seeds = fs.readdirSync(SEED_PATH).map((file) => ({ file, contents: fs.readFileSync(path.join(SEED_PATH, file)) }));
  });

  after(() => {
    rmRecursive(scratch);
    assert.deepEqual(
      fs.readdirSync(SEED_PATH),
      seeds.map(({ file }) => file),
      'tests must not create shipped cache files'
    );
    for (let index = 0; index < seeds.length; index++) {
      const { file, contents } = seeds[index];
      assert.deepEqual(fs.readFileSync(path.join(SEED_PATH, file)), contents, `tests must not refresh shipped cache ${file}`);
    }
  });

  return scratch;
}
