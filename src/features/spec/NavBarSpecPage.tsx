export default function NavBarSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-amethyst uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-ink-primary mb-sm">NavBar</h1>
        <p className="text-body text-ink-secondary max-w-[640px]">
          Global chrome — fixed to the top of every authenticated page. Logo + Home + Browse text
          links on the left, a global SearchInput centered as the primary action, and Favorites +
          Account utilities on the right. Quiet by design — no active indicator, no brand
          signature beyond the wordmark.
        </p>
      </header>

      {/* Note */}
      <section className="mb-3xl">
        <div className="bg-amethyst-5 border-[1.5px] border-surface-divider rounded-card p-lg max-w-[720px]">
          <p className="text-body text-ink-primary">
            <strong>NavBar is rendered live at the top of this page.</strong> Look up — that&rsquo;s
            the component. This spec page documents structure, behavior, and decisions; for
            interactive states (account dropdown, search submit), use the real bar above.
          </p>
        </div>
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Anatomy</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <pre className="text-small text-ink-secondary overflow-x-auto leading-relaxed">{`Desktop (≥768px)
┌──────────────────────────────────────────────────────────────────────┐
│  Clean Shopper   Home  Browse     [   🔍  Search…   ]     ♡   [EO]   │
└──────────────────────────────────────────────────────────────────────┘
   wordmark        text links          centered search        utilities
                                       (max-w 560px)

Mobile (<768px)
┌──────────────────────────────────┐
│  Clean Shopper        ♡   [EO]   │
│  [   🔍  Search…             ]   │
└──────────────────────────────────┘
`}</pre>
        </div>
      </section>

      {/* Search behavior */}
      <section id="search" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Search behavior (N-06)</h2>
        <p className="text-body text-ink-secondary mb-lg max-w-[720px]">
          Query state lives in the URL — <code>?q=…</code>. NavBar mirrors it with local state for
          input feel.
        </p>
        <dl className="space-y-md max-w-[720px]">
          {[
            ['Off /search, type', 'Local state updates only. URL unchanged.'],
            ['Off /search, Enter / submit', 'Routes to /search?q=value.'],
            ['On /search, type', 'URL ?q= updates live (replace), results filter every keystroke.'],
            ['Clear (×)', 'Sets ?q= to empty without changing the route.'],
            ['Back / forward', 'URL is source of truth — input rehydrates from ?q=.'],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[220px_1fr] gap-md">
              <dt className="text-small text-ink-tertiary">{k}</dt>
              <dd className="text-body text-ink-secondary">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Account dropdown */}
      <section id="account" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Account dropdown (N-04)</h2>
        <p className="text-body text-ink-secondary mb-lg max-w-[720px]">
          Click the avatar in the top-right of the live NavBar to see the dropdown. Initials are
          derived from the email local-part (e.g. <code>esther.oh@…</code> → <code>EO</code>).
        </p>
        <dl className="space-y-md max-w-[720px]">
          {[
            ['Trigger', '36px avatar circle, amethyst gradient, cream initials'],
            ['Menu', '220px min, divider border, flat amethyst shadow, anchored top-right'],
            ['Items', 'Email block · Sign out (room for Preferences later)'],
            ['Dismiss', 'Click outside · Escape · route change'],
            ['ARIA', 'aria-haspopup="menu", aria-expanded, role="menu", items role="menuitem"'],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
              <dt className="text-small text-ink-tertiary">{k}</dt>
              <dd className="text-body text-ink-secondary">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Anti-patterns */}
      <section id="anti-patterns" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Anti-patterns</h2>
        <ul className="space-y-sm max-w-[720px]">
          {[
            'Don\u2019t add an active indicator to Home / Browse. Page heading does that job.',
            'Don\u2019t add icons to text page links. Icons are reserved for utilities (Favorites, Account).',
            'Don\u2019t add brand-signature treatments to the wordmark. Brand sings on ProductCard / Buttons / AccentBadge.',
            'Don\u2019t render SearchInput inside individual pages. Search is global; pages read ?q= and render results.',
            'Don\u2019t put nav destinations behind the avatar dropdown. Account actions only.',
          ].map((s) => (
            <li key={s} className="text-body text-ink-secondary flex gap-sm">
              <span className="text-avoid">✗</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Decisions */}
      <section id="decisions" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Decisions</h2>
        <dl className="space-y-md max-w-[720px]">
          {[
            ['N-01', 'Icon system → SVG, but only on right-side utilities (Favorites + Account). Home + Browse are plain text.'],
            ['N-02', 'Active indicator → none. Page heading communicates location.'],
            ['N-03', 'Mobile pattern → stacked rows: logo + utilities, then dedicated search row.'],
            ['N-04', 'Account → avatar circle + dropdown.'],
            ['N-05', 'Brand mark → plain wordmark.'],
            ['N-06', 'Search placement → global in NavBar; URL-owned ?q= state.'],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[80px_1fr] gap-md">
              <dt className="text-small text-ink-tertiary">{k}</dt>
              <dd className="text-body text-ink-secondary">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
