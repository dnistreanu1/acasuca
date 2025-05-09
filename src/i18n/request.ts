import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';

export const locales = ['en', 'ro', 'ru'];
export type LanguageLocale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requestlocaleAwaited = await requestLocale;
  const selectedLocale = hasLocale(routing.locales, requestlocaleAwaited) ? requestlocaleAwaited : routing.defaultLocale;
  return {
    locale: selectedLocale,
    messages: (await import(`../../messages/${selectedLocale}.json`)).default,
  };
});
