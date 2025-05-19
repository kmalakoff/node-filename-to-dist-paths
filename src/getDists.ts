import Cache from 'fetch-json-cache';
import { CACHE_PATH, DISTS_URL } from './constants.js';

const cache = new Cache(CACHE_PATH);

import type { Dist } from './types.js';

export default function getDists(): Dist[] {
  return cache.getSync(DISTS_URL) as Dist[];
}
