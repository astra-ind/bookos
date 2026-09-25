/* ============================================================
   BookOS — static page generator (run once after editing
   docs-data.js):  node build-pages.mjs
   Emits every documentation article + section hub page so the
   folder remains a pure static site (GitHub Pages ready).
   ============================================================ */
import { writeFileSync, readFileSync } from 'node:fs'

// docs-data.js is written for the browser (global const, no ESM export);
// evaluate it and pull the array out.
const DOCS = new Function(readFileSync(new URL('./docs-data.js', import.meta.url), 'utf8') + '; return DOCS;')()

const HEAD = (title, desc) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../site.css">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239a4a1e' stroke-width='1.6'%3E%3Cpath d='M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z'/%3E%3Cpath d='M4 18.5A2.5 2.5 0 0 1 6.5 16H20'/%3E%3C/svg%3E">
</head>
<body data-page="docs">
  <header id="site-header"></header>
  <main class="docs-layout wrap">`

const FOOT = `
  </main>
  <footer id="site-footer"></footer>
  <script>window.SITE_ROOT = '../'</script>
  <script src="../config.js"></script>
  <script src="../docs-data.js"></script>
  <script src="../components.js"></script>
</body>
</html>`

function articlePage(doc) {
  return `${HEAD(`BookOS Docs — ${doc.title}`, `${doc.title} — BookOS documentation. ${doc.section}.`)}
    <nav class="docs-nav" id="docs-nav" aria-label="Documentation"></nav>
    <article class="docs-article" id="docs-article" data-slug="${doc.slug}"></article>
    <aside class="docs-toc">
      <div class="toc-head">On this page</div>
      <div id="docs-toc-list"></div>
    </aside>
  ${FOOT}
  <script>document.body.setAttribute('data-doc-slug', '${doc.slug}')</script>`
}

function hubPage(section, desc) {
  const items = DOCS.filter((d) => d.section === section)
  return `${HEAD(`BookOS Docs — ${section}`, desc)}
    <nav class="docs-nav" id="docs-nav" aria-label="Documentation"></nav>
    <article class="docs-article">
      <h1>${section}</h1>
      <div class="doc-meta">BookOS Documentation</div>
      <p>${desc}</p>
      <div class="doc-cards">
        ${items.map((d) => `<a class="doc-card" href="${d.slug}.html">
          <div class="cat">${d.section}</div>
          <div class="t">${d.title}</div>
          <div class="d">${stripText(d.body).slice(0, 110)}…</div>
        </a>`).join('\n        ')}
      </div>
      <nav class="docs-pager" style="margin-top:40px">
        <span></span>
        <a class="next" href="${items[0].slug}.html"><span class="dir">Start →</span><div class="t">${items[0].title}</div></a>
      </nav>
    </article>
    <aside class="docs-toc"></aside>
  ${FOOT}`
}

function stripText(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

const HUBS = [
  ['Getting Started', 'Install BookOS, create your first project, and write your first chapter. Everything before the long haul.'],
  ['Writing', 'The editor, chapters and scenes, notes, and the goal system — the surfaces you live in daily.'],
  ['Book Brain', 'The context system: what the AI knows, characters, timeline, worldbuilding, and continuity.'],
  ['AI', 'Agents, workflows, Autopilot, and connecting your own providers and keys.'],
  ['Version Control', 'Branches, commits, pull requests, diffs and merges for manuscripts.'],
  ['Advanced', 'Skills, project configuration, local models, export and backup.']
]

for (const doc of DOCS) {
  writeFileSync(new URL(`./documentation/${doc.slug}.html`, import.meta.url), articlePage(doc))
}
for (const [section, desc] of HUBS) {
  const file = section.toLowerCase().replace(/\s+/g, '-') + '.html'
  writeFileSync(new URL(`./documentation/${file}`, import.meta.url), hubPage(section, desc))
}
console.log(`Wrote ${DOCS.length} articles + ${HUBS.length} hubs to site/documentation/`)
