import type { Specifier } from './types';

export default function fromFilename(filename: string, version: string, specifier: Specifier = {}) {
  const major = +version.split('.')[0].slice(1);

  const parts = filename.split('-');
  let platform = parts[0];
  const arch = parts[1];
  let ext = parts[2];
  if (platform === 'osx') platform = 'darwin';

  if (parts.length < 3) ext = 'tar';
  if (ext === 'tar') ext = `tar.${specifier.compression || 'gz'}`;

  if (platform === 'src') return `${version}/node-${version}.${ext}`;
  if (platform === 'headers') return `${version}/SHASUMS256.txt`;
  if (ext === 'pkg') return `${version}/node-${version}.${ext}`;

  if (platform === 'win') {
    if (ext === 'exe') {
      if (major === 0) return `${version}/node.${ext}`;
      return `${version}/${platform}-${arch}/node.${ext}`;
    }
    if (ext === 'msi') return `${version}/node-${version}-${arch}.${ext}`;
  }

  return `${version}/node-${version}-${platform}-${arch}.${ext}`;
}
