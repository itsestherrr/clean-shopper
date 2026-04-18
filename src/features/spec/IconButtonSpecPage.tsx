import IconButton from '../../components/IconButton'

export default function IconButtonSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-primary uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-text-primary mb-sm">IconButton</h1>
        <p className="text-body text-text-secondary max-w-[640px]">
          Circular button for icon-only actions like save, add-to-list, close, and dismiss.
          Always requires an <code>ariaLabel</code> since there is no visible text.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg">
          <div className="flex gap-md items-center">
            <IconButton icon="♡" onClick={() => {}} ariaLabel="Save to library" />
            <IconButton icon="＋" onClick={() => {}} ariaLabel="Add to list" />
            <IconButton icon="×" onClick={() => {}} variant="ghost" ariaLabel="Close" />
          </div>
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<IconButton icon="♡" onClick={handleSave} ariaLabel="Save to library" />
<IconButton icon="＋" onClick={handleAdd} ariaLabel="Add to list" />
<IconButton icon="×" onClick={handleClose} variant="ghost" ariaLabel="Close" />`}
        </pre>
      </section>

      {/* Variants */}
      <section id="variants" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Variants</h2>
        <p className="text-body text-text-secondary mb-lg max-w-[640px]">
          Two variants. <code>default</code> has a muted background for standalone actions.{' '}
          <code>ghost</code> is transparent — used inside other components like Modal headers
          and ProductCard footers where the parent provides visual context.
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex flex-col gap-lg">
            <div>
              <p className="text-label text-text-tertiary uppercase mb-sm">default</p>
              <div className="flex gap-md items-center">
                <IconButton icon="♡" onClick={() => {}} ariaLabel="Save" />
                <IconButton icon="♡" onClick={() => {}} ariaLabel="Save (active)" active />
                <IconButton icon="♡" onClick={() => {}} ariaLabel="Save (disabled)" disabled />
              </div>
              <p className="text-small text-text-tertiary mt-xs">Resting, active, disabled</p>
            </div>
            <div>
              <p className="text-label text-text-tertiary uppercase mb-sm">ghost</p>
              <div className="flex gap-md items-center">
                <IconButton icon="×" onClick={() => {}} variant="ghost" ariaLabel="Close" />
                <IconButton icon="×" onClick={() => {}} variant="ghost" ariaLabel="Close (active)" active />
                <IconButton icon="×" onClick={() => {}} variant="ghost" ariaLabel="Close (disabled)" disabled />
              </div>
              <p className="text-small text-text-tertiary mt-xs">Resting, active, disabled</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Sizes</h2>
        <p className="text-body text-text-secondary mb-lg max-w-[640px]">
          Two sizes. <code>md</code> (36px) is the default touch target. <code>sm</code> (28px)
          is for tight layouts like card footers.
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex flex-col gap-lg">
            <div className="flex items-center gap-md">
              <div className="w-[60px] text-small text-text-tertiary">md</div>
              <IconButton icon="♡" onClick={() => {}} ariaLabel="Save" />
              <IconButton icon="×" onClick={() => {}} variant="ghost" ariaLabel="Close" />
            </div>
            <div className="flex items-center gap-md">
              <div className="w-[60px] text-small text-text-tertiary">sm</div>
              <IconButton icon="♡" onClick={() => {}} ariaLabel="Save" size="sm" />
              <IconButton icon="×" onClick={() => {}} variant="ghost" ariaLabel="Close" size="sm" />
            </div>
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
                ['Focus', 'focus-visible ring — 2px primary outline with 2px offset'],
                ['Activation', 'Native button — Enter and Space fire onClick'],
                ['Disabled', 'HTML disabled attribute removes from tab order'],
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
                ['Label', 'ariaLabel prop is required — no visible text to fall back on'],
                ['Active state', 'Visually communicated through colour; consider toggling the label (e.g. "Save" / "Remove from library")'],
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
