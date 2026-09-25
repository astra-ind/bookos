/* ============================================================
   BookOS — shared runtime (plain JavaScript).
   Renders chrome (nav/footer), theme, mobile menu, scroll
   reveals, FAQ, pricing & downloads from config, the docs
   engine, and client-side documentation search.
   Every page includes: config.js, docs-data.js, this file.
   ============================================================ */
(function () {
  'use strict'

  var ROOT = window.SITE_ROOT || ''
  var cfg = window.BOOKOS_CONFIG

  // ── Path helpers (routes work from any page depth) ──────────
  function go(route) {
    if (/^https?:|^mailto:/.test(route)) return route
    return ROOT + route.replace(/^\//, '')
  }

  // ── Icons (inline SVG, one source) ──────────────────────────
  var ICONS = {
    logo: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/><path d="M9 8h7M9 11h5"/></svg>',
    sun: '<svg class="sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/></svg>',
    moon: '<svg class="moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    menu: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    windows: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm9 7.5h9v-12l-9 1.3V13ZM3 13h7.5v7.1L3 18.9V13Zm9 0h9v11.5l-9-1.3V13Z" transform="scale(0.85) translate(2 1)"/></svg>',
    apple: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.7 12.9c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.8ZM14.4 5.6c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4Z"/></svg>',
    linux: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c-2 0-3.3 1.6-3.3 3.9 0 1.5.3 2.5-.4 3.9-.9 1.7-2.6 3.7-3.1 5.7-.3 1.4.1 2.4.9 2.9-.1.9.4 1.8 1.7 2.2 1.7.5 3 .3 3.9-.2.3.2.9.3 1.5.3s1.2-.1 1.5-.3c.9.5 2.2.7 3.9.2 1.3-.4 1.8-1.3 1.7-2.2.8-.5 1.2-1.5.9-2.9-.5-2-2.2-4-3.1-5.7-.7-1.4-.4-2.4-.4-3.9C15.3 3.6 14 2 12 2Z"/></svg>',
    github: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 6.8 8.7a3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>',
    x: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.1h1.7L7.5 4.8H5.7l11 14.3Z"/></svg>',
    discord: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 5.1A16.6 16.6 0 0 0 15.6 4l-.5 1a15.3 15.3 0 0 0-6.2 0L8.4 4a16.6 16.6 0 0 0-4 1.1C1.7 9.1 1 13 1.4 16.8A16.8 16.8 0 0 0 6.5 20l1.1-1.8a10 10 0 0 1-1.7-.8l.4-.3a11.9 11.9 0 0 0 11.4 0l.4.3c-.5.3-1.1.6-1.7.8L17.5 20a16.8 16.8 0 0 0 5.1-3.2c.5-4.4-.7-8.2-3-11.7ZM8.7 14.4c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg>',
    youtube: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z"/></svg>'
  }
  window.BK_ICONS = ICONS

  // ── Theme (persisted, no flash) ─────────────────────────────
  var stored = null
  try { stored = localStorage.getItem('bookos.theme') } catch (e) { /* private mode */ }
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  document.documentElement.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'))

  // ── Honest inline notice (no dead links, no alert spam) ─────
  window.BKNotice = function (message) {
    var old = document.querySelectorAll('[data-bk-notice]')
    for (var i = 0; i < old.length; i++) old[i].remove()
    var n = document.createElement('div')
    n.setAttribute('data-bk-notice', '')
    n.setAttribute('role', 'status')
    n.style.cssText = 'position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:90;max-width:520px;width:calc(100% - 40px);background:var(--ink);color:var(--paper);padding:13px 18px;border-radius:10px;font:500 13.5px/1.5 var(--sans);box-shadow:var(--shadow-lg)'
    n.textContent = message
    document.body.appendChild(n)
    setTimeout(function () { n.remove() }, 5200)
  }

  // ── Chrome injection ────────────────────────────────────────
  var NAV = [
    ['Product', '/#product'], ['Features', '/features.html'], ['Download', '/download.html'],
    ['Pricing', '/pricing.html'], ['Documentation', '/documentation/'], ['About', '/about.html'], ['Help', '/help.html']
  ]

  function header() {
    var path = location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
    function here(route) {
      var r = route.split('#')[0]
      if (r === '/') return path === ROOT || path === ROOT + 'index' || path === ROOT + '/'
      var norm = (ROOT + r.replace(/^\//, '')).replace(/\/$/, '')
      return path === norm || path.indexOf(norm) === 0
    }
    var links = NAV.map(function (item) {
      return '<a href="' + go(item[1]) + '"' + (here(item[1]) ? ' aria-current="page"' : '') + '>' + item[0] + '</a>'
    }).join('')
    var el = document.getElementById('site-header')
    if (!el) return
    el.className = 'site-header'
    el.innerHTML =
      '<div class="wrap bar">' +
        '<a class="logo" href="' + go('/') + '" aria-label="BookOS home">' + ICONS.logo + '<span>BOOKOS</span></a>' +
        '<nav class="nav-links" aria-label="Primary">' + links + '</nav>' +
        '<div class="nav-cta">' +
          '<a class="nav-signin" href="#" data-signin>Sign In</a>' +
          '<a class="btn btn-primary btn-sm" href="' + go('/download.html') + '">Download BookOS</a>' +
          '<button class="theme-toggle" data-theme-toggle aria-label="Toggle color theme">' + ICONS.moon + ICONS.sun + '</button>' +
          '<button class="theme-toggle menu-btn" data-menu-toggle aria-label="Open menu" aria-expanded="false">' + ICONS.menu + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="mobile-menu" data-mobile-menu>' +
        NAV.map(function (item) { return '<a href="' + go(item[1]) + '">' + item[0] + '</a>' }).join('') +
        '<div class="m-cta">' +
          '<a class="btn btn-primary" href="' + go('/download.html') + '">Download BookOS</a>' +
          '<a class="btn btn-ghost" href="' + go('/help.html') + '">Help Center</a>' +
        '</div>' +
      '</div>'

    el.querySelector('[data-theme-toggle]').addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try { localStorage.setItem('bookos.theme', next) } catch (e) { /* private mode */ }
    })
    var menuBtn = el.querySelector('[data-menu-toggle]')
    var menu = el.querySelector('[data-mobile-menu]')
    menuBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('open')
      menuBtn.setAttribute('aria-expanded', String(open))
      menuBtn.innerHTML = open ? ICONS.close : ICONS.menu
    })
    var menuLinks = menu.querySelectorAll('a')
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function () {
        menu.classList.remove('open'); menuBtn.innerHTML = ICONS.menu
      })
    }
    // Sign-in: there are no accounts yet — say so honestly instead of a dead link.
    el.querySelector('[data-signin]').addEventListener('click', function (e) {
      e.preventDefault()
      window.BKNotice('Accounts are not part of BookOS yet — the app is local-first and needs no sign-in. This link will arrive with cloud features, if they ever do.')
    })
  }

  function footer() {
    var el = document.getElementById('site-footer')
    if (!el) return
    function col(title, items) {
      var out = '<div class="foot-col"><b>' + title + '</b>'
      for (var i = 0; i < items.length; i++) {
        if (items[i][1]) out += '<a href="' + items[i][1] + '">' + items[i][0] + '</a>'
      }
      return out + '</div>'
    }
    var socialDefs = [['GitHub', cfg.links.github, ICONS.github], ['X', cfg.links.x, ICONS.x],
      ['Discord', cfg.links.discord, ICONS.discord], ['YouTube', cfg.links.youtube, ICONS.youtube]]
    var social = ''
    for (var s = 0; s < socialDefs.length; s++) {
      if (socialDefs[s][1]) social += '<a href="' + socialDefs[s][1] + '" aria-label="' + socialDefs[s][0] + '" rel="noopener">' + socialDefs[s][2] + '</a>'
    }
    el.className = 'site-footer'
    el.innerHTML =
      '<div class="wrap">' +
        '<div class="foot-grid">' +
          '<div class="foot-brand">' +
            '<a class="logo" href="' + go('/') + '">' + ICONS.logo + '<span>BOOKOS</span></a>' +
            '<p class="tagline">' + cfg.tagline + '</p>' +
            (social ? '<div class="foot-social">' + social + '</div>' : '') +
          '</div>' +
          col('Product', [['Features', go('/features.html')], ['Download', go('/download.html')], ['Pricing', go('/pricing.html')], ['Changelog', go('/changelog.html')]]) +
          col('Resources', [['Documentation', go('/documentation/')], ['Help Center', go('/help.html')], ['Getting Started', go('/documentation/getting-started.html')]]) +
          col('Company', [['About', go('/about.html')], ['Contact', cfg.links.contact]]) +
          col('Legal', [['Privacy', go('/privacy.html')], ['Terms', go('/terms.html')], ['Security', go('/security.html')]]) +
        '</div>' +
        '<div class="foot-bottom">' +
          '<span>' + cfg.copyright + '</span>' +
          '<span>Native. Offline-first. Your files, your machine.</span>' +
        '</div>' +
      '</div>'
  }

  // ── Scroll reveals ──────────────────────────────────────────
  function reveals() {
    var els = document.querySelectorAll('.reveal, .philo-line')
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('seen')
      return
    }
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) { entries[j].target.classList.add('seen'); io.unobserve(entries[j].target) }
      }
    }, { threshold: 0.18 })
    for (var k = 0; k < els.length; k++) io.observe(els[k])
  }

  // ── Download buttons from config ────────────────────────────
  function downloads() {
    var btns = document.querySelectorAll('[data-download]')
    for (var i = 0; i < btns.length; i++) {
      (function (btn) {
        var key = btn.getAttribute('data-download')
        var d = cfg.downloads[key]
        if (!d) return
        if (d.available && d.url) {
          btn.setAttribute('href', d.url)
          btn.setAttribute('rel', 'noopener')
        } else {
          btn.classList.add('is-disabled')
          btn.setAttribute('aria-disabled', 'true')
          btn.removeAttribute('href')
          var label = btn.querySelector('[data-dl-label]')
          if (label) label.textContent = 'Coming soon'
          else btn.textContent = 'Coming soon'
          btn.addEventListener('click', function (e) {
            e.preventDefault()
            window.BKNotice(key.charAt(0).toUpperCase() + key.slice(1) + ' builds are in development. Windows is available today.')
          })
        }
      })(btns[i])
    }
    var notes = document.querySelectorAll('[data-dl-platform-note]')
    for (var n = 0; n < notes.length; n++) {
      var d2 = cfg.downloads[notes[n].getAttribute('data-dl-platform-note')]
      if (d2) notes[n].textContent = d2.note
    }
  }

  // ── Pricing from config ─────────────────────────────────────
  function pricing() {
    var host = document.getElementById('pricing-grid')
    if (!host) return
    var html = ''
    for (var i = 0; i < cfg.pricing.plans.length; i++) {
      var plan = cfg.pricing.plans[i]
      html +=
        '<div class="price-card reveal' + (plan.id === 'writer' ? ' featured' : '') + '">' +
          (plan.badge ? '<span class="price-badge">' + plan.badge + '</span>' : '') +
          '<div class="plan-name">' + plan.name + '</div>' +
          '<div class="audience">' + plan.audience + '</div>' +
          '<div class="amount">' + plan.price + '<br><small>' + plan.period + '</small></div>' +
          '<ul>' + plan.highlights.map(function (h) { return '<li>' + h + '</li>' }).join('') + '</ul>' +
          (plan.cta.kind === 'download'
            ? '<a class="btn btn-primary" href="' + go('/download.html') + '">' + plan.cta.label + '</a>'
            : '<button class="btn btn-ghost" disabled>' + plan.cta.label + '</button>') +
        '</div>'
    }
    host.innerHTML = html
    var notice = document.getElementById('pricing-notice')
    if (notice) notice.textContent = cfg.pricing.notice
    reveals()
  }

  // ── FAQ accordion (single-open, keyboard-native <details>) ──
  function faq() {
    var host = document.getElementById('faq-list')
    if (!host) return
    var items = [
      ['What is BookOS?', 'BookOS is a native desktop application that treats a book as a structured system rather than a stack of documents: manuscript, Book Brain (characters, timeline, canon, research), AI agents, version control, and production workflows in one place.'],
      ['Is BookOS an AI writing tool?', 'It is a writing operating system with AI integrated — not the other way around. Everything works without a provider configured; AI is a capability you attach, through your own keys, to speed up work you direct.'],
      ['Can I write an entire book in BookOS?', 'Yes. The editor, navigator, goals, and milestone system are built specifically for long-form: hundreds of thousands of words, many chapters, many revisions.'],
      ['Can I import an existing manuscript?', 'Yes — DOCX, TXT, Markdown, HTML, and EPUB. After import, an analysis pass can propose characters, locations, mysteries, threads and a chapter map for your approval; nothing enters the Book Brain until you accept it.'],
      ['Does BookOS work offline?', 'Fully. Writing, planning, the Book Brain, searches, exports, and backups are all local. Only AI calls touch the network, and only through providers you configure.'],
      ['Can I use my own AI API key?', 'Yes — that is the model. OpenAI, Anthropic, Google, OpenAI-compatible endpoints, and local models (Ollama, LM Studio) connect in Settings → AI Providers. Keys live in your OS credential vault.'],
      ['Which AI models are supported?', 'Any model your connected providers expose, assigned per task slot — writing, reasoning, research, fast passes, embeddings. A built-in offline embedder powers semantic search with no provider at all.'],
      ['What is the Book Brain?', 'The persistent model of your story: canon with explicit lifecycle states, live character states, who knows what, timeline, mysteries and clues, setups and payoffs, relationships, and your notes. Every AI operation reads a surgical packet from it.'],
      ['What are AI agents?', 'Specialists with executable contracts — Writer, Critic, Continuity, Anti-Slop, Research and more — each with declared permissions. They work through workflows that produce reviewable changes to the manuscript, not chat replies.'],
      ['Can I create alternate versions of chapters?', 'Yes. Branch any chapter (or scene, or selection) into an alternate draft; AI alternates can be written onto draft branches. Experiments never touch main until you merge them.'],
      ['What is a Pull Request in BookOS?', 'Substantial AI work arrives as a change proposal: why-this-change reasoning, a prose diff, merge checks, and downstream impact. You accept and merge, request changes, or reject. AI never merges.'],
      ['Can I export my manuscript?', 'DOCX (with a real Word TOC field, headers/footers, bibliography), PDF, EPUB, Markdown, HTML, and TXT — composed from the canonical manuscript at export time.'],
      ['Is my writing private?', 'Your books are folders on your machine — the whole project is readable Markdown plus a local database. Nothing is uploaded by BookOS. When you run AI operations, the task-relevant context packet goes to the provider you chose. Backups never contain keys.'],
      ['Does BookOS replace the author?', 'No — and it is not designed to. BookOS is built to give authors more control, context and leverage: it remembers everything, drafts on demand, checks continuity, and keeps every version. The author remains the author.']
    ]
    var html = ''
    for (var i = 0; i < items.length; i++) {
      html += '<details class="faq-item"><summary>' + items[i][0] + '<span class="ind" aria-hidden="true"></span></summary>' +
        '<div class="faq-body">' + items[i][1] + '</div></details>'
    }
    host.innerHTML = html
    host.addEventListener('toggle', function (e) {
      var t = e.target
      if (t && t.tagName === 'DETAILS' && t.open) {
        var open = host.querySelectorAll('details[open]')
        for (var j = 0; j < open.length; j++) { if (open[j] !== t) open[j].open = false }
      }
    }, true)
  }

  // ── Docs engine (sidebar, article, pager, TOC) ──────────────
  function docsShell() {
    var nav = document.getElementById('docs-nav')
    if (!nav) return
    var sections = []
    for (var i = 0; i < window.DOCS.length; i++) {
      if (sections.indexOf(window.DOCS[i].section) === -1) sections.push(window.DOCS[i].section)
    }
    var current = document.body.getAttribute('data-doc-slug') || ''
    var html = ''
    for (var s = 0; s < sections.length; s++) {
      html += '<div class="dn-section"><div class="dn-head">' + sections[s] + '</div>'
      for (var j = 0; j < window.DOCS.length; j++) {
        var d = window.DOCS[j]
        if (d.section !== sections[s]) continue
        html += '<a href="' + go('/documentation/' + d.slug + '.html') + '"' +
          (d.slug === current ? ' class="active" aria-current="page"' : '') + '>' + d.title + '</a>'
      }
      html += '</div>'
    }
    nav.innerHTML = html
  }

  function docsArticle() {
    var host = document.getElementById('docs-article')
    if (!host) return
    var slug = document.body.getAttribute('data-doc-slug')
    var idx = -1
    for (var i = 0; i < window.DOCS.length; i++) { if (window.DOCS[i].slug === slug) { idx = i; break } }
    var doc = idx >= 0 ? window.DOCS[idx] : null
    if (!doc) { host.innerHTML = '<p>Article not found.</p>'; return }
    var prev = window.DOCS[idx - 1]
    var next = window.DOCS[idx + 1]
    host.innerHTML =
      '<h1>' + doc.title + '</h1>' +
      '<div class="doc-meta">' + doc.section + ' · Updated ' + doc.updated + '</div>' +
      doc.body +
      '<nav class="docs-pager">' +
        (prev ? '<a href="' + go('/documentation/' + prev.slug + '.html') + '"><span class="dir">← Previous</span><div class="t">' + prev.title + '</div></a>' : '<span></span>') +
        (next ? '<a class="next" href="' + go('/documentation/' + next.slug + '.html') + '"><span class="dir">Next →</span><div class="t">' + next.title + '</div></a>'
              : '<a class="next" href="' + go('/help.html') + '"><span class="dir">Next →</span><div class="t">Help Center</div></a>') +
      '</nav>'
    var toc = document.getElementById('docs-toc-list')
    if (toc) {
      var hs = host.querySelectorAll('h2, h3')
      for (var h = 0; h < hs.length; h++) {
        if (!hs[h].id) hs[h].id = 'h-' + h
        var a = document.createElement('a')
        a.href = '#' + hs[h].id
        a.textContent = hs[h].textContent
        if (hs[h].tagName === 'H3') a.className = 'lvl3'
        toc.appendChild(a)
      }
    }
  }

  // ── Documentation search (client-side over DOCS) ────────────
  function search() {
    var input = document.querySelector('[data-doc-search]')
    var out = document.getElementById('search-results')
    if (!input || !out) return
    function strip(html) {
      var d = document.createElement('div')
      d.innerHTML = html
      return (d.textContent || '').replace(/\s+/g, ' ')
    }
    var index = []
    for (var i = 0; i < window.DOCS.length; i++) {
      index.push({ slug: window.DOCS[i].slug, title: window.DOCS[i].title, section: window.DOCS[i].section, text: strip(window.DOCS[i].body) })
    }
    function esc(s) {
      return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] })
    }
    function run() {
      var q = input.value.trim().toLowerCase()
      out.innerHTML = ''
      if (q.length < 2) return
      var terms = q.split(/\s+/)
      var hits = []
      for (var i = 0; i < index.length; i++) {
        var doc = index[i]
        var hay = (doc.title + ' ' + doc.text).toLowerCase()
        var score = 0
        var ok = true
        for (var t = 0; t < terms.length; t++) {
          if (doc.title.toLowerCase().indexOf(terms[t]) >= 0) score += 6
          if (hay.indexOf(terms[t]) >= 0) score += 2
          else { ok = false; break }
        }
        if (ok) hits.push({ doc: doc, score: score })
      }
      hits.sort(function (a, b) { return b.score - a.score })
      hits = hits.slice(0, 8)
      if (hits.length === 0) {
        out.innerHTML = '<div class="search-empty">No results in the documentation. Try the <a href="' + go('/help.html') + '">Help Center</a>.</div>'
        return
      }
      var html = ''
      for (var h = 0; h < hits.length; h++) {
        var d2 = hits[h].doc
        var at = d2.text.toLowerCase().indexOf(terms[0])
        var snippet = at >= 0 ? d2.text.slice(Math.max(0, at - 40), at + 120) : d2.text.slice(0, 140)
        var safe = esc(snippet)
        var pattern = terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }).join('|')
        var marked = safe.replace(new RegExp('(' + pattern + ')', 'gi'), '<mark>$1</mark>')
        html += '<a class="sr-item" href="' + go('/documentation/' + d2.slug + '.html') + '">' +
          '<div class="t"><span class="sec">' + d2.section + '</span>' + d2.title + '</div>' +
          '<div class="s">…' + marked + '…</div></a>'
      }
      out.innerHTML = html
    }
    input.addEventListener('input', run)
    input.addEventListener('keydown', function (e) {
      var items = out.querySelectorAll('.sr-item')
      var active = out.querySelector('.sr-item.active')
      var idx2 = -1
      for (var i = 0; i < items.length; i++) { if (items[i] === active) { idx2 = i; break } }
      if (e.key === 'ArrowDown' && items.length) {
        e.preventDefault()
        if (active) active.classList.remove('active')
        ;(items[Math.min(idx2 + 1, items.length - 1)] || items[0]).classList.add('active')
      } else if (e.key === 'ArrowUp' && items.length) {
        e.preventDefault()
        if (active) active.classList.remove('active')
        ;(items[Math.max(idx2 - 1, 0)] || items[0]).classList.add('active')
      } else if (e.key === 'Enter') {
        var target = active || items[0]
        if (target) window.location.href = target.getAttribute('href')
      } else if (e.key === 'Escape') {
        input.value = ''; run()
      }
    })
    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement ? document.activeElement.tagName : ''
      if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(tag)) {
        e.preventDefault(); input.focus()
      }
    })
  }

  // ── Boot ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    header(); footer(); reveals(); downloads(); pricing(); faq(); docsShell(); docsArticle(); search()
  })
})()
