import exit from 'exit-compat';
import Cache from 'fetch-json-cache';
import { CACHE_PATH, DISTS_URL } from '../constants.ts';

function cache(callback: (err: Error | null) => undefined): void {
  const cacheInstance = new Cache(CACHE_PATH);
  cacheInstance.get(DISTS_URL, { force: true }, callback);
}

// run patch
cache((err) => {
  if (err) {
    console.log(`postinstall failed. Error: ${err.message}`);
    exit(-1);
  } else {
    console.log('postinstall succeeded');
    exit(0);
  }
});
