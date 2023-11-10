export const fallbackLng = 'en'
export const locales: string[] = [fallbackLng, 'fr', 'ja']
export const defaultNS = 'common'
export const cookieName = 'i18next'
export const localeDetection = true

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true,
        supportedLngs: locales,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    }
}