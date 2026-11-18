#!/usr/bin/env node

/**
 * Refreshes the seed shipped in .cache from nodejs.org.
 *
 * Usage: npm run build:cache
 *
 * Writes the seed with an explicit cachePath (the only place it is written), fails on any error,
 * then confirms the stored etag against a HEAD request made with get-file-compat, as fetch-json-cache does.
 */

import Cache from 'fetch-json-cache';
import fs from 'fs';
import { head } from 'get-file-compat';
import path from 'path';
import { CACHE_PATH, DISTS_URL } from '../dist/esm/constants.js';
import validate from '../dist/esm/lib/validate.js';

const cache = new Cache(CACHE_PATH, { transform: validate });
await cache.get(DISTS_URL, { force: true });

const files = fs.readdirSync(CACHE_PATH).filter((file) => /\.json$/.test(file));
if (files.length !== 1) throw new Error(`expected one record in ${CACHE_PATH}, found ${files.length}`);
const stored = JSON.parse(fs.readFileSync(path.join(CACHE_PATH, files[0]), 'utf8'));

const response = await head(DISTS_URL);
if (response.statusCode !== 200) throw new Error(`HEAD ${DISTS_URL} returned ${response.statusCode}`);
if (response.headers.etag !== stored.headers.etag) throw new Error(`${DISTS_URL} etag ${response.headers.etag} differs from the stored ${stored.headers.etag}`);

console.log(`Refreshed ${CACHE_PATH}`);
