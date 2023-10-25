import { allI18nPostCollections } from 'contentlayer/generated'
import type { I18nPostCollection, I18nPost } from 'contentlayer/generated'
import type { MDX } from 'contentlayer/core'
import { defaultLocale, locales } from '@/lib/i18n/settings';

export interface PostContent {
  readonly date?: string;
  readonly title?: string;
  readonly slug?: string;
  readonly tags?: string[];
  readonly author?: string;
  readonly fullPath?: string;
  readonly body?: MDX;

}

export interface PostContentByLocales {
  [key: string]: PostContent[];
}


export interface PostSlug {
  post: string
}

let postCache: PostContentByLocales = {};
let postSlugCache: PostSlug[] = [];

export function fetchPostContent(locale: string = defaultLocale): PostContent[] {
  if (locale in postCache) {
    return postCache[locale] as PostContent[];
  }
  // Sort posts by date
  postCache[locale] = allI18nPostCollections.map(post => {
    let currentPost = post[locale as keyof I18nPostCollection] as I18nPost;
    if (currentPost && !currentPost.slug) {
      currentPost.slug = post.slug;
    }
    return currentPost
  }) as PostContent[];
  postCache[locale].sort((a: PostContent, b: PostContent) => {
    if (a.date && b.date && a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return postCache[locale] as PostContent[];
}

export function fetchPostSlugs() {
  if (postSlugCache.length > 0) {
    return postSlugCache;
  }
  allI18nPostCollections.forEach(collection => {
    if (collection) {
      if (collection.slug) {
        postSlugCache.push({ post: collection.slug as string })
      }
      locales.forEach(locale => {
        if (collection) {
          const currentCollection = collection[locale as keyof I18nPostCollection] as I18nPost;

          if (currentCollection && currentCollection.slug && !postSlugCache.find(e => e.post === currentCollection.slug)) {
            postSlugCache.push({ post: currentCollection.slug as string })
          }
        }
      })
    }
  });
  return postSlugCache;
}

export function countPosts(tag?: string, locale?: string): number {
  return fetchPostContent(locale).filter((it) => !tag || (it.tags && it.tags.includes(tag))).length;
}

export function listPostContent(page: number, limit: number, tag?: string, locale?: string): PostContent[] {
  return fetchPostContent(locale)
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
