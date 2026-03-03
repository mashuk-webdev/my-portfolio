import 'server-only';

import { getSiteUrl } from '@/lib/site-url';

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
] as const;

const MAX_URLS_PER_REQUEST = 10_000;
const DEFAULT_KEY_PATH = '/indexnow-key.txt';

type IndexNowEndpointResult = {
  endpoint: string;
  ok: boolean;
  status: number | null;
  message: string;
};

export type IndexNowSubmitResult = {
  configured: boolean;
  submitted: number;
  accepted: number;
  keyLocation: string | null;
  results: IndexNowEndpointResult[];
};

function trimToNull(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function toAbsoluteUrl(raw: string, origin: string): string | null {
  try {
    return new URL(raw, origin).toString();
  } catch {
    return null;
  }
}

function chunkUrls(urls: string[]): string[][] {
  if (urls.length <= MAX_URLS_PER_REQUEST) return [urls];

  const chunks: string[][] = [];
  for (let index = 0; index < urls.length; index += MAX_URLS_PER_REQUEST) {
    chunks.push(urls.slice(index, index + MAX_URLS_PER_REQUEST));
  }
  return chunks;
}

export function getIndexNowKey(): string | null {
  return trimToNull(process.env.INDEXNOW_KEY);
}

export function getIndexNowKeyLocation(siteUrl = getSiteUrl()): string {
  const configured = trimToNull(process.env.INDEXNOW_KEY_LOCATION);
  if (configured) {
    return toAbsoluteUrl(configured, siteUrl) ?? new URL(DEFAULT_KEY_PATH, siteUrl).toString();
  }

  return new URL(DEFAULT_KEY_PATH, siteUrl).toString();
}

export function sanitizeIndexNowUrls(urls: string[], siteUrl = getSiteUrl()): string[] {
  const siteOrigin = new URL(siteUrl).origin;
  const unique = new Set<string>();

  for (const rawUrl of urls) {
    const candidate = trimToNull(rawUrl);
    if (!candidate) continue;

    const absolute = toAbsoluteUrl(candidate, siteOrigin);
    if (!absolute) continue;

    try {
      const parsed = new URL(absolute);
      if (parsed.origin !== siteOrigin) continue;
      unique.add(parsed.toString());
    } catch {
      continue;
    }
  }

  return Array.from(unique);
}

export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowSubmitResult> {
  const key = getIndexNowKey();
  if (!key) {
    return {
      configured: false,
      submitted: 0,
      accepted: 0,
      keyLocation: null,
      results: [],
    };
  }

  const siteUrl = getSiteUrl();
  const normalizedUrls = sanitizeIndexNowUrls(urls, siteUrl);
  if (normalizedUrls.length === 0) {
    return {
      configured: true,
      submitted: 0,
      accepted: 0,
      keyLocation: getIndexNowKeyLocation(siteUrl),
      results: [],
    };
  }

  const keyLocation = getIndexNowKeyLocation(siteUrl);
  const host = new URL(siteUrl).host;
  const results: IndexNowEndpointResult[] = [];
  let accepted = 0;

  for (const urlChunk of chunkUrls(normalizedUrls)) {
    const payload = JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: urlChunk,
    });

    const chunkResults = await Promise.all(
      INDEXNOW_ENDPOINTS.map(async (endpoint): Promise<IndexNowEndpointResult> => {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: payload,
            cache: 'no-store',
          });

          const text = await response.text().catch(() => '');
          return {
            endpoint,
            ok: response.ok,
            status: response.status,
            message: text.slice(0, 300),
          };
        } catch (error) {
          return {
            endpoint,
            ok: false,
            status: null,
            message: error instanceof Error ? error.message : 'Network error',
          };
        }
      })
    );

    results.push(...chunkResults);
    if (chunkResults.some((entry) => entry.ok)) {
      accepted += urlChunk.length;
    }
  }

  return {
    configured: true,
    submitted: normalizedUrls.length,
    accepted,
    keyLocation,
    results,
  };
}
