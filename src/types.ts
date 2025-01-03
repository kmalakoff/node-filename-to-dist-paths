export interface Dist {
  version: string;
  files: string[];
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
