import Link from 'next/link';

import type { TagContent } from '@/lib/tags';
import type { FC } from 'react';

export interface TagProps {
  tag: TagContent;
  parentpath?: string;
}

const Tag: FC<TagProps> = ({ tag, parentpath }) => {
  return (
    <Link href={`/${parentpath}/tags/[[...slug]]`} as={`/${parentpath}/tags/${tag.slug}`}>
      {'#' + tag.name}
    </Link>
  );
};

export default Tag;
