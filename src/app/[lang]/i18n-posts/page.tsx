import Layout from '@/components/Layout';
import PostList from '@/components/PostList';
import config from '@/lib/config';
import { countPosts, listPostContent } from '@/lib/i18n-posts';
import { listTagsI18n } from '@/lib/tags';

import type { PostContent } from '@/lib/i18n-posts';
import type { TagContent } from '@/lib/tags';

import { buildMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { useTranslation } from '@/lib/i18n';

interface PostsProps {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
}

let postData: PostsProps;

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang, 'blog')
  // get from "i18n-posts"
  postData = await getPosts(lang);
  // read route params
  return buildMetadata({ title: t('All posts') }, lang, 'i18n-posts/tags');
}

const getPosts = async (lang: string): Promise<PostsProps> => {
  const posts = await listPostContent(1, config.posts_per_page, undefined, lang);
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
  const { posts, tags, pagination } = postData || (await getPosts(lang));
  return (
    <Layout lang={lang}>
      <PostList posts={posts} tags={tags} pagination={pagination} parentpath='i18n-posts' lang={lang} />
    </Layout>
  );
};

export default Posts;
