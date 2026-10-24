# Arisen Engine website

This folder is the static GitHub Pages site for Arisen Engine.

## Publish

The site has no build step. The public organization site repository is
`ArisenEngine/ArisenEngine.github.io`, and the published URL is `https://arisenengine.github.io/`.

The `ArisenEngine/Engine` repository is private and the organization is on GitHub Free, so GitHub
Pages cannot be enabled directly on this repository. Keep `docs/` as the reviewable source and copy
its contents to the root of the public site repository for publication.

All internal links are relative, so moving to a custom domain does not require changing the
page structure. Add the custom domain under **Settings → Pages → Custom domain** in the public
site repository.

## Files

- `index.html` — homepage and engine positioning
- `engine.html` — design principles, system layers, rendering, runtime, validation,
  architecture evolution, roadmap
- `documentation.html` — technical documentation index and empty-state framework
- `about.html` — tailored Chinese resume page with a print/PDF entry point
- `404.html` — self-contained not-found page
- `assets/css/site.css` — the shared visual system
- `assets/js/site.js` — navigation, reveal animations, pointer glow, print action
- `assets/images/arisen-mark.png` — public copy of the editor logo
- `assets/images/wechat-qr.png` — cropped WeChat contact QR code for the resume page
- `assets/images/og-cover.png` — 1200×630 social sharing card
- `assets/wang-jingwen-resume.pdf` — optimized two-page PDF downloaded by the resume button
- `robots.txt` and `sitemap.xml` — crawler metadata for the public URL

## Editing notes

- The header and footer are intentionally duplicated in each HTML file because this is a
  dependency-free static site. Update all four pages when changing navigation or footer links.
- The resume uses `王靖文 / Jingwen Wang`, the public GitHub email, and the public Zhihu and
  Bilibili profiles from the source resume. The private phone number and personal details from
  the PDF are intentionally not published.
- The WeChat QR code appears both in the web resume contact block and in the PDF contact block.
- Regenerate the downloadable PDF from `about.html` with the browser print stylesheet whenever
  resume content changes, then replace `assets/wang-jingwen-resume.pdf`.
- `关于我` positions the candidate for rendering engine and engine architecture roles. The Tesla
  JD was used as a technology reference, not as a fixed written target. Edit the summary,
  experience, and project sections directly in `about.html` when the application focus changes.
- Employment end dates around the move from 三七互娱 to 无端 were reconstructed from the available
  commit history; confirm them before sending the resume.
- Linux, Metal, English fluency, patents, and publications are deliberately not claimed because the
  supplied resume and commit history do not provide evidence for them.
- `documentation.html` intentionally contains navigation and category scaffolding only.
- Every page is Chinese-first (`lang="zh-CN"`). A future English version can be added as
  `en/index.html` with a language link in each header; keep assets shared.
- Do not add generated build files here. GitHub Pages serves this directory as-is.
- Keep `og:url` and `og:image` in sync if the published URL or custom domain changes.

## Local preview

From this directory:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

Use the **打印 / 导出 PDF** button on the resume page to produce a print-ready PDF through the
 browser's print dialog. The current print stylesheet is tuned for two A4 pages.
