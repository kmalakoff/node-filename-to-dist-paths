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
