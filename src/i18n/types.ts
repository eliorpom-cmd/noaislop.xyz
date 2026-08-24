// Shape of one locale file. Every file in src/content/i18n/ must match it,
// so a missing key in a translation breaks the build instead of the page.

export interface RunIn {
  /** Run-in heading: the first two words of the line, in bold. */
  title: string;
  text: string;
}

export interface Copy {
  meta: {
    /** BCP 47 tag, also used as the URL segment and the hreflang value. */
    lang: string;
    dir: 'ltr' | 'rtl';
    /** Open Graph locale, e.g. "en_US". */
    ogLocale: string;
    /** Name of the language, written in that language. */
    label: string;
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
  };
  hero: {
    h1: string;
    subtitle: string;
  };
  definition: {
    sectionTitle: string;
    word: string;
    partOfSpeech: string;
    text: string;
    source: string;
    body: string[];
  };
  dont: {
    sectionTitle: string;
    intro: string;
    /** The word stamped at the end of every line. */
    stamp: string;
    /** One line prompts, the kind that goes straight to publish. */
    prompts: string[];
    /** What the prompts cost, read right under them. */
    lede: string;
    body: string[];
  };
  standards: {
    sectionTitle: string;
    body: string[];
    /** The same line, written by someone who made decisions. */
    example: {
      prompt: string;
      stamp: string;
    };
    blocks: RunIn[];
  };
  test: {
    sectionTitle: string;
    items: string[];
    outro: string;
  };
  emphasis: string;
  share: {
    sectionTitle: string;
    domain: string;
    hint: string;
    copied: string;
    copyLabel: string;
  };
  footer: {
    lines: string[];
    note: string;
  };
  languageSwitcher: {
    /** Accessible name of the select. */
    label: string;
    /** The line printed next to it: "Prefer another language?" */
    prompt: string;
  };
}
