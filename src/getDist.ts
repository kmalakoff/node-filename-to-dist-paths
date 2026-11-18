import getDists from './getDists.ts';

import type { Dist, DistsOptions } from './types.ts';

export default function getDist(version: string, options?: DistsOptions): Dist | null {
  const dists = getDists(options);
  if (!dists) return null;
  for (const key in dists) {
    const dist = dists[key];
    if (dist.version === version) return dist;
  }
  return null;
}
