import Link from 'next/link';

import type { TagContent } from '@/app/lib/tags';
import type { FC } from 'react';

import { defaultLocale } from '@/app/lib/i18n/settings';

export interface TagProps {
  tag: TagContent;
  parentpath?: string;
  lang?: string;
}

const Tag: FC<TagProps> = ({ tag, parentpath, lang = defaultLocale }) => {
  return (
    <Link href={`/${lang}/${parentpath}/tags/[[...slug]]`} as={`/${lang}/${parentpath}/tags/${tag.slug}`}>
      {'#' + tag.name}
    </Link>
  );
};

export default Tag;
