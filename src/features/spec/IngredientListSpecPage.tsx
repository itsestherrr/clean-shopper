import IngredientList from '../../components/IngredientList'

const DEMO_INGREDIENTS = [
  { name: 'Coconut Oil', rating: 'clean' as const, reason: 'Plant-derived moisturizer, no processing concerns' },
  { name: 'Sodium Lauryl Sulfate', rating: 'caution' as const, reason: 'Effective surfactant but can irritate sensitive skin' },
  { name: 'Fragrance', rating: 'avoid' as const, reason: 'Undisclosed blend — may contain phthalates or allergens', isUserAvoided: true },
  { name: 'Glycerin', rating: 'clean' as const, reason: 'Natural humectant, well-tolerated' },
  { name: 'Methylparaben', rating: 'avoid' as const, reason: 'Synthetic preservative linked to endocrine disruption' },
]

export default function IngredientListSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-amethyst uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-ink-primary mb-sm">IngredientList</h1>
        <p className="text-body text-ink-secondary max-w-[640px]">
          Colour-coded ingredient breakdown with rating dots, names, and safety
          explanations. Highlights ingredients on the user's personal avoid list.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg max-w-[480px]">
          <IngredientList ingredients={DEMO_INGREDIENTS} />
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<IngredientList
  ingredients={[
    { name: "Coconut Oil", rating: "clean", reason: "..." },
    { name: "Fragrance", rating: "avoid", reason: "...", isUserAvoided: true },
  ]}
/>`}
        </pre>
      </section>

      {/* States */}
      <section id="states" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">States</h2>
        <p className="text-body text-ink-secondary mb-lg max-w-[640px]">
          Loading state shows a skeleton with staggered-width bars. The <code>maxItems</code>{' '}
          prop truncates long lists — useful in card previews.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">Loading</p>
            <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
              <IngredientList ingredients={[]} loading />
            </div>
          </div>
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">maxItems=3</p>
            <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
              <IngredientList ingredients={DEMO_INGREDIENTS} maxItems={3} />
            </div>
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
                ['Rating dots', 'Decorative — the rating reason text provides context'],
                ['Avoid badge', '"In your avoid list" badge uses text, not colour alone'],
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
                ['Heading', 'h4 "Ingredients" labels the list region'],
                ['Each item', 'Reads ingredient name, then rating reason as secondary text'],
                ['Avoid badge', 'Reads "In your avoid list" inline after the ingredient name'],
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
