import { DISTS_URL } from './constants.ts';
import getCache from './lib/getCache.ts';
import type { Dist, DistsOptions } from './types.ts';

export default function getDists(options?: DistsOptions): Dist[] | null {
  return getCache(options?.cachePath).cache.getSync<Dist[]>(DISTS_URL);
}
