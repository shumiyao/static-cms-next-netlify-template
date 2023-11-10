import { tag } from 'contentlayer/generated'

import { allI18nPostCollections } from 'contentlayer/generated'
import type { I18nPostCollection, I18nPost } from 'contentlayer/generated'
import { fallbackLng, locales } from '@/lib/i18n/settings';
import { json } from 'stream/consumers';

export interface TagContent {
  readonly slug?: string;
  readonly name?: string;
}

const tagMap: { [key: string]: TagContent } = generateTagMap();

function generateTagMap(): { [key: string]: TagContent } {
  let result: { [key: string]: TagContent } = {};
  if (tag.tags) {
    tag.tags.forEach(tag => {
      result[tag.slug] = tag;
    });
  }

  return result;
}

export function getTag(slug: string) {
  return tagMap[slug] || [];
}

export function listTags(): TagContent[] {
  return tag.tags || [];
}
export function listTagsI18n(): TagContent[] {
  const i18nTags: string[] = allI18nPostCollections.reduce((p, c) => {
    return c && c[fallbackLng] && c[fallbackLng].tags ? [...p, ...c[fallbackLng].tags] : p
  }, [] as string[]).filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
  });
  return tag.tags ? tag.tags.filter((element, index, array) => { return i18nTags.findIndex(ee => ee === element.slug) != -1 }, []) : [];
}