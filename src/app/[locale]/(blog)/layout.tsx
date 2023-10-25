import './globals.css';
import { Ubuntu } from 'next/font/google';

const inter = Ubuntu({ weight: '300', subsets: ['latin'] });

import type { ReactNode } from 'react';

import Script from 'next/script';

import { dir } from 'i18next';

const RootLayout = ({ params: { locale }, children }: { params: { locale: string }; children: ReactNode }) => {
  return (
    <html lang={locale} dir={dir(locale)}>
      <Script src='https://identity.netlify.com/v1/netlify-identity-widget.js' async />
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
