'use client';

import { usePathname, useParams, useRouter } from 'next/navigation';

import { locales } from '@/lib/i18n/settings';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LaunguageSwitcher({ lang }: { lang: string }) {
  const currentLocale = lang;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  // todo handle localized path
  function switchLanguage(targetLocale: string) {
    router.replace(pathname.replace(`/${params.lang}`, `/${targetLocale}`));
  }
  return (
    <div>
      {locales && (
        <div className=''>
          {locales.map((f) => (
            <div key={'menu-' + f}>
              <div className={classNames(currentLocale == f ? 'bg-gray-100 cursor-default' : 'cursor-pointer', 'block px-4 py-2 text-sm text-gray-700 uppercase hover:bg-gray-50 hover:text-gray-500')} data-locale={f} onClick={(g) => switchLanguage(g.currentTarget.getAttribute('data-locale') as string)}>
                {f}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
