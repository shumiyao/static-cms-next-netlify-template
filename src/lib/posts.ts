import { allPosts } from 'contentlayer/generated'
import type { MDX } from 'contentlayer/core'

export interface PostContent {
  readonly date?: string;
  readonly title?: string;
  readonly slug?: string;
  readonly tags?: string[];
  readonly author?: string;
  readonly fullPath?: string;
  readonly body?: MDX;
}

let postCache: PostContent[];

export function fetchPostContent(): PostContent[] {
  if (postCache) {
    return postCache;
  }
  // Sort posts by date
  postCache = allPosts.sort((a: PostContent, b: PostContent) => {
    if (a.date && b.date && a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return postCache;
}

export function countPosts(tag?: string): number {
  return fetchPostContent().filter((it) => !tag || (it.tags && it.tags.includes(tag))).length;
}

export function listPostContent(page: number, limit: number, tag?: string): PostContent[] {
  return fetchPostContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
