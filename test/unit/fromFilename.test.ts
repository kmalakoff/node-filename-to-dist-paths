import assert from 'assert';
import fromFilename from '../../src/fromFilename.ts';

describe('fromFilename', () => {
  it('maps a musl arch variant to a suffixed tarball, not a bare extension', () => {
    assert.equal(fromFilename('linux-x64-musl', 'v24.20.0'), 'v24.20.0/node-v24.20.0-linux-x64-musl.tar.gz');
  });

  it('honors the compression specifier for a musl variant', () => {
    assert.equal(fromFilename('linux-x64-musl', 'v24.20.0', { compression: 'xz' }), 'v24.20.0/node-v24.20.0-linux-x64-musl.tar.xz');
  });

  it('maps a plain platform-arch pair to a .tar.gz', () => {
    assert.equal(fromFilename('linux-x64', 'v18.20.4'), 'v18.20.4/node-v18.20.4-linux-x64.tar.gz');
  });

  it('maps win exe to a platform-arch directory', () => {
    assert.equal(fromFilename('win-x64-exe', 'v18.20.4'), 'v18.20.4/win-x64/node.exe');
  });

  it('maps win exe for major 0 to a version-root file', () => {
    assert.equal(fromFilename('win-x64-exe', 'v0.10.48'), 'v0.10.48/node.exe');
  });

  it('maps headers to the shasums file', () => {
    assert.equal(fromFilename('headers', 'v18.20.4'), 'v18.20.4/SHASUMS256.txt');
  });

  it('maps src to the source tarball', () => {
    assert.equal(fromFilename('src', 'v18.20.4'), 'v18.20.4/node-v18.20.4.tar.gz');
  });
});
