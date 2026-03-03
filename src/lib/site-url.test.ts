import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import * as siteUrlModule from './site-url';

type SiteUrlExport = {
  getSiteUrl?: () => string;
  default?: {
    getSiteUrl?: () => string;
  };
};

const resolvedModule = siteUrlModule as unknown as SiteUrlExport;
const getSiteUrl =
  resolvedModule.getSiteUrl ?? resolvedModule.default?.getSiteUrl;

if (!getSiteUrl) {
  throw new Error('getSiteUrl export is not available');
}

const originalEnv = { ...process.env };

function resetSiteEnv(): void {
  for (const key of [
    'NEXT_PUBLIC_SITE_URL',
    'SITE_URL',
    'VERCEL_PROJECT_PRODUCTION_URL',
    'VERCEL_URL',
  ]) {
    delete process.env[key];
  }
}

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) {
      delete process.env[key];
    }
  }

  for (const [key, value] of Object.entries(originalEnv)) {
    process.env[key] = value;
  }
});

test('returns localhost fallback when site URL variables are unset', () => {
  resetSiteEnv();
  assert.equal(getSiteUrl(), 'http://localhost:3000');
});

test('normalizes URL without protocol', () => {
  resetSiteEnv();
  process.env.NEXT_PUBLIC_SITE_URL = 'example.com/path?query=yes';
  assert.equal(getSiteUrl(), 'https://example.com');
});

test('uses NEXT_PUBLIC_SITE_URL before other environment variables', () => {
  resetSiteEnv();
  process.env.NEXT_PUBLIC_SITE_URL = 'https://public.example.com';
  process.env.SITE_URL = 'https://server.example.com';
  assert.equal(getSiteUrl(), 'https://public.example.com');
});

test('falls back when configured URL is invalid', () => {
  resetSiteEnv();
  process.env.SITE_URL = 'not a url value';
  assert.equal(getSiteUrl(), 'http://localhost:3000');
});
