import { DISTS_URL } from './constants.ts';
import getCache from './lib/getCache.ts';

import type { Dist, DistsCallback, DistsOptions } from './types.ts';

export default function getDistsAsync(options?: DistsOptions): Promise<Dist[] | null>;
export default function getDistsAsync(callback: DistsCallback): void;
export default function getDistsAsync(options: DistsOptions, callback: DistsCallback): void;
export default function getDistsAsync(options?: DistsOptions | DistsCallback, callback?: DistsCallback): void | Promise<Dist[] | null> {
  callback = typeof options === 'function' ? options : callback;
  const opts = typeof options === 'function' ? undefined : options;

  const worker = (callback: DistsCallback) => {
    const { cache, noHome } = getCache(opts?.cachePath);
    // no usable home to refresh into, or an unreachable endpoint - fall back to the newest stored copy
    if (noHome) return callback(undefined, cache.getSync<Dist[]>(DISTS_URL));
    cache.get<Dist[]>(DISTS_URL, (err, dists) => {
      if (err) return callback(undefined, cache.getSync<Dist[]>(DISTS_URL));
      callback(undefined, dists || null);
    });
  };

  if (typeof callback === 'function') return worker(callback);
  return new Promise((resolve, reject) => worker((err, dists) => (err ? reject(err) : resolve(dists ?? null))));
}
