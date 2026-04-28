import IngredientList from '../../components/IngredientList'

const DEMO_INGREDIENTS = [
  {
    name: 'Fragrance',
    rating: 'avoid' as const,
    reason:
      '"Fragrance" can cover dozens of unlisted compounds, often including known allergens and endocrine disruptors. You marked this in your personal avoid list.',
    isUserAvoided: true,
  },
  {
    name: 'Methylparaben',
    rating: 'avoid' as const,
    reason:
      'A preservative with mild estrogenic activity in lab studies. Banned in some EU contexts for leave-on products.',
    isUserAvoided: true,
  },
  {
    name: 'Phenoxyethanol',
    rating: 'caution' as const,
    reason:
      'A common preservative considered safer than parabens, but flagged for skin irritation at higher concentrations. Generally fine in rinse-off products.',
  },
  {
    name: 'Glycerin',
    rating: 'clean' as const,
    reason:
      'Plant-derived humectant that draws water into the skin. One of the most studied and reliably safe moisturizing ingredients in personal care.',
  },
  {
    name: 'Niacinamide',
    rating: 'clean' as const,
    reason:
      'Vitamin B3 derivative that supports the skin barrier and helps regulate sebum. Strong safety data even at concentrations above what is typical here.',
  },
]

export default function IngredientListSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-amethyst uppercase mb-xs">Component spec · v4</p>
        <h1 className="text-h1 text-ink-primary mb-sm">IngredientList</h1>
        <p className="text-body text-ink-secondary max-w-[640px]">
          Single-column expandable rows. Status pinned in a fixed-width column on
          the left so ingredient names align vertically for fast scanning. Click any
          row to reveal the safety reason. Personal-avoid items get an inline pill.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Overview</h2>
        <IngredientList ingredients={DEMO_INGREDIENTS} />
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto mt-lg">
{`<IngredientList
  ingredients={[
    { name: "Fragrance", rating: "avoid", reason: "...", isUserAvoided: true },
    { name: "Glycerin", rating: "clean", reason: "..." },
  ]}
/>`}
        </pre>
      </section>

      {/* States */}
      <section id="states" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">States</h2>

        <div className="mb-xl">
          <p className="text-label text-ink-tertiary uppercase mb-sm">Hover (light-touch)</p>
          <p className="text-small text-ink-secondary mb-md max-w-[640px]">
            Border darkens (<code>amethyst-40</code>) and bg shifts to <code>cream</code>.
            No transform. No shadow. Hover lift + colored shadow is reserved for
            destination cards (ProductCard, hero CTAs). List rows like ingredients
            sit inside content and need a quiet hover that does not compete.
          </p>
        </div>

        <div className="mb-xl">
          <p className="text-label text-ink-tertiary uppercase mb-sm">Expanded</p>
          <p className="text-small text-ink-secondary mb-md max-w-[640px]">
            Reason text appears below the head, padded to align with the name
            column on desktop. Chevron rotates 90°.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">Loading</p>
            <IngredientList ingredients={[]} loading />
          </div>
          <div>
            <p className="text-label text-ink-tertiary uppercase mb-sm">maxItems=3</p>
            <IngredientList ingredients={DEMO_INGREDIENTS} maxItems={3} />
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Anatomy</h2>
        <ul className="text-body text-ink-secondary space-y-xs list-disc pl-lg max-w-[720px]">
          <li><strong className="text-ink-primary">Status column</strong> — fixed 100px width. Dot + uppercase tier-color label. Pinned left so names align across rows.</li>
          <li><strong className="text-ink-primary">Name</strong> — body / bold / ink-primary. Truncates if long.</li>
          <li><strong className="text-ink-primary">Avoid pill</strong> — inline, only when <code>isUserAvoided</code> is true. Personal preference signal, not a safety rating.</li>
          <li><strong className="text-ink-primary">Chevron</strong> — rotates on expand. Decorative; <code>aria-expanded</code> on the row carries the semantic.</li>
          <li><strong className="text-ink-primary">Body</strong> — appears on expand. Reason copy, optional EWG meta line, padded to align with name column.</li>
        </ul>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Accessibility</h2>
        <div className="space-y-lg max-w-[720px]">
          <div>
            <h3 className="text-h4 text-ink-primary mb-sm">Color</h3>
            <dl className="space-y-xs">
              {[
                ['Rating dot', 'Decorative — paired with the uppercase label text and the reason copy. Color is never the sole signal.'],
                ['Avoid pill', 'Uses both bg tint and uppercase label text. Readable to AT.'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-ink-tertiary">{k}</dt>
                  <dd className="text-body text-ink-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-h4 text-ink-primary mb-sm">Keyboard + screen readers</h3>
            <dl className="space-y-xs">
              {[
                ['Row', 'Renders as <button> inside <li>. Tab to focus, Enter/Space to expand. aria-expanded reflects open state.'],
                ['List semantics', '<ul role="list"> wraps the rows; each row is a list item.'],
                ['Focus ring', 'amethyst, 2px, 2px offset.'],
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
