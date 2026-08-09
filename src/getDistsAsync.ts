import Cache from 'fetch-json-cache';
import { CACHE_PATH, DISTS_URL } from './constants.ts';

import type { Dist, DistsCallback } from './types.ts';

const cache = new Cache(CACHE_PATH);

export default function getDistsAsync(): Promise<Dist[] | null>;
export default function getDistsAsync(callback: DistsCallback): void;
export default function getDistsAsync(callback?: DistsCallback): void | Promise<Dist[] | null> {
  const worker = (callback: DistsCallback) => {
    cache.get<Dist[]>(DISTS_URL, (err, dists) => {
      // endpoint unreachable - fall back to the on-disk snapshot
      if (err) return callback(undefined, cache.getSync<Dist[]>(DISTS_URL));
      callback(undefined, dists || null);
    });
  };

  if (typeof callback === 'function') return worker(callback);
  return new Promise((resolve, reject) => worker((err, dists) => (err ? reject(err) : resolve(dists ?? null))));
}
