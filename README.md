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

The layout is one column on a 40rem measure. Each section opens with a hairline
and a title in the marker face. The only rules on the page are the ones that
separate two sections: no rule inside a list, none under the header. One accent
colour, the lime the stamp is printed in. Greys are picked to clear WCAG AA on
the background.

Three typefaces, all self-hosted from `public/fonts/`, so the page calls no third
party at all:

- **Nimbus Sans L**, shipped as [TeX Gyre Heros](https://www.gust.org.pl/projects/e-foundry/tex-gyre/heros),
  the free descendant maintained by GUST, for every word of text. GUST Font
  License, included next to the files.
- **[Comico](https://www.fontshare.com/fonts/comico)** for the title, the
  section titles, the numbers in the test and the domain on the copy button. It
  is unicase, it only draws capitals, and it never sets a paragraph. Free from
  Fontshare under the ITF Free Font License.
- **[Rubik Wet Paint](https://fonts.google.com/specimen/Rubik+Wet+Paint)**,
  subset to the alphabet, for the one word it exists for: SLOP. SIL Open Font
  License.

The `latin-ext` slices only download for languages that need them.

"Don't do this" is three one-line prompts, each stamped SLOP. No screenshot, no
reconstructed chat window: the prompts are the whole point, and they are set in
type like everything else.

The language menu is ours, not the operating system's: a `<details>` disclosure
with a panel of links, so it opens without JavaScript and takes as many
languages as we add. The copy button fills with the accent colour once the
domain is on the clipboard, with no transition: the state is the feedback.

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
├─ components/       TopBanner, Hero, Definition, SlopList, Standards,
│                    TestList, EmphasisBox, CopyLink, Footer
├─ pages/            index.astro (canonical) and [locale]/index.astro
└─ styles/global.css design tokens and shared layout
public/              favicon, OG image, self-hosted fonts
tools/               source of the OG image, see tools/README.md
```

The only markup inside the copy is `**bold**` and `[label](https://url)`,
rendered by `src/components/Copy.astro`, which only turns `http`, `https`,
`mailto` and root-relative URLs into links. Nothing from a locale file is ever
injected as raw HTML, so a translation pull request cannot smuggle markup into
the page.

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
