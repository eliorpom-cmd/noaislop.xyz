# tools

`og-image.html` is the source of `public/og-image.png` (1200x630). It is a plain
HTML page, screenshotted at that exact size. To regenerate it after an edit:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 \
  --screenshot=public/og-image.png \
  "file://$PWD/tools/og-image.html"
```

Any headless browser does the job. The image is a placeholder, waiting for a
proper one.
