import getDists from './getDists.ts';

import type { Dist } from './types.ts';

export default function getDist(version: string): Dist | null {
  const dists = getDists();
  if (!dists) return null;
  for (const key in dists) {
    const dist = dists[key];
    if (dist.version === version) return dist;
  }
  return null;
}
