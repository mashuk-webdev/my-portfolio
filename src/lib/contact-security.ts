import { createHash } from 'node:crypto';

type HeaderReader = {
  get(name: string): string | null;
};

function normalizeIpCandidate(raw: string | null): string | null {
  if (!raw) return null;

  const normalized = raw.trim();
  if (!normalized) return null;

  // Keep a conservative length to avoid storing unbounded header data.
  if (normalized.length > 64) return null;

  return normalized;
}

export function getClientIpFromHeaders(headers: HeaderReader): string | null {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstHop = forwardedFor
      .split(',')
      .map((entry) => entry.trim())
      .find((entry) => entry.length > 0);

    const normalizedForwarded = normalizeIpCandidate(firstHop ?? null);
    if (normalizedForwarded) return normalizedForwarded;
  }

  return normalizeIpCandidate(headers.get('x-real-ip'));
}

export function hashIdentifier(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function isSuspiciousSubmissionTiming({
  formStartedAt,
  nowMs = Date.now(),
  minFillTimeMs,
  maxFutureDriftMs,
}: {
  formStartedAt?: number;
  nowMs?: number;
  minFillTimeMs: number;
  maxFutureDriftMs: number;
}): boolean {
  if (!formStartedAt) return false;

  if (formStartedAt > nowMs + maxFutureDriftMs) {
    return true;
  }

  return nowMs - formStartedAt < minFillTimeMs;
}
