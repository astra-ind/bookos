# BookOS — Marketing Site

A fully static, dependency-free product website. Upload this folder anywhere
that serves files — GitHub Pages, Netlify, S3, any web server — and it works.

## Deploy to GitHub Pages

1. Push this `site/` folder to a repository (as the repo root, or to a
   `docs/` folder or `gh-pages` branch — any of the standard options).
2. Repository → Settings → Pages → select the branch/folder → Save.
3. Done. All routes use plain `.html` files, so no server config is needed.

Everything is relative: the site also works when opened directly from disk
(`index.html`) and from any sub-path (e.g. `username.github.io/bookos/`).

## Editing content

| File | What lives there |
|---|---|
| `config.js` | **Single source of truth** — download URLs, pricing plans, contact links, social links |
| `docs-data.js` | All documentation articles (rendered into pages *and* the search index) |
| `site.css` | The whole design system |
| `components.js` | Shared runtime: nav, footer, theme, FAQ, pricing/downloads renderers, docs engine, search |
| `build-pages.mjs` | Regenerates `documentation/*.html` after editing `docs-data.js`: `node build-pages.mjs` |

### Before you go live

- **Downloads:** set real release URLs in `config.js → downloads`. Platforms
  with `available: false` render as honest "Coming soon" buttons.
- **Pricing:** replace the `TBD` plans in `config.js → pricing` when prices
  are final.
- **Links:** add GitHub/Discord/X URLs in `config.js → links` — footer social
  icons only render for links that exist.
- **Brutal honesty policy:** no fake testimonials, numbers, or logos anywhere
  on the site. Keep it that way.
