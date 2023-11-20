import PostLayout from '@/components/PostLayout';
import { fetchPostContent } from '@/lib/posts';
import { parseISO } from 'date-fns';
import type { PostContent } from '@/lib/posts';

import { buildMetadata } from '@/lib/metadata';
import type { PostProps } from '@/lib/metadata';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
  return fetchPostContent().map((it) => ({ post: it.slug }));
};

let postData: PostProps;

export async function generateMetadata({ params: { lang, post } }: { params: { lang: string; post: string } }): Promise<Metadata> {
  // get from "i18n-posts"
  postData = await getPost(post);
  // read route params
  return buildMetadata(postData, lang, 'posts');
}
const getPost = async (slug: string): Promise<PostProps> => {
  const slugToPostContent = ((postContents) => {
    let hash: Record<string, PostContent> = {};
    postContents.forEach((it) => it.slug && (hash[it.slug] = it));
    return hash;
  })(fetchPostContent());
  const post = slugToPostContent[slug] as PostContent;
  return {
    title: post?.title || '',
    dateString: post?.date || '',
    slug: post?.slug || '',
    description: '' || '',
    tags: post?.tags || [],
    author: post?.author || '',
    source: post?.body?.code || '',
  };
};

const Post = async ({ params: { lang, post } }: { params: { lang: string; post: string } }) => {
  const slug = post;

  const { title, dateString, tags, author, description, source } = postData || (await getPost(slug));
  return <>{source && <PostLayout title={title || ''} date={parseISO(dateString || '')} slug={slug} tags={tags || []} author={author || ''} description={description} source={source} lang={lang} />}</>;
};

export default Post;
