import Head from 'next/head';
import Navigation from './Navigation';

import { defaultLocale } from '@/app/lib/i18n/settings';

import type { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  lang?: string;
  parentpath?: string;
}

const Layout: FC<LayoutProps> = ({ children, lang = defaultLocale, parentpath = 'posts' }) => {
  return (
    <div className='block px-0 py-16 box-border h-full md:flex md:flex-[1_0_auto]'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='apple-touch-icon' href='/icon.png' />
        <meta name='theme-color' content='#fff' />
      </Head>
      <nav>
        <Navigation lang={lang} />
      </nav>
      <main className='flex min-h-full md:flex-[1_0_auto]'>{children}</main>
    </div>
  );
};

export default Layout;
