/**
 * Compatibility Layer for Node.js 0.8+
 * Local to this package - contains only needed functions.
 */
import os from 'os';
import path from 'path';

export function homedir(): string {
  return typeof os.homedir === 'function' ? os.homedir() : require('homedir-polyfill')();
}

// path.isAbsolute from Node 0.11.2; below that the same rule by hand
const WINDOWS_ABSOLUTE = /^([a-zA-Z]:)?[\\/]/;
export function isAbsolute(p: string): boolean {
  if (typeof path.isAbsolute === 'function') return path.isAbsolute(p);
  return process.platform === 'win32' ? WINDOWS_ABSOLUTE.test(p) : p.charAt(0) === '/';
}
