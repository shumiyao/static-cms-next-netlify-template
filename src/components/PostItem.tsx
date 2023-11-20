import { parseISO } from 'date-fns';
import Link from 'next/link';
import Date from './Date';

import { fallbackLng } from '@/lib/i18n/settings';

import type { PostContent } from '@/lib/posts';
import type { FC } from 'react';

export interface PostItemProps {
  post: PostContent;
  parentpath?: string;
  lang?: string;
}

const PostItem: FC<PostItemProps> = ({ post, parentpath = 'posts', lang = fallbackLng }) => {
  return (
    <Link href={`/${lang}/${parentpath}/` + post.slug} className='text-gray-800 inline-block'>
      <Date date={parseISO(post.date || '')} lang={lang} />
      <h2 className='m-0 font-medium'>{post.title}</h2>
    </Link>
  );
};

export default PostItem;
