# tools

`generate-og-images.mjs` produces `public/og/{locale}.png` (1200x630), one per
file in `src/content/i18n/`: each image is that locale's `hero.h1` in the
marker face, in the accent green, on the page background. `BaseLayout.astro`
points `og:image` at the file matching the page's own locale, so a link to `/`
shares the English hero and a link to `/fr/` shares the French one.

[.github/workflows/og-images.yml](../.github/workflows/og-images.yml) runs this
on every push to `main` that touches `src/content/i18n/**`, and commits the
result back if the images changed. A translation PR does not need to include
`public/og/`; it gets generated once the PR lands.

To run it yourself (to preview before merging, or if you don't want to wait for
CI):

```sh
npm run og-images
```

Needs a local Chrome/Chromium; the script defaults to the macOS install path
and honors `CHROME_PATH` otherwise. `og-image.html` is the original single-image
template the script's HTML is based on, kept as a reference for the layout and
font-face rules.
