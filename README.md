# noaislop.xyz

A single page you send to someone who just published AI slop.

Same family as [nohello.net](https://nohello.net),
[dontasktoask.com](https://dontasktoask.com) and
[dontpastetheai.com](https://dontpastetheai.com): one page, no account, no
tracker, no cookie.

It asks one thing of the reader: put something of your own in what you publish.

## Stack

[Astro](https://astro.build) in static mode, TypeScript, no UI framework. The
only JavaScript in the browser is the copy button, the language menu and a
one-time redirect on the canonical page.

Three typefaces, all served from `public/fonts/`, so the page calls no third
party:

- **Nimbus Sans L**, shipped as [TeX Gyre Heros](https://www.gust.org.pl/projects/e-foundry/tex-gyre/heros),
  for every word of text. GUST Font License.
- **[Comico](https://www.fontshare.com/fonts/comico)** for the title, the
  section titles, the numbers in the test and the domain on the copy button.
  Unicase: it draws capitals only, so it sets no paragraphs. ITF Free Font
  License.
- **[Rubik Wet Paint](https://fonts.google.com/specimen/Rubik+Wet+Paint)**,
  subset to the alphabet, for the word SLOP. SIL Open Font License.

Every licence file is in `public/fonts/` next to the fonts it covers.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site into dist/
npm run check    # types, pages and locale files
```

Node 22.12 or newer.

## Where things are

```
src/
├─ content/i18n/     one JSON file per language, all the copy
├─ i18n/             locale registry, helpers, types
├─ layouts/          BaseLayout.astro: head, meta, hreflang, redirect
├─ components/       one per block of the page
├─ pages/            index.astro and [locale]/index.astro
└─ styles/global.css tokens, layout, @font-face
public/              favicon, OG image, fonts
tools/               source of the OG image
```

Two rules:

1. **No copy in components.** Every string comes from
   `src/content/i18n/{locale}.json`. A component that hardcodes text is a bug.
2. **A language is a file.** Drop `de.json` in `src/content/i18n/` and the build
   produces `/de/`, lists it in the language menu and adds it to the `hreflang`
   tags. See [CONTRIBUTING.md](CONTRIBUTING.md).

The only markup allowed inside the copy is `**bold**` and
`[label](https://url)`, rendered by `src/components/Copy.astro`. Nothing from a
locale file is ever injected as raw HTML, so a translation pull request cannot
smuggle markup into the page.

## How languages resolve

`/` is English and canonical, every other language is prefixed: `/fr/`, `/de/`.

On `/` only, an inline script sends a first-time reader to their language if the
site has it, then writes that choice to `localStorage` under `noaislop:lang`.
The redirect runs once, so a reader who comes back to English on purpose stays
there. Without storage or JavaScript, the reader stays on English.

## Deploy

`npm run build` produces a static `dist/`. Any host serves it: build command
`npm run build`, publish directory `dist`.

On another domain, change `site` in `astro.config.mjs`. The build reads it for
`canonical`, for `hreflang` and for the OG image URL.

## License

[CC0 1.0](LICENSE). Public domain. Copy it, fork it, translate it, run your own
version. No attribution required, though a link back is nice.
