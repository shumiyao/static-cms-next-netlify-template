import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/settings';

import config from '@/lib/config';

import { listPostContent as listPostContent_i18n } from '@/lib/i18n-posts';
import { listPostContent } from '@/lib/posts';

interface SitemapData {
  url: string;
  lastModified: Date;
}

export default function Sitemap(): MetadataRoute.Sitemap {
  const posts_i18n = locales.reduce((a, c) => {
    const listPosts: string[] = listPostContent_i18n(1, 99, undefined, c).map((e) => `${config.base_url}/${c}/${e.slug}`);
    return [...a, ...listPosts.map((e: string) => ({ url: e, lastModified: new Date() }))];
  }, [] as SitemapData[]);
  const posts = locales.reduce((a, c) => {
    const listPosts: string[] = listPostContent(1, 99, undefined).map((e) => `${config.base_url}/${c}/${e.slug}`);
    return [...a, ...listPosts.map((e: string) => ({ url: e, lastModified: new Date() }))];
  }, [] as SitemapData[]);
  return [...posts_i18n, ...posts];
}
