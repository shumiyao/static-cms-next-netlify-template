import Layout from '@/components/Layout';
import SocialList from '@/components/SocialList';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import TwitterCardMeta from '@/components/meta/TwitterCardMeta';
import { useTranslation } from '@/lib/i18n';

import { Metadata, ResolvingMetadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  return buildMetadata(undefined, lang, '');
}

const IndexPage = async ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = await useTranslation(lang, 'home');
  return (
    <>
      <Layout lang={lang}>
        <BasicMeta url={'/'} />
        <OpenGraphMeta url={'/'} />
        <TwitterCardMeta url={'/'} />
        <div className='flex flex-auto items-center justify-center py-0 px-6'>
          <div>
            <h1 className='text-4xl m-0 font-medium md:text-5xl' dangerouslySetInnerHTML={{ __html: t(`Hi, We&apos;re Next.js & Static CMS<span className='text-[#15847d]'>.</span>`) }}></h1>
            <span className='inline-block mt-1 text-gray-400 tracking-wider' dangerouslySetInnerHTML={{ __html: t('@nextjs-static-cms-blog') }}></span>
            <h2 className='text-3xl font-normal md:text-4xl' dangerouslySetInnerHTML={{ __html: t('A blog template with Next.js and Static CMS.') }}></h2>
            <SocialList />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
