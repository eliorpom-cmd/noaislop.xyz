import { DEFAULT_LOCALE, SITE_URL, copyByLocale, locales } from './config';
import type { Copy } from './types';

export function getCopy(locale: string): Copy {
  const copy = copyByLocale[locale];
  if (!copy) throw new Error(`Unknown locale "${locale}".`);
  return copy;
}

/** Root-relative path of a locale: "/" for the default one, "/fr/" otherwise. */
export function localePath(locale: string): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
}

export function localeUrl(locale: string): string {
  return new URL(localePath(locale), SITE_URL).href;
}

export interface Alternate {
  hreflang: string;
  href: string;
  label: string;
  locale: string;
}

/** One entry per locale, plus x-default pointing at the canonical page. */
export function getAlternates(): Alternate[] {
  const alternates = locales.map((locale) => ({
    hreflang: locale,
    href: localeUrl(locale),
    label: getCopy(locale).meta.label,
    locale,
  }));

  return [
    ...alternates,
    {
      hreflang: 'x-default',
      href: localeUrl(DEFAULT_LOCALE),
      label: getCopy(DEFAULT_LOCALE).meta.label,
      locale: DEFAULT_LOCALE,
    },
  ];
}

export { DEFAULT_LOCALE, SITE_URL, locales };
