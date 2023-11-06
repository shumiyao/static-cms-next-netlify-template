import { parseISO } from 'date-fns';
import Link from 'next/link';
import Date from './Date';

import { defaultLocale } from '@/app/lib/i18n/settings';

import type { PostContent } from '@/app/lib/posts';
import type { FC } from 'react';

export interface PostItemProps {
  post: PostContent;
  parentpath?: string;
  lang?: string;
}

const PostItem: FC<PostItemProps> = ({ post, parentpath = 'posts', lang = defaultLocale }) => {
  return (
    <Link href={`/${lang}/${parentpath}/` + post.slug} className='text-gray-800 inline-block'>
      <Date date={parseISO(post.date || '')} />
      <h2 className='m-0 font-medium'>{post.title}</h2>
    </Link>
  );
};

export default PostItem;
