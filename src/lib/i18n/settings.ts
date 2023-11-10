export const defaultLocale = 'en'
export const locales: string[] = [defaultLocale, 'fr', 'ja']
export const defaultNS = 'common'
export const cookieName = 'i18next'
export const localeDetection = true

export function getOptions(lng = defaultLocale, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: locales,
        defaultLocale,
        fallbackLng: defaultLocale,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    }
}