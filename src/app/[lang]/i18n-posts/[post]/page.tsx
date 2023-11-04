'use client';

import PostLayout from '@/components/PostLayout';
import { parseISO } from 'date-fns';

import { fetchPostContent } from '@/app/lib/i18n-posts';
import type { PostContent } from '@/app/lib/i18n-posts';

interface PostProps {
  title?: string;
  dateString?: string;
  // date: string;
  slug?: string;
  tags?: string[];
  author?: string;
  description?: string;
  source: string;
}

const getPost = async (slug: string, locale: string): Promise<PostProps> => {
  const slugToPostContent = ((postContents) => {
    let hash: Record<string, PostContent> = {};
    postContents.forEach((it) => it.slug && (hash[it.slug] = it));
    return hash;
  })(fetchPostContent(locale));
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
const Post = async ({ params: { locale, post } }: { params: { locale: string; post: string } }) => {
  const slug = post;

  const { title, dateString, tags, author, description, source } = await getPost(slug, locale);

  return <PostLayout title={title || ''} date={parseISO(dateString || '')} slug={slug} tags={tags || []} author={author || ''} description={description} source={source} />;
};

export default Post;
