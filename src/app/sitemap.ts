import { MetadataRoute } from 'next';
import { initialProducts, initialCollections, initialJournalPosts } from '@/lib/data/initialData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tantukaladesigns.com';

  const staticPages = [
    '',
    '/shop',
    '/collections',
    '/patterns',
    '/craft',
    '/artisans',
    '/story',
    '/journal',
    '/wholesale',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productPages = initialProducts.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const collectionPages = initialCollections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const journalPages = initialJournalPosts.map((j) => ({
    url: `${baseUrl}/journal/${j.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...collectionPages, ...journalPages];
}
