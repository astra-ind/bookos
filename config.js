/* ============================================================
   BookOS — site configuration. Every factual claim, download
   URL, and pricing figure lives here. Update this file only.
   ============================================================ */

var BOOKOS_CONFIG = {
  productName: 'BookOS',
  tagline: 'The operating system for writing books.',
  copyright: '© 2026 BookOS. All rights reserved.',

  // ── Downloads ────────────────────────────────────────────────
  // Leave a url as null to show the platform as "Coming soon".
  downloads: {
    windows: { available: true, url: 'https://github.com/bookos/bookos/releases/latest/download/INKOS-Setup-3.5.0.exe', note: 'Windows 10/11 · 64-bit installer' },
    macos: { available: false, url: null, note: 'In development' },
    linux: { available: false, url: null, note: 'In development' }
  },

  // ── Pricing (configurable; edit here, the pricing page renders it) ──
  pricing: {
    notice: 'Pricing may change during development. AI usage means connecting your own AI provider — BookOS never resells model access.',
    plans: [
      {
        id: 'free',
        name: 'Free',
        audience: 'For exploring BookOS.',
        price: '$0',
        period: 'while in development',
        highlights: [
          'One book, the full editor',
          'Chapters, scenes, notes',
          'Book Brain basics',
          'Markdown · TXT export',
          'All local features, forever'
        ],
        cta: { label: 'Download for Windows', kind: 'download' },
        badge: null
      },
      {
        id: 'writer',
        name: 'Writer',
        audience: 'For serious individual writers.',
        price: 'TBD',
        period: 'planned monthly plan',
        highlights: [
          'Unlimited books & series',
          'Book Brain — full continuity',
          'Version control & branches',
          'All export formats',
          'Milestones & writing goals',
          'AI with your own API keys'
        ],
        cta: { label: 'Not available yet', kind: 'disabled' },
        badge: null
      },
      {
        id: 'studio',
        name: 'Studio',
        audience: 'For advanced AI workflows and larger projects.',
        price: 'TBD',
        period: 'planned monthly plan',
        highlights: [
          'Everything in Writer',
          'AI agents & Autopilot',
          'Skill system & imported skills',
          'Universes — multiple series',
          'Priority support'
        ],
        cta: { label: 'Not available yet', kind: 'disabled' },
        badge: null
      },
      {
        id: 'founder',
        name: 'Founder',
        audience: 'For early supporters of BookOS.',
        price: 'TBD',
        period: 'planned one-time purchase',
        highlights: [
          'Everything in Studio, permanently',
          'Early access to new capabilities',
          'A voice in what gets built next'
        ],
        cta: { label: 'Not available yet', kind: 'disabled' },
        badge: null
      }
    ]
  },

  // ── Links that actually exist ────────────────────────────────
  links: {
    docs: '/documentation/',
    help: '/help.html',
    about: '/about.html',
    contact: 'mailto:hello@bookos.app',
    support: 'mailto:support@bookos.app',
    bugReport: 'mailto:support@bookos.app?subject=Bug%20report',
    featureRequest: 'mailto:support@bookos.app?subject=Feature%20request',
    privacy: '/privacy.html',
    terms: '/terms.html',
    security: '/security.html',
    changelog: '/changelog.html',
    github: null, // set when public
    x: null,
    discord: null,
    youtube: null
  },

  inDevelopment: true
}

window.BOOKOS_CONFIG = BOOKOS_CONFIG
if (typeof module !== 'undefined') module.exports = { BOOKOS_CONFIG }
