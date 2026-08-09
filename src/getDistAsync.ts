import getDistsAsync from './getDistsAsync.ts';

import type { Dist, DistCallback } from './types.ts';

export default function getDistAsync(version: string): Promise<Dist | null>;
export default function getDistAsync(version: string, callback: DistCallback): void;
export default function getDistAsync(version: string, callback?: DistCallback): void | Promise<Dist | null> {
  const worker = (callback: DistCallback) => {
    getDistsAsync((err, dists) => {
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
