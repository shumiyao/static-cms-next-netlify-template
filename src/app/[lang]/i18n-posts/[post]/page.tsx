import PostLayout from '@/components/PostLayout';
import { parseISO } from 'date-fns';

import { fetchPostContent } from '@/lib/i18n-posts';
import type { PostContent } from '@/lib/i18n-posts';

import { buildMetadata } from '@/lib/metadata';
import type { PostProps } from '@/lib/metadata';
import { Metadata } from 'next';

let postData: PostProps;

export async function generateMetadata({ params: { lang, post } }: { params: { lang: string; post: string } }): Promise<Metadata> {
  // get from "i18n-posts"
  postData = await getPost(post, lang);
  // read route params
  return buildMetadata(postData, lang, 'i18n-posts');
}

const getPost = (slug: string, lang: string): PostProps => {
  const slugToPostContent = ((postContents) => {
    let hash: Record<string, PostContent> = {};
    postContents.forEach((it) => it.slug && (hash[it.slug] = it));
    return hash;
  })(fetchPostContent(lang));
  const post = slugToPostContent[slug] as PostContent;
  return {
    title: post.title,
    dateString: post.date,
    slug: post.slug,
    description: '',
    tags: post.tags,
    author: post.author,
    source: post?.body?.code || '',
  };
};
//
const Post = ({ params: { lang, post } }: { params: { lang: string; post: string } }) => {
  const slug = post;
  const { title, dateString, tags, author, description, source } = postData;
  return <>{source && <PostLayout title={title || ''} date={parseISO(dateString || '')} slug={slug} tags={tags || []} author={author || ''} description={description} source={source} parentpath='i18n-posts' lang={lang} />}</>;
};

export default Post;
