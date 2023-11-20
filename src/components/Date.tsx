'use client';
import { useState, useEffect } from 'react';
import { format, formatISO, Locale } from 'date-fns';
import * as Locales from 'date-fns/locale';
import { fallbackLng } from '@/lib/i18n/settings';
import type { FC } from 'react';

export interface DateProps {
  date: Date;
  lang?: string;
}
const Date: FC<DateProps> = ({ date, lang }) => {
  const [locale, setLocale] = useState();
  useEffect(() => {
    const importLocaleFile = async () => {
      // This webpack option stops all of the date-fns files being imported and chunked.
      const localeToSet = await import(
        /* webpackMode: "lazy", webpackChunkName: "df-[index]", webpackExclude: /_lib/ */
        `date-fns/locale/${lang}/index.js`
      );
      setLocale(localeToSet.default);
    };

    // If the locale has not yet been loaded.
    if (!locale) {
      importLocaleFile();
    }
  }, [setLocale, locale, lang]);

  return (
    <time dateTime={formatISO(date)}>
      <span className='text-gray-400'>{format(date, 'LLLL d, yyyy', { locale })}</span>
    </time>
  );
};

export default Date;
