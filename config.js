/* ============================================================
   BookOS — site configuration. Every factual claim, download
   URL, and pricing figure lives here. Update this file only.
   ============================================================ */

var BOOKOS_CONFIG = {
  productName: 'BookOS',
  tagline: 'The operating system for writing books.',
  copyright: '© 2026 BookOS. All rights reserved.',

  // ── Downloads ────────────────────────────────────────────────
  downloads: {
    windows: { available: true, url: 'https://github.com/bookos/bookos/releases/latest/download/INKOS-Setup-3.5.0.exe', note: 'Windows 10/11 · 64-bit installer' },
    macos: { available: false, url: null, note: 'In development' },
    linux: { available: false, url: null, note: 'In development' }
  },

  // ── Pricing ──────────────────────────────────────────────────
  pricing: {
    notice: 'BookOS is currently in beta. Annual plans include roughly two months free. BookOS Credits are a value-based AI allowance, not tokens; BYOK is supported on every plan.',
    plans: [
      {
        id: 'free', name: 'Free', audience: 'For trying BookOS.', price: '₹0', period: 'forever', badge: null,
        highlights: ['1 universe · 1 book · 10 chapters', 'Core manuscript editor', 'Markdown / DOCX import', 'PDF export', 'Basic Book Brain and continuity', 'Limited BookOS AI · BYOK supported', 'Manual snapshots'],
        cta: { label: 'Download for Windows', kind: 'download' }
      },
      {
        id: 'writer', name: 'Writer', audience: 'For serious hobbyists, students and first books.', price: '₹299', period: 'per month · ₹2,990 annually', badge: null,
        highlights: ['5 universes · 5 books', 'Unlimited chapters and scenes', 'Full Book Brain and continuity ledger', 'AI chat, rewrite, brainstorm and critique', 'Git-like history, branches and alternate scenes', 'Research library and PDF import', 'Small included AI allowance · BYOK'],
        cta: { label: 'Coming soon', kind: 'disabled' }
      },
      {
        id: 'author', name: 'Author', audience: 'Everything from idea to finished manuscript.', price: '₹699', period: 'per month · ₹6,990 annually', badge: 'Most popular',
        highlights: ['Unlimited universes, series, books and chapters', 'Advanced Book Brain and knowledge graph', 'Full AI agent framework and custom agents', 'AI edits directly in the manuscript', 'Autopilot for chapters and scenes', 'Git-like branches, diffs and pull requests', '₹700 BookOS Credits monthly · BYOK'],
        cta: { label: 'Coming soon', kind: 'disabled' }
      },
      {
        id: 'studio', name: 'Studio', audience: 'For authors, publishers and writing teams.', price: '₹1,499', period: 'per month · ₹14,990 annually', badge: null,
        highlights: ['Everything in Author', 'Multiple writers, editors and beta readers', 'Team permissions, comments and assignments', 'Production pipelines and scheduled AI', 'Multi-agent orchestration', 'Full-book and series intelligence', '₹1,800 BookOS Credits monthly · BYOK'],
        cta: { label: 'Coming soon', kind: 'disabled' }
      }
    ]
  },

  links: {
    docs: '/documentation/', help: '/help.html', about: '/about.html',
    contact: 'mailto:hello@bookos.app', support: 'mailto:support@bookos.app',
    bugReport: 'mailto:support@bookos.app?subject=Bug%20report',
    featureRequest: 'mailto:support@bookos.app?subject=Feature%20request',
    privacy: '/privacy.html', terms: '/terms.html', security: '/security.html',
    changelog: '/changelog.html', github: null, x: null, discord: null, youtube: null
  },
  inDevelopment: true
}

window.BOOKOS_CONFIG = BOOKOS_CONFIG
if (typeof module !== 'undefined') module.exports = { BOOKOS_CONFIG }

// Shared brand polish: use the supplied logo in the generated chrome and favicon.
(function () {
  var root = window.SITE_ROOT || ''
  var logo = root + '..1.png'
  var marked = false
  function applyBrand() {
    var headers = document.querySelectorAll('.site-header')
    for (var i = 0; i < headers.length; i++) {
      var links = headers[i].querySelectorAll('.logo')
      for (var j = 0; j < links.length; j++) {
        if (!links[j].querySelector('img')) {
          var label = links[j].querySelector('span')
          links[j].insertBefore(Object.assign(document.createElement('img'), { src: logo, alt: '', width: 24, height: 24 }), label)
          var icon = links[j].querySelector('svg')
          if (icon) icon.remove()
        }
      }
      if ((location.pathname === '/' || /\/index\.html$/.test(location.pathname)) && !headers[i].querySelector('.beta-banner')) {
        var beta = document.createElement('div')
        beta.className = 'beta-banner'
        beta.textContent = 'CURRENTLY IN BETA'
        headers[i].appendChild(beta)
      }
    }
    var grids = document.querySelectorAll('#pricing-grid')
    for (var g = 0; g < grids.length; g++) {
      var cards = grids[g].querySelectorAll('.price-card')
      for (var c = 0; c < cards.length; c++) cards[c].classList.toggle('featured', c === 2)
    }
    if (!marked) {
      var style = document.createElement('style')
      style.textContent = '.logo img{object-fit:contain;width:24px;height:24px}.beta-banner{padding:8px 20px;text-align:center;background:var(--accent);color:#fff6ec;font:700 11px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase}.site-header .beta-banner{border-top:1px solid color-mix(in srgb,var(--paper) 20%,transparent)}'
      document.head.appendChild(style)
      var favicon = document.createElement('link')
      favicon.rel = 'icon'; favicon.type = 'image/png'; favicon.href = logo
      document.head.appendChild(favicon)
      marked = true
    }
  }
  new MutationObserver(applyBrand).observe(document.documentElement, { childList: true, subtree: true })
  if (document.readyState !== 'loading') applyBrand()
  else document.addEventListener('DOMContentLoaded', applyBrand)
})()
