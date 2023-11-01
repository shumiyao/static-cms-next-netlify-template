import { author } from 'contentlayer/generated'

export interface AuthorContent {
  readonly slug?: string;
  readonly name?: string;
  readonly introduction?: string;
}

const authorMap: { [key: string]: AuthorContent } = generateAuthorMap();

function generateAuthorMap(): { [key: string]: AuthorContent } {
  let result: { [key: string]: AuthorContent } = {};
  if (author.authors) {
    author.authors.forEach(author => {
      result[author.slug] = author;
    });
  }
  return result;
}

export function getAuthor(slug: string) {
  return authorMap[slug];
}
