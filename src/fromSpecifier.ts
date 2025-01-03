import './execSync/polyfill.cjs';
import fromFilename from './fromFilename';
import realArch from './lib/arch.cjs';
import getDist from './lib/getDist';

import type { Specifier } from './types';

function startsWith(str, word) {
  return str.lastIndexOf(word, 0) === 0;
}

function find(array, pattern) {
  for (let i = 0; i < array.length; i++) {
    if (startsWith(array[i], pattern)) return array[i];
  }
  return null;
}

let archMachine: NodeJS.Architecture;
export default function fromSpecifier(specifier: Specifier, version: string) {
  if (!archMachine) archMachine = realArch() as NodeJS.Architecture;

  const dist = getDist(version);
  if (!dist) return;

  let platform = specifier.platform || process.platform;
  const arch = specifier.arch || archMachine || process.arch;
  const type = specifier.type;

  if (platform === 'win32') platform = 'win';
  else if (platform === 'darwin') platform = 'osx';

  let file = find(dist.files, type ? `${platform}-${arch}-${type}` : `${platform}-${arch}`);
  if (!file) file = find(dist.files, `${platform}-x64`);
  if (!file) file = find(dist.files, `${platform}-x86`);
  if (!file) return null;

  return fromFilename(file, version, specifier);
}
