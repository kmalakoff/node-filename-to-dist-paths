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
  platform?: NodeJS.Platform | string;
  arch?: NodeJS.Architecture | string;
  type?: string;
  compression?: string;
}

export interface SpecifierResult {
  filename: string;
  distPath: string;
}
