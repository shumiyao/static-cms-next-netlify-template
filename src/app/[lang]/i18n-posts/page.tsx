import Layout from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import TwitterCardMeta from '@/components/meta/TwitterCardMeta';
import PostList from '@/components/PostList';
import config from '@/lib/config';
import { countPosts, listPostContent } from '@/lib/i18n-posts';
import { listTagsI18n } from '@/lib/tags';

import type { PostContent } from '@/lib/i18n-posts';
import type { TagContent } from '@/lib/tags';

interface PostsProps {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
}

const getPosts = async (locale: string): Promise<PostsProps> => {
  const posts = await listPostContent(1, config.posts_per_page, undefined, locale);
  const tags = await listTagsI18n();
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

const Posts = async ({ params: { lang } }: { params: { lang: string } }) => {
  const { posts, tags, pagination } = await getPosts(lang);

  const url = '/posts';
  const title = 'All posts';

  return (
    <Layout lang={lang}>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} tags={tags} pagination={pagination} parentpath='i18n-posts' lang={lang} />
    </Layout>
  );
};

export default Posts;
