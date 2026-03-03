import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import {
  getTurnstileConfigState,
  isTurnstileEnabled,
  verifyTurnstileToken,
} from './turnstile';

const originalFetch = globalThis.fetch;
const originalEnv = {...process.env};

function restoreEnv(): void {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }

  for (const [key, value] of Object.entries(originalEnv)) {
    process.env[key] = value;
  }
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  restoreEnv();
});

test('isTurnstileEnabled is false when secret is not configured', () => {
  delete process.env.TURNSTILE_SECRET_KEY;
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  assert.equal(isTurnstileEnabled(), false);
});

test('verifyTurnstileToken returns true when turnstile is disabled', async () => {
  delete process.env.TURNSTILE_SECRET_KEY;
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const result = await verifyTurnstileToken({token: null});
  assert.equal(result, true);
});

test('getTurnstileConfigState returns misconfigured for partial setup', () => {
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  assert.equal(getTurnstileConfigState(), 'misconfigured');
});

test('verifyTurnstileToken returns false for misconfigured setup', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const result = await verifyTurnstileToken({token: 'token'});
  assert.equal(result, false);
});

test('verifyTurnstileToken returns false for missing token when enabled', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site-key';

  const result = await verifyTurnstileToken({token: null});
  assert.equal(result, false);
});

test('verifyTurnstileToken returns true for successful verification', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site-key';

  const mockFetch: typeof fetch = async () =>
    new Response(JSON.stringify({success: true}), {status: 200});
  globalThis.fetch = mockFetch;

  const result = await verifyTurnstileToken({
    token: 'token',
    remoteIp: '203.0.113.4',
  });
  assert.equal(result, true);
});

test('verifyTurnstileToken returns false on upstream error', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site-key';

  const mockFetch: typeof fetch = async () =>
    new Response(JSON.stringify({success: false}), {status: 500});
  globalThis.fetch = mockFetch;

  const result = await verifyTurnstileToken({token: 'token'});
  assert.equal(result, false);
});
