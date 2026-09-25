/* ============================================================
   BookOS — documentation content. One array, one article per
   route; the docs engine renders sidebar, search, and prev/next
   from this. Keep answers accurate to the shipping product.
   ============================================================ */

var DOCS = [
  // ── Getting Started ─────────────────────────────────────────
  {
    section: 'Getting Started', slug: 'installation', title: 'Installation',
    updated: '2026-09-25',
    body: `
<p>BookOS is a native desktop application. Your books are stored on your own computer, in folders you control.</p>
<h2>Windows</h2>
<ol>
<li>Download <strong>INKOS-Setup-3.5.0.exe</strong> from the <a href="/download.html">Download page</a>.</li>
<li>Run the installer. The wizard lets you choose the install location and creates desktop and Start-menu shortcuts.</li>
<li>Launch <strong>INKOS</strong> from the shortcut. Only one instance runs at a time — launching again focuses the existing window.</li>
</ol>
<h2>Where your books live</h2>
<p>Every book is a <code>.bookos</code> folder containing the complete project: a SQLite working database plus the entire book as human-readable Markdown — chapters, characters, story bible, research, timeline, and tasks. You can open any of those files in a plain text editor, and edits you make there can flow back into the app.</p>
<h2>Requirements</h2>
<ul>
<li>Windows 10 or 11, 64-bit.</li>
<li>No account required. No internet required for writing — AI features use the provider you configure.</li>
</ul>`
  },
  {
    section: 'Getting Started', slug: 'first-project', title: 'Creating your first project',
    updated: '2026-09-25',
    body: `
<p>BookOS organizes work as <strong>Project → Series → Book → Part → Chapter → Scene</strong>. A project can be a single book or an entire universe.</p>
<ol>
<li>Launch BookOS. The home screen lists your projects and recent books.</li>
<li>Choose <strong>New Project</strong> and pick a kind: Book, Series, Universe, or Nonfiction.</li>
<li>Name it and — optionally — add a premise. Universe projects can create their first book in the same step.</li>
<li>Open the book. You land in the editor with the manuscript navigator on the left.</li>
</ol>
<p>A standalone book can be adopted into a project later — nothing is locked in up front.</p>`
  },
  {
    section: 'Getting Started', slug: 'first-book', title: 'Creating a book',
    updated: '2026-09-25',
    body: `
<p>Inside a project, use <strong>Add book</strong> on the Project Dashboard, or create chapters directly in a fresh book. A book carries its constitution — genre, POV, tense, tone, premise, target length — which shapes every AI operation and every export.</p>
<p>Books can be grouped into <strong>parts</strong> (Part I — Before, Part II — Collapse) and every chapter belongs to exactly one place in the spine. Reordering, moving between parts, splitting and merging chapters are all first-class operations with consequence review: the app tells you what a move affects before it happens.</p>`
  },
  {
    section: 'Getting Started', slug: 'first-chapter', title: 'Writing your first chapter',
    updated: '2026-09-25',
    body: `
<ol>
<li>In the manuscript navigator, click <strong>+</strong> on the book to add a chapter, or press the QuickCreate “+” in the sidebar and choose Chapter.</li>
<li>Give it a title. Click into the page and write — the editor autosaves as you go, and the status bar shows save state and word count.</li>
<li>Hover the chapter in the navigator for its metadata card: summary, POV, threads, characters, continuity status.</li>
<li>Right-click the page for the full editor menu: formatting, comments, footnotes, bookmarks, and AI actions.</li>
</ol>
<p>That's the whole loop. Everything else in BookOS — the Book Brain, agents, version control — hangs off this spine.</p>`
  },

  // ── Writing ─────────────────────────────────────────────────
  {
    section: 'Writing', slug: 'editor', title: 'The editor',
    updated: '2026-09-25',
    body: `
<p>The manuscript surface is a true structured document editor — a real document model with transactions, marks and nodes, never a plain text box.</p>
<h2>What's built in</h2>
<ul>
<li><strong>Word-grade formatting:</strong> headings through level 6, block quotes, lists, tables, images, links, code, text color, highlight, super/subscript, font family and size on the selection.</li>
<li><strong>Document styles:</strong> edit a style once (Styles manager) and every paragraph using it updates across the book.</li>
<li><strong>Find &amp; replace:</strong> case-sensitive, whole-word and regular-expression modes with match counting.</li>
<li><strong>Pages view:</strong> true pagination with paper sizes, margins, header/footer fields like <code>{page}</code> and <code>{chapter}</code>, and print support.</li>
<li><strong>Split view:</strong> two chapters side by side (Ctrl+\\).</li>
<li><strong>Typewriter scrolling, zoom, focus mode</strong> — the calm shell for long sessions.</li>
</ul>
<h2>Track changes</h2>
<p>With track changes on, AI edits arrive as pending suggestions — an explicit before/after transaction you accept or reject per item. Nothing touches the manuscript without approval, and every accept first snapshots a restore point.</p>`
  },
  {
    section: 'Writing', slug: 'chapters-scenes', title: 'Chapters & scenes',
    updated: '2026-09-25',
    body: `
<p>Chapters carry number, title, summary, purpose, act, POV, location, story time, status, word count and continuity status. Inside a chapter you can target <strong>scenes</strong> — each with its own planning record: objective, conflict, emotional start/end, turn, consequence, and research dependencies.</p>
<p>The editor's scene selector switches between whole-chapter mode and single-scene mode. Writes flow to the right place and the chapter rejoins automatically. Scenes can be moved across chapters with a consequence preview, and the beat board lets you sketch a scene's beats — planning only, never prose.</p>`
  },
  {
    section: 'Writing', slug: 'notes-goals', title: 'Notes & goals',
    updated: '2026-09-25',
    body: `
<h2>The scratchpad</h2>
<p>Dump any thought without classifying it. Pin what matters — pinned notes travel with every AI request as binding constraints (“never reveal Alex's secret before Chapter 20”). Resolve what's done. Any note can be converted into a character, location, world rule, plot thread, timeline event, mystery, setup, or canon entry — the original note is always preserved, and conversions arrive as proposals, never silent canon.</p>
<h2>Goals & milestones</h2>
<p>The Finish Line turns completion into a first-class objective: a nine-stage milestone ladder auto-awarded from real manuscript state, a finish plan that converts a target date into words-per-day and recalculates instead of guilting, and a “what's next” engine that proposes concrete moves. Finish Mode quiets the whole shell down to one mission line.</p>`
  },

  // ── Book Brain ──────────────────────────────────────────────
  {
    section: 'Book Brain', slug: 'context', title: 'What the Book Brain knows',
    updated: '2026-09-25',
    body: `
<p>The Book Brain is a persistent model of your story: canon, characters and their live states, knowledge (who knows what), timeline, mysteries and clues, setups and payoffs, relationships, research, and author notes.</p>
<p>Every AI operation assembles a <strong>surgical context packet</strong> — constitution, book brief, author constraints, voice model, current state, relevant canon, retrieved passages — with token budgets. The AI reads what the scene needs, not the whole book.</p>
<p><strong>Current State</strong> is the story-now snapshot — where everyone is, what they carry, what's unresolved — rebuilt after every chapter so work resumes instantly, by you or by the AI.</p>`
  },
  {
    section: 'Book Brain', slug: 'characters', title: 'Characters',
    updated: '2026-09-25',
    body: `
<p>Characters are living records: profile, arc, voice notes, relationships with current dynamics, and <strong>states</strong> — location, emotion, goal, injuries, possessions, knowledge — snapshotted as of chapters. The continuity engine reads these states; the editor's Chapter Context panel shows them beside the page; the Context Lens opens them when you select a name in the prose.</p>
<p>Selecting a character's name in the manuscript opens the Lens card: current state, knowledge, secrets, relationships, scene appearances, and your private notes — with actions that act on the manuscript.</p>`
  },
  {
    section: 'Book Brain', slug: 'timeline-world', title: 'Timeline & worldbuilding',
    updated: '2026-09-25',
    body: `
<h2>Timeline</h2>
<p>Two chronologies: <strong>story time</strong> (what happens when in the world) and <strong>revelation order</strong> (what the reader learns when). Chapters carry story-time fields; the continuity engine flags regressions and gaps.</p>
<h2>World & rules</h2>
<p>World rules, locations, and canon records with explicit lifecycle states: <code>CANON · PLAN · POSSIBILITY · QUESTION · DEVIATION · CONFLICT · RETIRED</code>. Plans and possibilities are never silently promoted — the author ratifies what becomes fact. Series-level canon inherits down into every book, with visible per-book overrides.</p>`
  },
  {
    section: 'Book Brain', slug: 'continuity', title: 'Continuity',
    updated: '2026-09-25',
    body: `
<p>The continuity engine runs deterministic audits — timeline regressions, injury and possession regressions, overdue setups, clueless mysteries, POV drift, knowledge-leak risks — plus an AI audit. Findings are <strong>surfaced, never silently repaired</strong>: resolve as canon, mark intentional, or fix the text.</p>
<p>It runs twice: as a background <em>ambient sync</em> a few seconds after you save (folding ⚠ flags into the navigator), and as a packaged pass in the Review Workbench, alongside style lint, prose detectors, canon-intake staleness, and an optional AI critique. Reports are persisted so the manuscript's health becomes a trend.</p>`
  },

  // ── AI ──────────────────────────────────────────────────────
  {
    section: 'AI', slug: 'agents', title: 'AI agents',
    updated: '2026-09-25',
    body: `
<p>BookOS's AI is a runtime of specialist agents with executable contracts — Writer, Critic, Continuity Agent, Anti-Slop, Show-Don't-Tell, Humanization, Character, Genre, Research, Lore Extractor, Librarian, Copy Editor and more. Each declares its purpose, skills, tools, permissions, model slot and temperature. The Critic cannot write prose; the Writer cannot touch canon.</p>
<p><strong>Workflows are declarative step graphs.</strong> Rewrite/Expand/Compress/Revise route through the live-edit layer and land in the manuscript at the selection or caret — as reviewable transactions. Chat discusses; the manuscript receives the writing.</p>`
  },
  {
    section: 'AI', slug: 'agent-config', title: 'Agent configuration',
    updated: '2026-09-25',
    body: `
<p>Every run is persisted and inspectable: per-step status, tokens, duration, summaries, and the final text, in the Agent Activity view. Author intent locks and do-not-change rules (Settings → Autonomy &amp; Canon) are binding constraints injected into every request, outranking all skills.</p>
<p>The <strong>autonomy dial</strong> controls how far the system may go on its own: Manual (ambient AI suppressed), Assisted (the brain maintains itself quietly), Collaborative (agents surface findings as suggestions), Supervised Autopilot (every job queues for your approval), Full Autopilot. The author always ratifies canon and merges change proposals.</p>`
  },
  {
    section: 'AI', slug: 'workflows', title: 'Writing workflows',
    updated: '2026-09-25',
    body: `
<h2>Write Next Chapter</h2>
<p>One command runs the full production pipeline: load state → plan → retrieve context → draft → hostile critique → revise → humanization and slop detectors → continuity audit → version snapshot → canon extraction → state update. You review at the end, and at every decision point in between.</p>
<h2>Selection actions</h2>
<p>Select any passage for Rewrite, Expand, Compress, Show-don't-tell, Tension, Subtext — each runs real orchestrator tasks with full book context. <strong>Branch</strong> writes an alternate version of the passage onto a draft branch; <strong>Check</strong> routes the selection through the continuity agent.</p>`
  },
  {
    section: 'AI', slug: 'autopilot', title: 'Autopilot',
    updated: '2026-09-25',
    body: `
<p>Autopilot is a controlled, observable, resumable production loop — not a prompt button. It loads master context, checks canon and outline, determines the next production unit, plans, generates, validates, commits a version, updates the Book Brain, and decides what comes next.</p>
<p><strong>Modes:</strong> Book (all chapters), Chapter, Outline (plan only, zero prose), Draft (fast exploration), Scene, Revision, Continuity, and Maintenance (refreshes the brain and the readable project files without touching prose).</p>
<p>Every chapter is a checkpoint: pause, resume, retry, cancel, close the app and pick up where it left off. Interrupted runs are detected — you choose Resume or Discard, and committed chapters are never touched. Scheduled sessions (a daily writing hour) respect the autonomy dial; in Supervised mode they wait for your approval.</p>`
  },
  {
    section: 'AI', slug: 'providers', title: 'AI providers & API keys',
    updated: '2026-09-25',
    body: `
<p>BookOS ships no AI subscription. You connect providers you already have: OpenAI, Anthropic, Google, any OpenAI-compatible endpoint, or local models (Ollama, LM Studio).</p>
<ol>
<li>Settings → AI Providers → Add. Paste your key, run <strong>Test</strong>, pick a model from the provider's live list.</li>
<li>Assign models to <strong>task slots</strong>: writing, reasoning, research, fast, embedding — different models for different jobs if you like.</li>
</ol>
<p>Keys live in the OS credential vault (Windows DPAPI / macOS Keychain / libsecret) — never in project files, never in the database, never in backups. Every AI call is logged to a run ledger with tokens and duration. With no provider configured, the app remains fully usable for writing; AI features degrade loudly and honestly, never pretending to have run.</p>`
  },

  // ── Version Control ─────────────────────────────────────────
  {
    section: 'Version Control', slug: 'branches', title: 'Branches',
    updated: '2026-09-25',
    body: `
<p>Every book is a repository. <strong>Main is canon.</strong> An alternate draft is a branch — at book, chapter, scene, or even selection granularity, with content overlays. AI work can be routed to <code>agent/*</code> branches automatically.</p>
<p>Rejected branches are archived, never destroyed: the idea archive. Simulations and what-if explorations can be adopted into draft branches when an idea outgrows the sandbox.</p>`
  },
  {
    section: 'Version Control', slug: 'commits', title: 'Commits & history',
    updated: '2026-09-25',
    body: `
<p>Every meaningful change is a commit: before/after content, author vs AI attribution, risk level, word-delta stats, parent linkage. Automatic snapshots precede merges and dangerous operations — nothing is ever lost.</p>
<p>The contribution graph shows your writing days split author/AI; the chapter heatmap shows where the rewrites concentrate. Version history per chapter supports side-by-side diff and restore.</p>`
  },
  {
    section: 'Version Control', slug: 'pull-requests', title: 'Pull requests',
    updated: '2026-09-25',
    body: `
<p>Substantial AI work arrives as a <strong>change proposal</strong>: title, why-this-change reasoning, before/after prose diff, merge checks (content present, target valid, continuity note), and downstream analysis — “3 later chapters may need review.”</p>
<p>You choose: <strong>Accept &amp; Merge</strong>, <strong>Request Changes</strong> (the proposal stays open for AI revision), or <strong>Reject</strong> (the branch is archived). AI never merges. Conflicts are detected and can be resolved with AI assistance, reviewable before anything lands.</p>`
  },
  {
    section: 'Version Control', slug: 'diff-merge', title: 'Diff & merging',
    updated: '2026-09-25',
    body: `
<p>Diffs are rendered as prose, not code: line-level adds and removes with context, plus semantic similarity scoring on proposals. Merging records a commit and snapshots the pre-merge state; the chapter heatmap and history let you trace any change back to its proposal.</p>
<p>In the editor, AI text lands as a highlighted preview at the cursor — Accept keeps it, Reject restores the original, with a word-level diff summary in the bar.</p>`
  },

  // ── Advanced ────────────────────────────────────────────────
  {
    section: 'Advanced', slug: 'skills', title: 'Skills & imported craft',
    updated: '2026-09-25',
    body: `
<p>Skills are the craft layer: built-ins for fiction, genre, character, pacing, continuity, worldbuilding, plot architecture — and <strong>your own documents</strong>. Import a PDF, DOCX, Markdown or TXT craft guide and BookOS parses, classifies (instructions vs rules vs workflow vs examples), and profiles it, with a fully editable preview before anything activates.</p>
<p>Large sources are chunked, embedded, and retrieved by relevance — never injected wholesale. Skills carry scope (all books / this book), priority, and stage targeting; conflicting directives are flagged, never silently resolved. Priority hierarchy: core safety &gt; book-scoped &gt; imported &gt; builtins. Skills never override author intent or canon.</p>`
  },
  {
    section: 'Advanced', slug: 'project-config', title: 'Project configuration',
    updated: '2026-09-25',
    body: `
<p>Universe projects hold <strong>universe canon</strong> and author notes inherited by every book, with visible per-book overrides the AI receives instead of the original fact. Series bibles hold entities and chronology across books, injected just below the constitution in AI context.</p>
<p>The project folder is the source of truth on disk: <code>Manuscript/</code> as nested Markdown with frontmatter, <code>Characters/</code>, <code>Story/</code>, <code>World/</code>, <code>Timeline/</code>, <code>Research/</code>, <code>Structure/</code>, <code>Tasks/</code>. External edits are detected and flow back in on your confirmation — the files and the app agree, always.</p>`
  },
  {
    section: 'Advanced', slug: 'local-models', title: 'Local models',
    updated: '2026-09-25',
    body: `
<p>Any OpenAI-compatible endpoint works as a provider, which covers Ollama, LM Studio, and most local servers: add a provider with your local base URL (for example <code>http://localhost:11434/v1</code>), test the connection, and assign it to task slots.</p>
<p>A deterministic offline embedder powers semantic search out of the box — no provider needed. With local models for writing and the offline embedder for retrieval, BookOS can run a full AI-assisted workflow with zero cloud dependency.</p>`
  },
  {
    section: 'Advanced', slug: 'export', title: 'Export & backup',
    updated: '2026-09-25',
    body: `
<h2>Export</h2>
<p>DOCX (professional manuscript presets, real Word TOC field, differentiated headers/footers, auto-generated bibliography from your citations), PDF (print-ready), EPUB, Markdown, HTML, TXT. Export reads the canonical manuscript — headers, footers, title page and chapter breaks are composed at export time, never baked into your text.</p>
<h2>Backup</h2>
<p>One-click and pre-operation gzip snapshots with restore. Backups contain your project — never your API keys. And because the book itself is a folder of readable files, your own file backups are backups.</p>`
  }
]

window.DOCS = DOCS
if (typeof module !== 'undefined') module.exports = { DOCS }
