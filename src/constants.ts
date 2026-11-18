import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

/** The cache shipped in the package, seeded by `npm run build:cache`. It is only read: refreshes are written to `~/.node-filename-to-dist-paths/cache/<format>/`. */
export const CACHE_PATH = path.join(__dirname, '..', '..', '.cache');
export const DISTS_URL = 'https://nodejs.org/dist/index.json';
export const CACHE_FORMAT = 'v1';
export const CACHE_NAME = 'node-filename-to-dist-paths';
