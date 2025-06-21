import Module from 'module';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const path = '../../assets/constants.cjs';
const constants = _require(path);

export const CACHE_PATH = constants.CACHE_PATH as string;
export const DISTS_URL = constants.DISTS_URL as string;
