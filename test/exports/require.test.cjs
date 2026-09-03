const assert = require('assert');
const fromFilename = require('node-filename-to-dist-paths');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof fromFilename, 'function');
  });
  it('constants', () => {
    assert.equal(typeof fromFilename.constants, 'object');
  });
  it('getDist', () => {
    assert.equal(typeof fromFilename.getDist, 'function');
  });
  it('getDistAsync', () => {
    assert.equal(typeof fromFilename.getDistAsync, 'function');
  });
  it('getDists', () => {
    assert.equal(typeof fromFilename.getDists, 'function');
  });
  it('getDistsAsync', () => {
    assert.equal(typeof fromFilename.getDistsAsync, 'function');
  });
});
