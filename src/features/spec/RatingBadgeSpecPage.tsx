import RatingBadge from '../../components/RatingBadge'

const RATINGS = ['clean', 'caution', 'avoid'] as const

export default function RatingBadgeSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-primary uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-text-primary mb-sm">RatingBadge</h1>
        <p className="text-body text-text-secondary max-w-[640px]">
          Colour-coded pill that communicates a product's safety rating. Always appears
          alongside the product name — in cards, detail views, and list rows.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg">
          <div className="flex flex-wrap gap-sm">
            {RATINGS.map((r) => (
              <RatingBadge key={r} rating={r} />
            ))}
          </div>
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<RatingBadge rating="clean" />
<RatingBadge rating="caution" />
<RatingBadge rating="avoid" />`}
        </pre>
      </section>

      {/* Sizes */}
      <section id="sizes" className="mb-3xl">
        <h2 className="text-h2 text-text-primary mb-md">Sizes</h2>
        <p className="text-body text-text-secondary mb-lg max-w-[640px]">
          Two sizes. <code>md</code> is the default for product cards and detail views.{' '}
          <code>sm</code> uses micro text for compact contexts like list rows.
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex flex-col gap-lg">
            <div className="flex items-center gap-md">
              <div className="w-[60px] text-small text-text-tertiary">md</div>
              <div className="flex gap-sm">
                {RATINGS.map((r) => (
                  <RatingBadge key={r} rating={r} size="md" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-md">
              <div className="w-[60px] text-small text-text-tertiary">sm</div>
              <div className="flex gap-sm">
                {RATINGS.map((r) => (
                  <RatingBadge key={r} rating={r} size="sm" />
                ))}
              </div>
            </div>
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
                ['All ratings', 'Text meets WCAG AA against its background'],
                ['Colour + text', 'Rating word ("Clean", "Caution", "Avoid") is always present — colour is never the sole indicator'],
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
                ['Announces', 'Reads the rating word directly — "Clean", "Caution", or "Avoid"'],
                ['Role', 'No explicit role — inline text, read in document flow'],
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
