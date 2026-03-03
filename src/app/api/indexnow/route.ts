import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/data/projects';
import { fetchAllBlogSlugs } from '@/lib/blog-posts';
import { getSiteUrl } from '@/lib/site-url';
import { sanitizeIndexNowUrls, submitUrlsToIndexNow } from '@/lib/indexnow';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(request: NextRequest): boolean {
  const expectedToken = process.env.INDEXNOW_API_TOKEN?.trim();
  if (!expectedToken) return true;

  const headerToken = request.headers.get('x-indexnow-token')?.trim();
  if (headerToken && headerToken === expectedToken) return true;

  const authHeader = request.headers.get('authorization')?.trim();
  if (!authHeader) return false;

  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : null;

  return bearerToken === expectedToken;
}

async function getDefaultUrls(): Promise<string[]> {
  const siteUrl = getSiteUrl();
  const basePaths = ['/', '/about', '/projects', '/services', '/blog', '/resume', '/contact', '/tools'];
  const baseUrls = basePaths.map((path) => new URL(path, siteUrl).toString());
  const projectUrls = projects.map((project) => new URL(`/projects/${project.slug}`, siteUrl).toString());
  const blogSlugs = await fetchAllBlogSlugs();
  const blogUrls = blogSlugs.map((post) => new URL(`/blog/${post.slug}`, siteUrl).toString());

  return sanitizeIndexNowUrls([...baseUrls, ...projectUrls, ...blogUrls], siteUrl);
}

async function resolveRequestedUrls(request: NextRequest): Promise<string[]> {
  if (request.method !== 'POST') {
    return getDefaultUrls();
  }

  try {
    const body = (await request.json()) as { urls?: unknown };
    if (!Array.isArray(body.urls)) return getDefaultUrls();

    const strings = body.urls.filter((entry): entry is string => typeof entry === 'string');
    if (strings.length === 0) return getDefaultUrls();
    return sanitizeIndexNowUrls(strings);
  } catch {
    return getDefaultUrls();
  }
}

async function handleIndexNowSubmission(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized IndexNow request.',
      },
      { status: 401 }
    );
  }

  const urls = await resolveRequestedUrls(request);
  const result = await submitUrlsToIndexNow(urls);

  if (!result.configured) {
    return NextResponse.json(
      {
        success: false,
        message: 'IndexNow is not configured. Set INDEXNOW_KEY in environment variables.',
      },
      { status: 503 }
    );
  }

  const success = result.accepted > 0;
  const status = success ? 200 : 502;

  return NextResponse.json(
    {
      success,
      message: success
        ? 'IndexNow submission completed.'
        : 'IndexNow submission failed on all configured endpoints.',
      submitted: result.submitted,
      accepted: result.accepted,
      keyLocation: result.keyLocation,
      endpointResults: result.results,
    },
    { status }
  );
}

export async function GET(request: NextRequest) {
  return handleIndexNowSubmission(request);
}

export async function POST(request: NextRequest) {
  return handleIndexNowSubmission(request);
}
