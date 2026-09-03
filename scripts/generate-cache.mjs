#!/usr/bin/env node

/**
 * Refreshes the cache shipped in .cache from nodejs.org.
 *
 * Usage: npm run build:cache
 *
 * Goes through getDistsAsync so the seed is written by the same code path that runs at runtime.
 */

import { CACHE_PATH } from '../dist/esm/constants.js';
import getDistsAsync from '../dist/esm/getDistsAsync.js';

await new Promise((resolve, reject) => getDistsAsync((err) => (err ? reject(err) : resolve())));
console.log(`Refreshed ${CACHE_PATH}`);
