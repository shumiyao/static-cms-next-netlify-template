import Layout from '@/components/Layout';
import TagPostList from '@/components/TagPostList';

import config from '@/lib/config';
import { PostContent, countPosts, listPostContent } from '@/lib/posts';
import { TagContent, getTag, listTags } from '@/lib/tags';

import { buildMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { useTranslation } from '@/lib/i18n';

export async function generateMetadata({ params: { lang, post, slug } }: { params: { lang: string; post: string; slug: string } }): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lang, 'blog');
  // read route params
  return buildMetadata({ title: t('Tag') + ': ' + slug }, lang, 'posts');
}

interface TagPostsProps {
  posts: PostContent[];
  tag: TagContent;
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
}

const getTagPosts = async (queries: string[], lang: string): Promise<TagPostsProps> => {
  const [slug, page] = [queries[0], queries[1]];
  const posts = await listPostContent(page ? parseInt(page as string) : 1, config.posts_per_page, slug, lang);
  const tag = await getTag(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countPosts(slug) / config.posts_per_page),
  };
  const props: {
    posts: PostContent[];
    tag: TagContent;
    pagination: { current: number; pages: number };
    page?: string;
  } = { posts, tag, pagination };

  if (page) {
    props.page = page;
  }

  return props;
};

export const generateStaticParams = async () => {
  return listTags().flatMap((tag) => {
    const pages = Math.ceil(countPosts(tag.slug) / config.posts_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            slug: [tag.slug],
          }
        : {
            slug: [tag.slug, (page + 1).toString()],
          }
    );
  });
};

const TagPosts = async ({ params: { slug, lang } }: { params: { slug: string[]; lang: string } }) => {
  const { tag, page, posts, pagination } = await getTagPosts(slug);

  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : '');
  const title = tag.name;
  return (
    <Layout>
      <TagPostList posts={posts} tag={tag} pagination={pagination} lang={lang} />
    </Layout>
  );
};

export default TagPosts;
