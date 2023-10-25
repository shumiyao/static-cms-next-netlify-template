import { parseISO } from 'date-fns';
import Link from 'next/link';
import Date from './Date';

import type { PostContent } from '@/lib/posts';
import type { FC } from 'react';

export interface PostItemProps {
  post: PostContent;
  parentpath: string;
}

const PostItem: FC<PostItemProps> = ({ post, parentpath = 'posts' }) => {
  return (
    <Link href={`/${parentpath}/` + post.slug} className='text-gray-800 inline-block'>
      <Date date={parseISO(post.date || '')} />
      <h2 className='m-0 font-medium'>{post.title}</h2>
    </Link>
  );
};

export default PostItem;
