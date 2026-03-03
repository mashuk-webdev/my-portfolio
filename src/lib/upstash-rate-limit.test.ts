import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import {
  evaluateUpstashFixedWindow,
  isUpstashRateLimitConfigured,
} from './upstash-rate-limit';

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

test('isUpstashRateLimitConfigured returns false without env config', () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;

  assert.equal(isUpstashRateLimitConfigured(), false);
});

test('evaluateUpstashFixedWindow returns blocked when counter exceeds limit', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'token';

  const mockFetch: typeof fetch = async () =>
    new Response(JSON.stringify([{result: 4}, {result: 1}]), {status: 200});

  globalThis.fetch = mockFetch;

  const result = await evaluateUpstashFixedWindow({
    key: 'contact:email:test',
    limit: 3,
    windowMs: 1000,
  });

  assert.equal(result, 'blocked');
});

test('evaluateUpstashFixedWindow returns allowed when counter is within limit', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'token';

  const mockFetch: typeof fetch = async () =>
    new Response(JSON.stringify([{result: 2}, {result: 1}]), {status: 200});

  globalThis.fetch = mockFetch;

  const result = await evaluateUpstashFixedWindow({
    key: 'contact:ip:test',
    limit: 3,
    windowMs: 1000,
  });

  assert.equal(result, 'allowed');
});

test('evaluateUpstashFixedWindow returns unavailable on upstream failure', async () => {
  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'token';

  const mockFetch: typeof fetch = async () =>
    new Response(JSON.stringify({error: 'fail'}), {status: 500});

  globalThis.fetch = mockFetch;

  const result = await evaluateUpstashFixedWindow({
    key: 'contact:email:test',
    limit: 3,
    windowMs: 1000,
  });

  assert.equal(result, 'unavailable');
});
