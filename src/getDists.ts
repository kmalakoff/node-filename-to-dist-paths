import Cache from 'fetch-json-cache';
import { CACHE_PATH, DISTS_URL } from './constants.ts';

const cache = new Cache(CACHE_PATH);

import type { Dist } from './types.ts';

export default function getDists(): Dist[] {
  return cache.getSync(DISTS_URL) as Dist[];
}
