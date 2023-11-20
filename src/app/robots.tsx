import { MetadataRoute } from 'next';
import config from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/*/admin',
    },
    sitemap: `${config.base_url}/sitemap.xml`,
  };
}
