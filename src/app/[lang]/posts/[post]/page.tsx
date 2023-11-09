import PostLayout from '@/components/PostLayout';
import { fetchPostContent } from '@/lib/posts';
import { parseISO } from 'date-fns';
import type { PostContent } from '@/lib/posts';

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

export const generateStaticParams = async () => {
  return fetchPostContent().map((it) => ({ post: it.slug }));
};

const Post = async ({ params: { lang, post } }: { params: { lang: string; post: string } }) => {
  const slug = post;

  const { title, dateString, tags, author, description, source } = await getPost(slug);
  return <>{source && <PostLayout title={title || ''} date={parseISO(dateString || '')} slug={slug} tags={tags || []} author={author || ''} description={description} source={source} lang={lang} />}</>;
};

export default Post;
