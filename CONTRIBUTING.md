# Contributing

Fixes and translations are welcome. Everything is public domain, so anything you
send is released under [CC0](LICENSE) too.

## Add a language, in five steps

1. **Copy the English file.** `src/content/i18n/en.json` to
   `src/content/i18n/{code}.json`, where `{code}` is the language code:
   `de`, `es`, `pt-br`. The file name becomes the URL: `/de/`, `/es/`.
2. **Set `meta.lang` to the same code** as the file name, and fill `meta.label`
   with the name of the language written in that language ("Deutsch", not
   "German"). Set `meta.ogLocale` too: `de_DE`, `es_ES`.
3. **Translate every value.** Keep every key, keep the structure. Do not
   translate the keys. Text between double asterisks is bold: `**like this**`,
   and `[label](https://url)` is a link. Move the asterisks to whatever carries
   the point in your language, that is the only markup there is. `dont.prompts`
   are the one line prompts stamped SLOP: rewrite them so they sound like
   something someone would actually type in your language, a local reference
   beats a literal translation. Never translate `share.domain` or `dont.stamp`.
4. **Run `npm run check` and `npm run build`.** A missing key, or a `meta.lang`
   that does not match the file name, fails the build. That is on purpose.
5. **Open a pull request.** Look at your page at `/{code}/` first.

No component, no route, no config to touch. The page, the language switcher and
the `hreflang` tags pick the file up on their own.

## Writing rules

The page argues that published text should have a human in it, so the copy has
to hold that line.

- **No em dashes.** Anywhere. It is the most recognizable tell and this site
  says so out loud.
- Translate the argument, not the words. Idioms and examples should land in your
  language, even if that means changing them. A "LinkedIn post about morning
  coffee" should be whatever your language's version of that is.
- Short. The English page is deliberately brief, a reader who was just sent
  this link will not read three screens. If your translation is much longer than
  the English, cut it.
- Second person, plain words, short sentences. The reader just got sent this
  link by someone. Be direct, do not lecture, do not moralize.
- Keep `hero.h1` in English. "your AI slop sucks." is the title of the site.
- Use your language's real typography: guillemets in French, proper apostrophes
  everywhere.

## Fixes and code

Small fixes: open a pull request. Larger changes to the argument itself: open an
issue first, so we can talk about it before you write.

Before pushing:

```sh
npm run check
npm run build
```

Accessibility is not optional here: contrast at AA or better, every interactive
element reachable and visible on keyboard, decorative filler hidden from screen
readers.
