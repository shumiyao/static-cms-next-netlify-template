import Link from 'next/link';

import type { TagContent } from '@/lib/tags';
import type { FC } from 'react';

import { defaultLocale } from '@/lib/i18n/settings';

export interface TagButtonProps {
  tag: TagContent;
  parentpath?: string;
  lang?: string;
}

const TagButton: FC<TagButtonProps> = ({ tag, lang = defaultLocale, parentpath = 'posts' }) => {
  if (!tag) {
    return null;
  }

  return (
    <>
      <Link
        href={'/${lang}/${parentpath}/tags/[[...slug]]'}
        as={`/${lang}/${parentpath}/tags/${tag.slug}`}
        className='
          inline-block
          rounded-[3px]
          bg-[rgba(21_132_125_0.2)]
          color-[#15847d]
          transition-colors
          py-1
          px-2
          active:bg-[rgba(21_132_125_0.4)]
          hover:bg-[rgba(21_132_125_0.4)]
        '
      >
        {tag.name}
      </Link>
    </>
  );
};

export default TagButton;
