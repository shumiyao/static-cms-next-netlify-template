import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import ChainedBackend from 'i18next-chained-backend'
import backend from "i18next-http-backend";
import { getOptions } from './settings'
const HttpBackend = require('i18next-http-backend')

const initI18next = async (lang: string, ns: string) => {
    const i18nInstance = createInstance()
    const localeData = await require(`public/locales/${lang}/${ns}.json`)
    await i18nInstance
        .use(ChainedBackend)
        .use(initReactI18next)
        .use(backend)
        .init({
            ...getOptions(lang, ns),
            compatibilityJSON: 'v3',
            react: {
                useSuspense: false,
            },
            lng: lang,
            load: 'languageOnly',
            backend: {
                backends: [
                    HttpBackend, // if a namespace can't be loaded via normal http-backend loadPath, then the inMemoryLocalBackend will try to return the correct resources
                    resourcesToBackend({ [lang]: { translations: localeData } }),

                ],
                backendOptions: [{
                    loadPath: 'http://localhost:3000/locales/{{lng}}/{{ns}}.json'
                }]
            }
        })

    return i18nInstance
}

interface UseTranslationOptions {
    keyPrefix?: string;
}

export async function useTranslation(locale: string, ns: string, options: UseTranslationOptions = {}) {
    const i18nextInstance = await initI18next(locale, ns)
    return {
        t: i18nextInstance.getFixedT(locale, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix || ''),
        i18n: i18nextInstance
    }
}