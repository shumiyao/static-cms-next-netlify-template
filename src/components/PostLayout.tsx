'use client';

import { getAuthor } from '@/lib/authors';
import { getTag } from '@/lib/tags';
import styles from '../../public/styles/content.module.css';
import Author from './Author';
import Copyright from './Copyright';
import Date from './Date';
import Layout from './Layout';
import SocialList from './SocialList';
import TagButton from './TagButton';
import BasicMeta from './meta/BasicMeta';
import OpenGraphMeta from './meta/OpenGraphMeta';
import TwitterCardMeta from './meta/TwitterCardMeta';

import type { FC } from 'react';

import { fallbackLng } from '@/lib/i18n/settings';

import { useMDXComponent } from 'next-contentlayer/hooks';

export interface PostLayoutProps {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: string;
  lang?: string;
  parentpath?: string;
}

const PostLayout: FC<PostLayoutProps> = ({ title, date, slug, author, tags, description = '', source, lang = fallbackLng, parentpath = undefined }) => {
  // const keywords = tags.map((it) => getTag(it)?.name).filter(Boolean);
  // const authorName = getAuthor(author)?.name;
  const MDXContent = useMDXComponent(source);
  return (
    <Layout lang={lang}>
      <BasicMeta url={`/${lang}/posts/${slug}`} title={title} description={description} />
      <TwitterCardMeta url={`/${lang}/posts/${slug}`} title={title} description={description} />
      <OpenGraphMeta url={`/${lang}/posts/${slug}`} title={title} description={description} />
      <div className='block max-w-[36rem] w-full my-0 mx-auto py-0 px-6 box-border z-0 md:flex md:flex-col'>
        <article className='flex-[1_0_auto]'>
          <header>
            <h1 className='mb-2 text-4xl'>{title}</h1>
            <div>
              <div className='inline-block mr-2'>
                <Date date={date} />
              </div>
              <div className='inline-block mr-2'>
                <Author author={getAuthor(author)} />
              </div>
            </div>
          </header>
          <div className={styles.content}>
            <MDXContent />
          </div>
          <ul className='text-right mt-7 p-0'>
            {tags.map((it, i) => (
              <li key={i} className='inline-block ml-2'>
                <TagButton tag={getTag(it)} parentpath={parentpath} lang={lang} />
              </li>
            ))}
          </ul>
        </article>
        <footer>
          <div className='mt-12 text-center'>
            <SocialList />
          </div>
          <Copyright />
        </footer>
      </div>
    </Layout>
  );
};

export default PostLayout;
