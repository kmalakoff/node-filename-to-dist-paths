export type DistCallback = (error?: Error | null, dist?: Dist | null) => void;
export type DistsCallback = (error?: Error | null, dists?: Dist[] | null) => void;

export interface Dist {
  version: string;
  date: string;
  files: string[];
  npm: string;
  v8: string;
  uv: string;
  zlib: string;
  openssl: string;
  modules: string;
  lts: boolean;
  security: boolean;
}

export interface Specifier {
  compression?: string;
}

export interface DistsOptions {
  /**
   * The only folder read and written. Without it the list is refreshed into `~/.node-filename-to-dist-paths/cache/<format>/`
   * and the copy shipped with the package is read when it is newer. With it, the sync functions return `null`
   * until an async function has saved the list there.
   */
  cachePath?: string;
}
