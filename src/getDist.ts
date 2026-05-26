import getDists from './getDists.ts';

import type { Dist } from './types.ts';

export default function getDist(version: string): Dist | null {
  const dists = getDists();
  if (!dists) return null;
  for (const dist of dists) {
    if (dist.version === version) return dist;
  }
  return null;
}
