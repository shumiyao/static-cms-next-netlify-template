import Pagination from './Pagination';
import PostItem from './PostItem';
import TagLink from './TagLink';

import { defaultLocale } from '@/app/lib/i18n/settings';

import type { PostContent } from '@/app/lib/posts';
import type { TagContent } from '@/app/lib/tags';
import type { FC } from 'react';

export interface PostListProps {
  posts: PostContent[];
  tags: TagContent[];
  parentpath?: string;
  lang?: string;
  pagination: {
    current: number;
    pages: number;
  };
}

const PostList: FC<PostListProps> = ({ posts, tags, pagination, lang = defaultLocale, parentpath = 'posts' }) => {
  return (
    <div className='flex my-0 mx-auto max-w-[1200px] w-full py-0 px-6'>
      <div className='flex flex-col flex-auto'>
        <ul className='flex-[1_0_auto]'>
          {posts.map((it, i) => (
            <li key={i} className='mb-6'>
              <PostItem post={it} parentpath={parentpath} lang={lang} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? `/${lang}/${parentpath}` : `/${lang}/${parentpath}/page/[page]`),
            as: (page) => (page === 1 ? '' : `/${lang}/${parentpath}/page/` + page),
          }}
        />
      </div>
      <ul className='hidden md:block'>
        {tags.map((it, i) => (
          <li key={i} className='mb-3'>
            <TagLink tag={it} parentpath={parentpath} lang={lang} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
