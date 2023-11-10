import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, locales, cookieName } from '@/lib/i18n/settings';

acceptLanguage.languages(locales);

export const config = {
  // matcher: '/:locale*'
  matcher: ['/((?!api|_next/static|.netlify|locales|_next/image|assets|favicon.ico|sw.js).*)'],
};

export function middleware(req) {
  let locale;
  // if (req.cookies.has(cookieName)) locale = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!locale) locale = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!locale) locale = fallbackLng;

  // Redirect if locale in path is not supported
  if (!locales.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) && !req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'));
    const localeInReferer = locales.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (localeInReferer) response.cookies.set(cookieName, localeInReferer);
    return response;
  }

  return NextResponse.next();
}
