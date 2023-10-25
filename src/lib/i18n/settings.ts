export const defaultLocale = 'en'
export const locales: string[] = [defaultLocale, 'fr', 'ja']
export const defaultNS = 'translation'
export const cookieName = 'i18next'
export const localeDetection = true

export function getOptions(locale = defaultLocale, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: locales,
        defaultLocale,
        locale,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    }
}