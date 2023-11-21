import Layout from '@/components/Layout';
import PostList from '@/components/PostList';

import config from '@/lib/config';
import { countPosts, listPostContent } from '@/lib/posts';
import { listTags } from '@/lib/tags';

import type { PostContent } from '@/lib/posts';
import type { TagContent } from '@/lib/tags';

import { buildMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { useTranslation } from '@/lib/i18n';

export async function generateMetadata({ params: { lang, page } }: { params: { lang: string; page: string } }): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang, 'blog');
  // read route params
  return buildMetadata({ title: t('Page') + ': ' + page }, lang, 'posts');
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

const getPage = async (page: number): Promise<PageProps> => {
  const posts = listPostContent(page, config.posts_per_page);
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

const Page = async ({ params }: { params: { lang: string; page: number } }) => {
  const { posts, tags, pagination, page } = await getPage(params.page);

  const url = `/posts/page/${page}`;
  const title = 'All posts';
  return (
    <Layout lang={params.lang}>
      <PostList posts={posts} tags={tags} pagination={pagination} lang={params.lang} />
    </Layout>
  );
};

export default Page;
