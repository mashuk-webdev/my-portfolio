type RateLimitStatus = 'allowed' | 'blocked' | 'unavailable';

type UpstashPipelineResultItem = {
  result?: number | string | null;
};

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) return null;

  return { url: url.replace(/\/+$/, ''), token };
}

function parseIncrementResult(payload: unknown): number | null {
  if (!Array.isArray(payload) || payload.length === 0) return null;

  const first = payload[0] as UpstashPipelineResultItem | number | string | null;

  if (typeof first === 'number') return Number.isFinite(first) ? first : null;
  if (typeof first === 'string') {
    const parsed = Number(first);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (first && typeof first === 'object' && 'result' in first) {
    const value = first.result;
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    if (typeof value === 'string') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }
  }

  return null;
}

export function isUpstashRateLimitConfigured(): boolean {
  return getUpstashConfig() !== null;
}

export async function evaluateUpstashFixedWindow(params: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<RateLimitStatus> {
  const config = getUpstashConfig();
  if (!config) return 'unavailable';

  const { key, limit, windowMs } = params;
  const endpoint = `${config.url}/pipeline`;
  const commands = [
    ['INCR', key],
    ['PEXPIRE', key, String(windowMs), 'NX'],
  ];

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
      cache: 'no-store',
    });

    if (!response.ok) return 'unavailable';

    const payload = (await response.json()) as unknown;
    const count = parseIncrementResult(payload);

    if (count === null) return 'unavailable';
    return count > limit ? 'blocked' : 'allowed';
  } catch {
    return 'unavailable';
  }
}
