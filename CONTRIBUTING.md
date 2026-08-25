# Contributing

Fixes and translations are welcome. Everything here is public domain, so
anything you send is released under [CC0](LICENSE) too.

## Add a language

1. **Copy `src/content/i18n/en.json`** to `src/content/i18n/{code}.json`:
   `de`, `es`, `pt-br`. The file name becomes the URL.
2. **Set `meta.lang` to that same code**, `meta.label` to the language written
   in that language ("Deutsch", not "German"), and `meta.ogLocale` to `de_DE`.
3. **Translate every value, keep every key.** The only markup is `**bold**` and
   `[label](https://url)`. Leave `share.domain`, `dont.stamp` and
   `definition.word` alone: "slop" is the site's word, never translate it.
   `standards.example.stamp` does get translated, pick whatever short word
   your language uses for "fine, that'll do".
4. **Run `npm run check` and `npm run build`**, look at `/{code}/`, open a pull
   request. A missing key, or a `meta.lang` that does not match the file name,
   fails the build on purpose.

No component, no route, no config to touch.

## Writing rules

The page asks writers to put themselves in what they publish, so its own copy
has to do that.

- **No em dashes.** Anywhere. The page names them as a tell, so it cannot use
  them.
- Translate the argument, not the words. A "LinkedIn post about morning coffee"
  should be whatever your language's version of that is.
- Keep it short. Someone who was just sent this link will not read three
  screens. If your translation runs longer than the English, cut it.
- Second person, plain words, short sentences. Do not lecture.

- Use your language's real typography: guillemets in French, proper apostrophes
  everywhere.

## Fixes and code

Small fixes: open a pull request. Changes to the argument itself: open an issue
first, so we can talk about it before you write.

Run `npm run check` and `npm run build` before pushing.

Accessibility: contrast at AA or better, every interactive element reachable and
visible on a keyboard, decorative filler hidden from screen readers.
