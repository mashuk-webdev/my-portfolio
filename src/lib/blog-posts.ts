import 'server-only';

import { blogPosts as fallbackPosts } from '@/data/blog';
import { adminDb } from '@/lib/firebase-admin';
import type { BlogPost } from '@/lib/types';
import { Timestamp } from 'firebase-admin/firestore';

function toIsoDateString(value: unknown): string {
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? new Date(0).toISOString() : new Date(parsed).toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as { toDate: unknown }).toDate === 'function'
  ) {
    const date = (value as { toDate: () => Date }).toDate();
    return date.toISOString();
  }

  return new Date(0).toISOString();
}

function toOptionalIsoDateString(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value === 'string') {
    const normalized = value.trim();
    if (!normalized) return undefined;
    const parsed = Date.parse(normalized);
    return Number.isNaN(parsed) ? undefined : new Date(parsed).toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as { toDate: unknown }).toDate === 'function'
  ) {
    const date = (value as { toDate: () => Date }).toDate();
    return date.toISOString();
  }

  return undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function asBlogPost(slug: string, value: unknown): BlogPost | null {
  if (!value || typeof value !== 'object') return null;

  const record = value as Record<string, unknown>;
  const title = typeof record.title === 'string' ? record.title : '';
  const excerpt = typeof record.excerpt === 'string' ? record.excerpt : '';
  const content = typeof record.content === 'string' ? record.content : '';

  if (!title || !excerpt || !content) return null;

  return {
    slug,
    title,
    excerpt,
    content,
    date: toIsoDateString(record.date ?? record.createdAt),
    updatedAt: toOptionalIsoDateString(record.updatedAt),
    author: asOptionalString(record.author),
    image:
      typeof record.image === 'string' && record.image.length > 0
        ? record.image
        : 'https://placehold.co/600x400',
    tags: asStringArray(record.tags),
  };
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!adminDb) return fallbackPosts;

  try {
    const snapshot = await adminDb.collection('posts').get();
    if (snapshot.empty) return fallbackPosts;

    const posts = snapshot.docs
      .map((doc) => asBlogPost(doc.id, doc.data()))
      .filter((post): post is BlogPost => post !== null);

    if (posts.length === 0) return fallbackPosts;

    return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  } catch {
    return fallbackPosts;
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!adminDb) {
    return fallbackPosts.find((post) => post.slug === slug) || null;
  }

  try {
    const snapshot = await adminDb.collection('posts').doc(slug).get();
    if (snapshot.exists) {
      const post = asBlogPost(snapshot.id, snapshot.data());
      if (post) return post;
    }

    return fallbackPosts.find((post) => post.slug === slug) || null;
  } catch {
    return fallbackPosts.find((post) => post.slug === slug) || null;
  }
}

export async function fetchAllBlogSlugs(): Promise<{ slug: string }[]> {
  if (!adminDb) {
    return fallbackPosts.map((post) => ({ slug: post.slug }));
  }

  try {
    const snapshot = await adminDb.collection('posts').get();
    if (snapshot.empty) {
      return fallbackPosts.map((post) => ({ slug: post.slug }));
    }

    const firestoreSlugs = snapshot.docs.map((doc) => ({ slug: doc.id }));
    const merged = [...firestoreSlugs, ...fallbackPosts.map((post) => ({ slug: post.slug }))];
    const unique = Array.from(new Map(merged.map((item) => [item.slug, item])).values());

    return unique;
  } catch {
    return fallbackPosts.map((post) => ({ slug: post.slug }));
  }
}
