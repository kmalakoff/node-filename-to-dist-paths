import Cache from 'fetch-json-cache';
import { CACHE_PATH, DISTS_URL } from './constants.ts';

import type { Dist } from './types.ts';

const cache = new Cache(CACHE_PATH);

export default function getDists(): Dist[] {
  return cache.getSync<Dist[]>(DISTS_URL);
}
