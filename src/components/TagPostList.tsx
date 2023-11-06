import Pagination from './Pagination';
import PostItem from './PostItem';

import type { PostContent } from '@/app/lib/posts';
import type { TagContent } from '@/app/lib/tags';
import type { FC } from 'react';

export interface TagPostListProps {
  posts: PostContent[];
  tag: TagContent;
  parentpath?: string;
  lang?: string;
  pagination: {
    current: number;
    pages: number;
  };
}

const TagPostList: FC<TagPostListProps> = ({ posts, tag, pagination, lang, parentpath = 'posts' }) => {
  return (
    <div className='my-0 mx-auto w-full py-0 px-6 flex flex-col'>
      <h1 className='mr-8 p-0 font-thin text-3xl text-gray-400 md:text-4xl'>
        All posts / <span className='font-bold text-gray-800'>{tag.name}</span>
      </h1>
      <ul className='m-0 p-0 flex-[1_0_auto]'>
        {posts.map((it, i) => (
          <li key={i} className='mb-7'>
            <PostItem post={it} lang={lang} parentpath={parentpath} />
          </li>
        ))}
      </ul>
      <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={{
          href: () => `/${parentpath}/tags/[[...slug]]`,
          as: (page) => (page === 1 ? `/${parentpath}/tags/` + tag.slug : `/${parentpath}/tags/${tag.slug}/${page}`),
        }}
      />
    </div>
  );
};

export default TagPostList;
