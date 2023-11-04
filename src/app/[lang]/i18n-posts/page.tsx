import Layout from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import TwitterCardMeta from '@/components/meta/TwitterCardMeta';
import PostList from '@/components/PostList';
import config from '@/app/lib/config';
import { countPosts, listPostContent } from '@/app/lib/i18n-posts';
import { listTagsI18n } from '@/app/lib/tags';

import type { PostContent } from '@/app/lib/i18n-posts';
import type { TagContent } from '@/app/lib/tags';

interface PostsProps {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
}

const getPosts = async (locale: string): Promise<PostsProps> => {
  const posts = listPostContent(1, config.posts_per_page, undefined, locale);
  const tags = listTagsI18n();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    posts,
    tags,
    pagination,
  };
};

const Posts = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { posts, tags, pagination } = await getPosts(locale);

  const url = '/posts';
  const title = 'All posts';
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} tags={tags} pagination={pagination} parentpath='i18n-posts' />
    </Layout>
  );
};

export default Posts;
