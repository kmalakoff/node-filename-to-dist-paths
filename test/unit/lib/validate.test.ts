import assert from 'assert';
import fs from 'fs';
import path from 'path';
import url from 'url';
import validate from '../../../src/lib/validate.ts';
import type { Dist } from '../../../src/types.ts';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const SEED_PATH = path.join(__dirname, '..', '..', '..', '.cache');

describe('validate', () => {
  it('accepts the shipped seed and returns the body unchanged', () => {
    const files = fs.readdirSync(SEED_PATH);
    assert.ok(files.length > 0);
    for (let i = 0; i < files.length; i++) {
      const body = JSON.parse(fs.readFileSync(path.join(SEED_PATH, files[i]), 'utf8')).body;
      assert.strictEqual(validate(body), body);
    }
  });

  it('accepts entries without npm', () => {
    const body = [{ version: 'v0.1.14', files: [] }] as unknown as Dist[];
    assert.strictEqual(validate(body), body);
  });

  it('rejects what is not the list', () => {
    const bad: unknown[] = [{ message: 'please sign in' }, [], null, 'text', 7, [null], [{}], [{ version: 7 }], [{ version: 'v1.0.0' }, { version: null }]];
    for (let i = 0; i < bad.length; i++) assert.throws(() => validate(bad[i] as never), `${JSON.stringify(bad[i])} should be rejected`);
  });
});
