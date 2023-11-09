import CMS from '@staticcms/core';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import '@staticcms/core/dist/main.css';

import config from '@/config';

import type { TemplatePreviewProps } from '@staticcms/core';
import type { FC } from 'react';

interface PostData {
  title: string;
  date: string;
  body: string;
}

const PostPreview: FC<TemplatePreviewProps<PostData>> = ({ entry, widgetFor }) => {
  return (
    <div className='content'>
      <h1>{entry.data?.title}</h1>
      <time>{entry.data?.date}</time>
      <div>{widgetFor('body')}</div>
    </div>
  );
};

const CMSPage: FC = () => {
  const params = useParams();
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      config.local_backend = true;
    }
    // add locale config according to the lang parameter
    if (params && params.lang) {
      config.locale = params.lang as string;
    }
    CMS.registerPreviewTemplate('posts', PostPreview);

    CMS.registerAdditionalLink({
      id: 'local-site',
      title: 'Local Site',
      data: '/',
    });

    CMS.init({ config });
  }, []);

  return (
    <div>
      <style jsx global>{`
        html,
        body {
          height: 100%;
        }

        #__next {
          display: none;
        }
      `}</style>
    </div>
  );
};

CMSPage.displayName = 'CMSPage';

export default CMSPage;
