import { tag } from 'contentlayer/generated'

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
  return tagMap[slug];
}

export function listTags(): TagContent[] {
  return tag.tags || [];
}
