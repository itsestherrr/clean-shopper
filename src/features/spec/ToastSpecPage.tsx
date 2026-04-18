import Toast from '../../components/Toast'

const TYPES = ['success', 'info', 'warning', 'error'] as const

const MESSAGES: Record<typeof TYPES[number], string> = {
  success: 'Product saved to your library.',
  info: 'Ingredient data updated.',
  warning: 'Some ingredients could not be verified.',
  error: 'Failed to load product details.',
}

export default function ToastSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-primary uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-text-primary mb-sm">Toast</h1>
        <p className="text-body text-text-secondary max-w-[640px]">
          Transient notification that appears at the bottom of the screen. Auto-dismisses
          after 4 seconds by default, or can be dismissed manually via the close button.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg">
          <div className="flex flex-col gap-md">
            {TYPES.map((t) => (
              <Toast key={t} type={t} message={MESSAGES[t]} duration={0} />
            ))}
          </div>
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<Toast type="success" message="Product saved to your library." />
<Toast type="info" message="Ingredient data updated." />
<Toast type="warning" message="Some ingredients could not be verified." />
<Toast type="error" message="Failed to load product details." />`}
        </pre>
      </section>

      {/* Variants */}
      <section id="variants" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Variants</h2>
        <p className="text-body text-text-secondary mb-lg max-w-[640px]">
          Four types mapped to the semantic colour system. Each has a colour-coded icon,
          background tint, and matching text colour.
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex flex-col gap-lg">
            {TYPES.map((t) => (
              <div key={t}>
                <p className="text-label text-text-tertiary uppercase mb-sm">{t}</p>
                <Toast type={t} message={MESSAGES[t]} duration={0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Accessibility</h2>
        <div className="space-y-lg max-w-[720px]">
          <div>
            <h3 className="text-h4 text-text-primary mb-sm">Keyboard</h3>
            <dl className="space-y-xs">
              {[
                ['Dismiss button', 'Native button — focusable, Enter/Space activates'],
                ['Auto-dismiss', 'Default 4s; set duration={0} to require manual dismiss'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-text-tertiary">{k}</dt>
                  <dd className="text-body text-text-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-h4 text-text-primary mb-sm">Screen readers</h3>
            <dl className="space-y-xs">
              {[
                ['Dismiss', 'aria-label="Dismiss" on the close button'],
                ['Icon', 'Decorative — does not need alt text; type is conveyed by the message content'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-text-tertiary">{k}</dt>
                  <dd className="text-body text-text-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
