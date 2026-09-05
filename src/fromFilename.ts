import type { Specifier } from './types.ts';

const EXTENSIONS = ['tar', 'zip', '7z', 'msi', 'exe', 'pkg'];

export default function fromFilename(filename: string, version: string, specifier: Specifier = {}): string {
  const major = +version.split('.')[0].slice(1);
  const parts = filename.split('-');
  let platform = parts[0];
  const arch = parts[1];

  // A 3rd segment outside the known extensions (e.g. musl) is an arch variant, not the extension.
  let variant = '';
  let ext = parts[2];
  if (parts.length < 3) ext = platform === 'win' ? 'zip' : 'tar';
  else if (EXTENSIONS.indexOf(ext) === -1) {
    variant = '-'.concat(ext);
    ext = 'tar';
  }
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
  return ''.concat(version, '/node-').concat(version, '-').concat(platform, '-').concat(arch).concat(variant, '.').concat(ext);
}
