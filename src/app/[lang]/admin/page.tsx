'use client';

import dynamic from 'next/dynamic';
import { FC, useMemo } from 'react';

const Admin = ({ params: { lang } }: { params: { lang: string } }) => {
  console.log(lang);
  const CMSPage = useMemo(
    () =>
      dynamic(() => import('@/components/cms/CMSPage'), {
        ssr: false,
      }),
    []
  );

  return useMemo(() => <CMSPage key='admin' />, [CMSPage]);
};

export default Admin;
