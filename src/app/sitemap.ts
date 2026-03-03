import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { fetchAllBlogSlugs } from '@/lib/blog-posts';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();

function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, siteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/blog/archive', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/resume', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.75, changeFrequency: 'monthly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: toAbsoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogSlugs = await fetchAllBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
