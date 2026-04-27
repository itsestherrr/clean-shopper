import EmptyState from '../../components/EmptyState'
import Button from '../../components/Button'

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z"
    />
  </svg>
)

const MagnifierSlashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
    <path strokeLinecap="round" d="M8.5 11h5" />
  </svg>
)

export default function EmptyStateSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-amethyst uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-ink-primary mb-sm">EmptyState</h1>
        <p className="text-body text-ink-secondary max-w-[640px]">
          Surface for &ldquo;no content yet&rdquo; moments — empty Library, empty Search results, and any
          future &ldquo;you have nothing here&rdquo; state. A framed surface card with a stroke-style icon,
          title, optional description, and optional action.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Overview</h2>
        <div className="bg-surface-bg p-xl rounded-card mb-lg">
          <EmptyState
            icon={<HeartIcon />}
            title="No saved products yet"
            description="Tap the heart on any product to save it here."
          />
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<EmptyState
  icon={<HeartIcon />}
  title="No saved products yet"
  description="Tap the heart on any product to save it here."
/>`}
        </pre>
      </section>

      {/* Real consumers */}
      <section id="consumers" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">In context</h2>
        <p className="text-body text-ink-secondary mb-lg max-w-[640px]">
          The two surfaces using EmptyState today. Both omit an action — the design note in the
          deep spec flags this as a gap to revisit.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">Library — empty saved list</p>
            <EmptyState
              icon={<HeartIcon />}
              title="No saved products yet"
              description="Tap the heart on any product to save it here."
            />
          </div>
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">Search — no results</p>
            <EmptyState
              icon={<MagnifierSlashIcon />}
              title="No products found"
              description='No results for "retinol cream". Try a different keyword or adjust filters.'
            />
          </div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Variants</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">Title only</p>
            <EmptyState icon={<HeartIcon />} title="No saved products yet" />
          </div>
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">Title + description</p>
            <EmptyState
              icon={<HeartIcon />}
              title="No saved products yet"
              description="Tap the heart on any product to save it here."
            />
          </div>
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">With action (future)</p>
            <EmptyState
              icon={<HeartIcon />}
              title="No saved products yet"
              description="Tap the heart on any product to save it here."
              action={<Button variant="primary" size="md">Browse products</Button>}
            />
          </div>
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">No icon</p>
            <EmptyState
              title="No saved products yet"
              description="Tap the heart on any product to save it here."
            />
          </div>
        </div>
      </section>

      {/* Anti-patterns */}
      <section id="anti-patterns" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Anti-patterns</h2>
        <ul className="space-y-sm max-w-[640px]">
          {[
            'Don\u2019t use emoji — they don\u2019t theme, sizing is unpredictable, and they pull weight away from the title.',
            'Don\u2019t add brand signature here (asym shadow, lime accent, amethyst disc). Empty isn\u2019t where the brand should sing.',
            'Don\u2019t stack EmptyStates inside other EmptyStates. Only the innermost empty container renders this component.',
            'Don\u2019t use it for loading or error — those are distinct concepts and need different treatment.',
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
          <div className="grid grid-cols-[80px_1fr] gap-md">
            <dt className="text-small text-ink-tertiary">ES-01</dt>
            <dd className="text-body text-ink-secondary">
              Visibility → <strong className="text-ink-primary">B · Framed surface card</strong> (anchored,
              neutral, no signature; saves the brand&rsquo;s loudest treatment for places where it carries weight).
            </dd>
          </div>
        </dl>
      </section>
    </>
  )
}
