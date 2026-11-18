import getDistsAsync from './getDistsAsync.ts';

import type { Dist, DistCallback, DistsOptions } from './types.ts';

export default function getDistAsync(version: string, options?: DistsOptions): Promise<Dist | null>;
export default function getDistAsync(version: string, callback: DistCallback): void;
export default function getDistAsync(version: string, options: DistsOptions, callback: DistCallback): void;
export default function getDistAsync(version: string, options?: DistsOptions | DistCallback, callback?: DistCallback): void | Promise<Dist | null> {
  callback = typeof options === 'function' ? options : callback;
  const opts = typeof options === 'function' ? {} : options || {};

  const worker = (callback: DistCallback) => {
    getDistsAsync(opts, (err, dists) => {
      if (err) return callback(err);
      if (!dists) return callback(undefined, null);
      for (const key in dists) {
        const dist = dists[key];
        if (dist.version === version) return callback(undefined, dist);
      }
      callback(undefined, null);
    });
  };

  if (typeof callback === 'function') return worker(callback);
  return new Promise((resolve, reject) => worker((err, dist) => (err ? reject(err) : resolve(dist ?? null))));
}
