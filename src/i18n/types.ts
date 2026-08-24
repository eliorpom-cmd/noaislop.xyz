// Shape of one locale file. Every file in src/content/i18n/ must match it,
// so a missing key in a translation breaks the build instead of the page.

export interface PromptCard {
  /** The one line prompt, shown in the user bubble. */
  prompt: string;
  /** What comes back: plain text, a generated image, or a video. */
  kind: 'text' | 'image' | 'video';
  /** Accessible description of the whole card, blurred reply included. */
  alt: string;
  /** Fake reply text, blurred and aria-hidden. Only used when kind is "text". */
  reply?: string[];
}

export interface CostItem {
  title: string;
  text: string;
}

export interface StandardsBlock {
  title: string;
  items: string[];
}

export interface TestItem {
  question: string;
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
  banner: string;
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
    stamp: string;
    /** The two labels on the reconstructed assistant interface. */
    chrome: {
      assistant: string;
      composer: string;
    };
    cards: PromptCard[];
    caption: string;
  };
  cost: {
    sectionTitle: string;
    lede: string;
    items: CostItem[];
  };
  standards: {
    sectionTitle: string;
    body: string[];
    blocks: StandardsBlock[];
  };
  emphasis: string;
  test: {
    sectionTitle: string;
    intro: string;
    items: TestItem[];
    outro: string;
  };
  share: {
    sectionTitle: string;
    body: string;
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
    label: string;
  };
}
