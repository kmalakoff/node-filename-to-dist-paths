import './execSync/polyfill.cjs';
import fromFilename from './fromFilename';
import realArch from './lib/arch.cjs';
import getDist from './lib/getDist';

function startsWith(str, word) {
  return str.lastIndexOf(word, 0) === 0;
}

function find(array, pattern) {
  for (let i = 0; i < array.length; i++) {
    if (startsWith(array[i], pattern)) return array[i];
  }
  return null;
}

import type { Specifier, SpecifierResult } from './types';

let archMachine: NodeJS.Architecture;
export default function fromSpecifier(specifier: Specifier, version: string): SpecifierResult {
  if (!archMachine) archMachine = realArch() as NodeJS.Architecture;

  const dist = getDist(version);
  if (!dist) return;

  let platform = specifier.platform || process.platform;
  const arch = specifier.arch || archMachine || process.arch;
  const type = specifier.type;

  if (platform === 'win32') platform = 'win';
  else if (platform === 'darwin') platform = 'osx';

  let filename = find(dist.files, type ? `${platform}-${arch}-${type}` : `${platform}-${arch}`);
  if (!filename) filename = find(dist.files, `${platform}-x64`);
  if (!filename) filename = find(dist.files, `${platform}-x86`);
  if (!filename) return null;

  const distPath = fromFilename(filename, version, specifier);
  return distPath ? { distPath, filename } : null;
}
