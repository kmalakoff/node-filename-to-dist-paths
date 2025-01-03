import getDists from '../getDists';

import type { Dist } from '../types';

export default function getDist(version: string): Dist | null {
  const dists = getDists();
  for (const key in dists) {
    if (dists[key].version === version) return dists[key];
  }
  return null;
}
