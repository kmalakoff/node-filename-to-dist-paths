import assert from 'assert';
import fromFilename, { constants, getDist, getDistAsync, getDists, getDistsAsync } from 'node-filename-to-dist-paths';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof fromFilename, 'function');
  });
  it('constants', () => {
    assert.equal(typeof constants, 'object');
  });
  it('getDist', () => {
    assert.equal(typeof getDist, 'function');
  });
  it('getDistAsync', () => {
    assert.equal(typeof getDistAsync, 'function');
  });
  it('getDists', () => {
    assert.equal(typeof getDists, 'function');
  });
  it('getDistsAsync', () => {
    assert.equal(typeof getDistsAsync, 'function');
  });
});
