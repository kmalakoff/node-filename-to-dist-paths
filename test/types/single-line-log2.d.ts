declare module 'single-line-log2' {
  interface SingleLineLog {
    stdout(...args: unknown[]): void;
    stderr(...args: unknown[]): void;
  }
  const sll: SingleLineLog;
  export = sll;
}
