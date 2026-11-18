import type { Dist } from '../types.ts';

// Throws on a body that is plainly not the release list, so it is never stored in the shared home folder.
export default function validate(body: Dist[]): Dist[] {
  if (!Array.isArray(body) || body.length === 0) throw new Error('node-filename-to-dist-paths: the release list is not a non-empty array');
  for (let i = 0; i < body.length; i++) {
    const entry = body[i];
    if (!entry || typeof entry !== 'object' || typeof entry.version !== 'string') throw new Error(`node-filename-to-dist-paths: release list entry ${i} has no version`);
  }
  return body;
}
