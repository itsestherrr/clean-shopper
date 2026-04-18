import Badge from '../../components/Badge'

const VARIANTS = ['neutral', 'clean', 'caution', 'avoid', 'accent'] as const

export default function BadgeSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-primary uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-text-primary mb-sm">Badge</h1>
        <p className="text-body text-text-secondary max-w-[640px]">
          Categorisation label used to tag products, ingredients, and list items. Always
          read-only — badges communicate status, not actions.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg">
          <div className="flex flex-wrap gap-sm">
            {VARIANTS.map((v) => (
              <Badge key={v} variant={v}>
                {v === 'neutral' ? 'Personal Care' : v.charAt(0).toUpperCase() + v.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<Badge variant="neutral">Personal Care</Badge>
<Badge variant="clean">Clean</Badge>
<Badge variant="caution">Caution</Badge>
<Badge variant="avoid">Avoid</Badge>
<Badge variant="accent">Accent</Badge>`}
        </pre>
      </section>

      {/* Variants */}
      <section id="variants" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Variants</h2>
        <p className="text-body text-text-secondary mb-lg max-w-[640px]">
          Five colour variants. <code>neutral</code> is the default for category tags.
          The semantic variants (<code>clean</code>, <code>caution</code>, <code>avoid</code>)
          match the rating system. <code>accent</code> highlights featured or promoted content.
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex flex-col gap-md">
            {VARIANTS.map((v) => (
              <div key={v} className="flex items-center gap-md">
                <Badge variant={v}>
                  {v === 'neutral' ? 'Personal Care' : v.charAt(0).toUpperCase() + v.slice(1)}
                </Badge>
                <p className="text-small text-text-tertiary">
                  <code>{v}</code>
                </p>
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
            <h3 className="text-h4 text-text-primary mb-sm">Color contrast</h3>
            <dl className="space-y-xs">
              {[
                ['All variants', 'Text meets WCAG AA against its background tint'],
                ['Neutral', 'text-tertiary on surface-muted — 4.6:1'],
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
                ['Role', 'No explicit role — inline text content, read in document flow'],
                ['Colour meaning', 'Variant colour reinforces the text label, never the sole indicator'],
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
