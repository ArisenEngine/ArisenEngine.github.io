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
  AI/automation boundaries, architecture evolution, roadmap
- `documentation.html` — technical documentation index and empty-state framework
- `about.html` — tailored Chinese resume page with a print/PDF entry point
- `404.html` — self-contained not-found page
- `assets/css/site.css` — the shared visual system
- `assets/css/resume-print.css` — independent, project-led A4 resume typography
- `assets/js/site.js` — navigation, reveal animations, pointer glow, print action
- `assets/js/resume-print.js` — copies the existing resume content into the print-only layout
- `assets/images/arisen-mark.png` — public copy of the editor logo
- `assets/images/wang-jingwen-avatar.jpg` — avatar used on the homepage introduction
  teaser and the resume summary card
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
- Resume content is authored only in `about.html`. Its inert print template and
  `resume-print.js` reuse that content; do not maintain a second hand-written PDF resume.
  Screen styling remains in `site.css`, and PDF styling is isolated in `resume-print.css`.
- `关于我` positions the candidate for rendering engine and engine architecture roles. The Tesla
  JD was used as a technology reference, not as a fixed written target. Edit the summary,
  experience, and project sections directly in `about.html` when the application focus changes.
- Lead the summary and main content with Arisen Engine and 《失控进化》, ahead of career chronology.
  The print layout keeps these two projects on page one and earlier employment on page two.
- Employment end dates around the move from 三七互娱 to 无端 were reconstructed from the available
  commit history; confirm them before sending the resume.
- Resume experience describes verified work, not commit counts or unverified performance gains.
  Do not equate participation in SRP threading with sole ownership of the complete architecture.
  GPU MeshCombine implementation and integration do not by themselves prove a frame-time improvement.
- Keep employer commit inventories, internal paths, ticket IDs, code excerpts, and profiling
  artifacts out of the public site. Local resume evidence belongs in ignored `.arisen/` storage.
- AI experience is authoring/development tooling: repository context, bounded implementation and
  review tasks, MCP integrations and independently checked outputs. Do not turn proposed editor
  AI interfaces, incomplete rendering phases or asset candidates into claims of shipped systems.
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

## Resume PDF export

The project-led print layout keeps Arisen Engine and 《失控进化》 on page one. Earlier employment,
education, the technical stack and secondary contact links appear on page two.

With Node.js, `playwright`, `pdf-lib` and Chromium available, run from the repository root:

```powershell
node Arisen\Scripts\Website\export_resume.cjs --browser "C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Omit `--browser` to use Playwright's installed Chromium. `ARISEN_PDF_BROWSER` is also supported.
If the Node dependencies are not already available, install them into ignored local tooling
storage and point Node at that directory:

```powershell
npm install --prefix .arisen/website-tools playwright@1.62.1 pdf-lib@1.17.1
$env:NODE_PATH = (Resolve-Path .arisen/website-tools/node_modules).Path
```

Use `--output` for a candidate PDF and `--preview-dir` for print screenshots and a validation report.
The exporter checks all project bullets were copied, rejects local file links and non-two-page
output, sets PDF metadata, and only then replaces the requested output.
Visually review both rendered PDF pages before publication; structural checks do not prove layout.
