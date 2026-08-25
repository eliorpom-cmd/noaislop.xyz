#!/usr/bin/env node
// Regenerates public/og/{locale}.png, one per file in src/content/i18n/, each
// showing that locale's hero.h1 in the same style as the original og-image.html.
// Requires a local Chrome/Chromium. Run after editing a hero.h1 or adding a
// language: `npm run og-images`.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const i18nDir = join(root, 'src/content/i18n');
const outDir = join(root, 'public/og');

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Same face as tools/og-image.html, plus the latin-ext range (see
// src/styles/global.css) so languages outside Latin-1 still render Comico.
function template(title) {
  return `<!doctype html>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: "Comico";
    src: url("../public/fonts/comico-400-latin.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: "Comico";
    src: url("../public/fonts/comico-400-latin-ext.woff2") format("woff2");
    unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF,
      U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0;
  }
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #fdfdfc;
    display: flex;
    align-items: center;
    padding: 0 90px;
  }
  h1 {
    font-family: "Comico", sans-serif;
    font-weight: 400;
    font-size: 132px;
    line-height: 1.04;
    color: #758d0d;
  }
</style>
<body>
  <h1>${escapeHtml(title)}</h1>
</body>`;
}

mkdirSync(outDir, { recursive: true });

const files = readdirSync(i18nDir).filter((file) => file.endsWith('.json'));

for (const file of files) {
  const locale = file.replace('.json', '');
  const copy = JSON.parse(readFileSync(join(i18nDir, file), 'utf8'));
  const tmpHtml = join(__dirname, `.og-tmp-${locale}.html`);
  const outPng = join(outDir, `${locale}.png`);

  writeFileSync(tmpHtml, template(copy.hero.h1));

  try {
    execFileSync(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      `--screenshot=${outPng}`,
      `file://${tmpHtml}`,
    ]);
    console.log(`public/og/${locale}.png`);
  } finally {
    rmSync(tmpHtml);
  }
}
