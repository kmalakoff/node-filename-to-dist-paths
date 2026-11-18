import Cache from 'fetch-json-cache';
import type { Dist } from '../types.ts';
import cacheFolders, { resolveHome } from './cacheFolders.ts';
import validate from './validate.ts';

export interface DistsCache {
  cache: Cache<Dist[]>;
  /** No usable home folder: only the shipped copy can be read. */
  noHome: boolean;
}

// Built per call: home is resolved when asked for, never at import.
export default function getCache(cachePath?: string): DistsCache {
  const folders = cacheFolders(cachePath, cachePath ? null : resolveHome());
  const cache = new Cache<Dist[]>(folders.cachePath, { seedPath: folders.seedPath, transform: validate });
  return { cache, noHome: !!folders.noHome };
}
