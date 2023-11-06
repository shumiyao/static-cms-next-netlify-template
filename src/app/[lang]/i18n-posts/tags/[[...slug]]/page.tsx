import Layout from '@/components/Layout';
import TagPostList from '@/components/TagPostList';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import TwitterCardMeta from '@/components/meta/TwitterCardMeta';
import config from '@/app/lib/config';
import { PostContent, countPosts, listPostContent } from '@/app/lib/i18n-posts';
import { TagContent, getTag, listTags } from '@/app/lib/tags';

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
  const { tag, page, posts, pagination } = await getTagPosts(slug, lang);
  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : '');
  const title = tag.name;
  return (
    <Layout lang={lang}>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <TagPostList posts={posts} tag={tag} pagination={pagination} lang={lang} parentpath={'i18n-posts'} />
    </Layout>
  );
};

export default TagPosts;
