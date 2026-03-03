import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getClientIpFromHeaders,
  hashIdentifier,
  isSuspiciousSubmissionTiming,
} from './contact-security';

function createHeaderMap(values: Record<string, string | null>) {
  return {
    get(name: string): string | null {
      const key = Object.keys(values).find(
        (existing) => existing.toLowerCase() === name.toLowerCase()
      );
      return key ? values[key] : null;
    },
  };
}

test('getClientIpFromHeaders prefers first x-forwarded-for hop', () => {
  const ip = getClientIpFromHeaders(
    createHeaderMap({
      'x-forwarded-for': '203.0.113.10, 70.41.3.18',
      'x-real-ip': '198.51.100.2',
    })
  );

  assert.equal(ip, '203.0.113.10');
});

test('getClientIpFromHeaders falls back to x-real-ip', () => {
  const ip = getClientIpFromHeaders(
    createHeaderMap({
      'x-real-ip': '198.51.100.2',
    })
  );

  assert.equal(ip, '198.51.100.2');
});

test('hashIdentifier returns stable SHA-256 hash', () => {
  assert.equal(
    hashIdentifier('198.51.100.2'),
    '8c9bbd8a13b8a1f9016d2b64ef226bfdca4945918f299b5a34141013b8ae8ecc'
  );
});

test('isSuspiciousSubmissionTiming flags too fast submissions', () => {
  const result = isSuspiciousSubmissionTiming({
    nowMs: 10_000,
    formStartedAt: 8_200,
    minFillTimeMs: 2_500,
    maxFutureDriftMs: 60_000,
  });

  assert.equal(result, true);
});

test('isSuspiciousSubmissionTiming flags impossible future timestamps', () => {
  const result = isSuspiciousSubmissionTiming({
    nowMs: 10_000,
    formStartedAt: 80_500,
    minFillTimeMs: 2_500,
    maxFutureDriftMs: 60_000,
  });

  assert.equal(result, true);
});

test('isSuspiciousSubmissionTiming allows normal submissions', () => {
  const result = isSuspiciousSubmissionTiming({
    nowMs: 10_000,
    formStartedAt: 6_500,
    minFillTimeMs: 2_500,
    maxFutureDriftMs: 60_000,
  });

  assert.equal(result, false);
});
