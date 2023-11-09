import './globals.css';
import { Ubuntu } from 'next/font/google';

const inter = Ubuntu({ weight: '300', subsets: ['latin'] });

import type { ReactNode } from 'react';

import Script from 'next/script';

import { dir } from 'i18next';

const RootLayout = ({ params: { lang }, children }: { params: { lang: string }; children: ReactNode }) => {
  return (
    <html lang={lang} dir={dir(lang)}>
      <Script src='https://identity.netlify.com/v1/netlify-identity-widget.js' />
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
