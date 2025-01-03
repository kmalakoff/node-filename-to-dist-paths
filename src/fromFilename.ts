import type { Specifier } from './types';

export default function fromFilename(filename: string, version: string, specifier: Specifier = {}) {
  const major = +version.split('.')[0].slice(1);
  const parts = filename.split('-');
  let platform = parts[0];
  const arch = parts[1];

  let ext = parts[2];
  if (parts.length < 3) ext = platform === 'win' ? 'zip' : 'tar';
  if (ext === 'tar') ext = 'tar.'.concat(specifier.compression || 'gz');

  if (ext === 'pkg') return ''.concat(version, '/node-').concat(version, '.').concat(ext);
  if (platform === 'src') return ''.concat(version, '/node-').concat(version, '.').concat(ext);
  if (platform === 'headers') return ''.concat(version, '/SHASUMS256.txt');

  if (platform === 'win') {
    if (ext === 'exe') {
      if (major === 0) return ''.concat(version, '/node.').concat(ext);
      return ''.concat(version, '/').concat(platform, '-').concat(arch, '/node.').concat(ext);
    }
    if (ext === 'msi') return ''.concat(version, '/node-').concat(version, '-').concat(arch, '.').concat(ext);
  } else if (platform === 'osx') platform = 'darwin';
  return ''.concat(version, '/node-').concat(version, '-').concat(platform, '-').concat(arch, '.').concat(ext);
}
