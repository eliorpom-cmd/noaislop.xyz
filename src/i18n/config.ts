import type { Copy } from './types';

/** Canonical locale, served at the root without a prefix. */
export const DEFAULT_LOCALE = 'en';

/** Absolute site URL, used for canonical and hreflang tags. */
export const SITE_URL = 'https://noaislop.xyz';

// Every JSON file in src/content/i18n/ is a locale. Dropping a new file in
// there is all it takes to add a language: no registry to update here.
const modules = import.meta.glob('../content/i18n/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Copy>;

export const copyByLocale: Record<string, Copy> = {};

for (const [path, copy] of Object.entries(modules)) {
  const locale = path.split('/').pop()!.replace('.json', '');
  if (copy.meta.lang !== locale) {
    throw new Error(
      `Locale mismatch: ${path} declares meta.lang "${copy.meta.lang}" but the file is named "${locale}.json".`,
    );
  }
  copyByLocale[locale] = copy;
}

if (!copyByLocale[DEFAULT_LOCALE]) {
  throw new Error(`Missing the default locale file src/content/i18n/${DEFAULT_LOCALE}.json.`);
}

/** Default locale first, then alphabetical, so the switcher order is stable. */
export const locales: string[] = Object.keys(copyByLocale).sort((a, b) => {
  if (a === DEFAULT_LOCALE) return -1;
  if (b === DEFAULT_LOCALE) return 1;
  return a.localeCompare(b);
});
