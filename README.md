# noaislop.xyz

A single page you send to someone who just published AI slop.

Same family as [nohello.net](https://nohello.net),
[dontasktoask.com](https://dontasktoask.com) and
[dontpastetheai.com](https://dontpastetheai.com): one page, one point, no
account, no tracker, no cookie.

The point is not that AI is bad. The point is that publishing something nobody
thought about, to people who never asked for it, costs everyone else their
attention. The page is about effort.

## Stack

[Astro](https://astro.build) in static mode, TypeScript, no UI framework. The
only JavaScript shipped to the browser is a clipboard button, a language
preference, and a one-time redirect on the canonical page.

The layout, type scale and colours follow nohello.net closely: Lato, a 1100px
container, a 94px hero, two columns at 40/59, cards with a soft double shadow,
a footer that fades into grey. Three of its values were darkened to clear WCAG
AA, and each one says so in a comment in `src/styles/global.css`.

Two typefaces, both self-hosted from `public/fonts/`, so the page calls no third
party at all: [Lato](https://fonts.google.com/specimen/Lato) at 300, 400 and 700
for everything, and
[Rubik Wet Paint](https://fonts.google.com/specimen/Rubik+Wet+Paint), subset to
the alphabet, for the dripping SLOP stamp. Both are under the SIL Open Font
License, included next to the files. The `latin-ext` slices only download for
languages that need them.

The chat cards are a generic assistant interface: no product name, no logo, no
brand colours. It should read as "an AI chatbot", not as a specific one.

## Run it locally

```sh
npm install
npm run dev      # http://localhost:4321
```

Other scripts:

```sh
npm run build    # static site into dist/
npm run preview  # serve the built site
npm run check    # astro check, type-checks the pages and the locale files
```

Node 22.12 or newer.

## Where things are

```
src/
├─ content/i18n/     one JSON file per language, all the copy lives here
├─ i18n/             locale registry (config.ts), helpers (utils.ts), types
├─ layouts/          BaseLayout.astro: head, meta, hreflang, redirect script
├─ components/       TopBanner, Hero, DefinitionCard, PromptCard, CostList,
│                    Standards, EmphasisBox, TestList, CopyLink, Footer
├─ pages/            index.astro (canonical) and [locale]/index.astro
└─ styles/global.css design tokens and shared layout
public/              favicon, OG image, self-hosted fonts
tools/               source of the OG image, see tools/README.md
```

The only markup inside the copy is `**bold**`, rendered by
`src/components/Copy.astro`. Nothing from a locale file is ever injected as raw
HTML, so a translation pull request cannot smuggle markup into the page.

Two rules hold the project together:

1. **No copy in components.** Every string comes from
   `src/content/i18n/{locale}.json`. A component that hardcodes text is a bug.
2. **A language is a file.** Drop `de.json` in `src/content/i18n/`, and `/de/`
   gets built, listed in the language switcher, and added to every `hreflang`.
   Nothing else to register. See [CONTRIBUTING.md](CONTRIBUTING.md).

## How languages resolve

`/` is English and canonical. Every other language is prefixed: `/fr/`, `/de/`.

On `/` only, an inline script reads `navigator.languages` and, the first time,
sends the reader to their language if the site has it. The choice is written to
`localStorage` under `noaislop:lang`, so it happens once and never fights
someone who came back to English on purpose. Clicking the language switcher
writes the same key. Storage blocked or JavaScript off: everyone stays on
English, which is the correct fallback.

## Not indexed yet

The page carries `<meta name="robots" content="noindex, nofollow">` and
`public/robots.txt` disallows everything. Delete the meta tag in
`src/layouts/BaseLayout.astro` and the robots file to open it to search engines.

## Deploy

`npm run build` produces a fully static `dist/`. Drop it on anything: Netlify,
Vercel, Cloudflare Pages, GitHub Pages, an S3 bucket, a shared host over FTP.
No server, no runtime, no environment variable.

Build command `npm run build`, publish directory `dist`.

If you deploy on another domain, change `site` in `astro.config.mjs`. It is what
`canonical`, `hreflang` and the OG image URL are built from.

## License

[CC0 1.0](LICENSE). Public domain. Copy it, fork it, translate it, run your own
version. No attribution required, though a link back is nice.
