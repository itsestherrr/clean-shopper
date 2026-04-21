import IngredientBar from '../../components/IngredientBar'

const EXAMPLES = [
  { label: 'Mostly clean', counts: { clean: 12, caution: 3, avoid: 1 } },
  { label: 'Mixed', counts: { clean: 6, caution: 5, avoid: 4 } },
  { label: 'Mostly avoid', counts: { clean: 2, caution: 3, avoid: 10 } },
  { label: 'All clean', counts: { clean: 8, caution: 0, avoid: 0 } },
]

export default function IngredientBarSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-amethyst uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-ink-primary mb-sm">IngredientBar</h1>
        <p className="text-body text-ink-secondary max-w-[640px]">
          Stacked horizontal bar showing the clean/caution/avoid breakdown of a product's
          ingredients. Includes a total count heading and a colour-coded legend.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg max-w-[480px]">
          <IngredientBar counts={{ clean: 12, caution: 3, avoid: 1 }} />
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<IngredientBar counts={{ clean: 12, caution: 3, avoid: 1 }} />`}
        </pre>
      </section>

      {/* Data variations */}
      <section id="variations" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Data variations</h2>
        <p className="text-body text-ink-secondary mb-lg max-w-[640px]">
          The bar adapts proportionally to any ingredient distribution. Segments with
          zero count are hidden entirely.
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex flex-col gap-xl">
            {EXAMPLES.map((ex) => (
              <div key={ex.label}>
                <p className="text-label text-ink-tertiary uppercase mb-sm">{ex.label}</p>
                <div className="max-w-[480px]">
                  <IngredientBar counts={ex.counts} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Accessibility</h2>
        <div className="space-y-lg max-w-[720px]">
          <div>
            <h3 className="text-h4 text-ink-primary mb-sm">Color</h3>
            <dl className="space-y-xs">
              {[
                ['Legend', 'Text labels accompany each dot — colour is never the sole indicator'],
                ['Bar segments', 'Adjacent segments are visually distinct; the legend below maps each colour to a count'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-ink-tertiary">{k}</dt>
                  <dd className="text-body text-ink-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-h4 text-ink-primary mb-sm">Screen readers</h3>
            <dl className="space-y-xs">
              {[
                ['Heading', 'h3 announces "Ingredient Breakdown (N)" where N is total count'],
                ['Legend', 'Each legend item reads as "{count} {rating}" — e.g. "12 Clean"'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-ink-tertiary">{k}</dt>
                  <dd className="text-body text-ink-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
