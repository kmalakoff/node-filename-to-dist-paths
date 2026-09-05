import { head } from 'get-file-compat';

export interface RetryOptions {
  retries?: number;
  delay?: number;
  maxDelay?: number;
  timeout?: number;
}

const RETRYABLE_CODES = ['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'EAI_AGAIN', 'EPIPE'];

// Transient network errors and 429/5xx responses are worth retrying; a definitive 404 is the
// signal this suite exists to catch, so it must fail immediately instead of being retried away.
export function isRetryable(err?: NodeJS.ErrnoException | null, statusCode?: number): boolean {
  if (statusCode === 404) return false;
  if (statusCode === 429 || (statusCode !== undefined && statusCode >= 500)) return true;
  if (!err) return false;
  if (err.code && RETRYABLE_CODES.indexOf(err.code) !== -1) return true;
  // Versions of get-file-compat below the fixed release raise this error with no `code` set;
  // match the message directly so retries still work against the range currently locked here.
  if (/^Request timeout/.test(err.message || '')) return true;
  return /socket hang up/.test(err.message || '');
}

export default function headWithRetry(url: string, options: RetryOptions, callback: (err?: Error | null) => void): void {
  const retries = options.retries || 5;
  const delay = options.delay || 1000;
  const maxDelay = options.maxDelay || 16000;
  const timeout = options.timeout || 10000;

  function attempt(n: number) {
    head(url, { timeout }, (err, response) => {
      const statusCode = response?.statusCode;
      if (!err && statusCode !== undefined && statusCode >= 200 && statusCode < 300) return callback(undefined);

      const failure = err || new Error(`Unexpected status code ${statusCode}`);
      if (!isRetryable(err, statusCode) || n >= retries) return callback(failure);

      console.warn(`[retry ${n}/${retries}] ${url}: ${failure.message}`);
      const expDelay = Math.min(delay * 2 ** (n - 1), maxDelay);
      setTimeout(() => attempt(n + 1), expDelay);
    });
  }

  attempt(1);
}
