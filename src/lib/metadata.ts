import config from '@/lib/config';
import { Metadata } from 'next';

export interface PostProps {
    title?: string;
    dateString?: string;
    // date: string;
    slug?: string;
    tags?: string[];
    author?: string;
    description?: string;
    source?: string;
    image?: string;
}

export function buildMetadata(
    postData: PostProps | undefined,
    lang: string,
    parentpath: string
): Metadata {
    const pageUrl = `${config.base_url}/${lang}/${parentpath}${postData?.slug ? '/' + postData?.slug : ''}`;
    const title = postData?.title ? [postData.title, config.site_title].join(' | ') : config.site_title;
    const description = postData?.description ? postData.description : '';
    return {
        title,
        description,
        metadataBase: new URL(config.base_url),
        authors: postData?.author ? [{ name: postData.author }] : null, // todo add url
        referrer: 'origin-when-cross-origin',
        keywords: postData?.tags ? postData.tags.join(',') : config.site_keywords.join(','),
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: config.site_title,
            images: [
                {
                    url: postData?.image ? postData?.image : config.base_url + "/og_image.png",
                },
            ],
            locale: lang,
            type: postData?.author ? 'article' : 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            // creator: '@author_here',
            images: [
                {
                    url: postData?.image ? postData?.image : config.base_url + "/og_image.png",
                    alt: title,
                },
            ],
        },
    };
}
