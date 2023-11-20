import Layout from '@/components/Layout';
import PostList from '@/components/PostList';
import config from '@/lib/config';
import { countPosts, listPostContent } from '@/lib/i18n-posts';
import { listTags } from '@/lib/tags';

import type { PostContent } from '@/lib/i18n-posts';
import type { TagContent } from '@/lib/tags';

import { buildMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { useTranslation } from '@/lib/i18n';

export async function generateMetadata({ params: { lang, page } }: { params: { lang: string; page: string } }): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang, 'blog');
  // read route params
  return buildMetadata({ title: t('Page') + ': ' + page }, lang, 'i18n-posts');
}

interface PageProps {
  posts: PostContent[];
  tags: TagContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
}

const getPage = async (page: number, lang: string): Promise<PageProps> => {
  const posts = listPostContent(page, config.posts_per_page, undefined, lang);
  const tags = listTags();
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    page,
    posts,
    tags,
    pagination,
  };
};

export const generateStaticParams = async () => {
  const pages = Math.ceil(countPosts() / config.posts_per_page);
  return Array.from(Array(pages - 1).keys()).map((it) => ({
    page: (it + 2).toString(),
  }));
};
// { params: { locale, page } }: { params: { locale: string; post: string } }
const Page = async ({ params }: { params: { lang: string; page: number } }) => {
  const { posts, tags, pagination, page } = await getPage(params.page, params.lang);
  return (
    <Layout>
      <PostList posts={posts} tags={tags} pagination={pagination} parentpath='i18n-posts' />
    </Layout>
  );
};

export default Page;
