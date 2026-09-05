import assert from 'assert';
import { isRetryable } from '../lib/retry.ts';

// get-file-compat only resolves default ports, so the loop itself runs live against nodejs.org;
// this covers the retry decision in isolation with real errors and status codes, no network.
describe('retry', () => {
  describe('isRetryable', () => {
    it('retries transient network errors', () => {
      for (const code of ['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'EAI_AGAIN', 'EPIPE']) {
        const err = new Error(code) as NodeJS.ErrnoException;
        err.code = code;
        assert.ok(isRetryable(err), code);
      }
    });

    it('retries a socket hang up error with no code', () => {
      assert.ok(isRetryable(new Error('socket hang up')));
    });

    it('retries 429 and 5xx responses', () => {
      assert.ok(isRetryable(null, 429));
      assert.ok(isRetryable(null, 503));
    });

    it('does not retry a definitive 404', () => {
      assert.ok(!isRetryable(null, 404));
      assert.ok(!isRetryable(new Error('not found'), 404));
    });

    it('does not retry an unrelated error with no code', () => {
      assert.ok(!isRetryable(new Error('boom')));
    });
  });
});
