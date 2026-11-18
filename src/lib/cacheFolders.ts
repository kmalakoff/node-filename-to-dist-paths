import path from 'path';
import { homedir, isAbsolute } from '../compat.ts';
import { CACHE_FORMAT, CACHE_NAME, CACHE_PATH } from '../constants.ts';

export interface CacheFolders {
  cachePath: string;
  seedPath?: string;
  /** True when there is no usable home folder: the shipped copy is read and nothing is refreshed. */
  noHome?: boolean;
}

// Resolved per call, never at import.
export function resolveHome(): string | null {
  try {
    return homedir() || null;
  } catch (_err) {
    return null;
  }
}

export default function cacheFolders(cachePath: string | undefined, home: string | null | undefined): CacheFolders {
  if (cachePath) return { cachePath };
  if (!home || !isAbsolute(home)) return { cachePath: CACHE_PATH, noHome: true };
  return { cachePath: path.join(home, `.${CACHE_NAME}`, 'cache', CACHE_FORMAT), seedPath: CACHE_PATH };
}
