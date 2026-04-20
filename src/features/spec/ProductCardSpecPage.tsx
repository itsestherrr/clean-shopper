import type { ReactNode } from 'react'
import ProductCard from '../../components/ProductCard'

type LockedState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled'

function StateFrame({
  state,
  children,
}: {
  state: LockedState
  children: ReactNode
}) {
  if (state === 'default' || state === 'disabled') {
    return <>{children}</>
  }

  const stateClass = {
    hover: 'spec-force-hover',
    pressed: 'spec-force-pressed',
    focus: 'spec-force-focus',
  }[state]

  return <div className={stateClass}>{children}</div>
}

const DEMO_PRODUCT = {
  name: "Dr. Bronner's Castile Soap",
  brand: "Dr. Bronner's",
  rating: 'clean' as const,
  category: 'Personal Care',
  description: 'Organic, fair trade, no synthetic preservatives or detergents.',
}

const STATE_LABELS: LockedState[] = ['default', 'hover', 'pressed', 'focus', 'disabled']

function StatesStrip({ variant }: { variant: 'default' | 'selectable' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      {STATE_LABELS.map((state) => (
        <div key={state}>
          <p className="text-label text-text-tertiary uppercase mb-sm">{state}</p>
          <StateFrame state={state}>
            <ProductCard
              {...DEMO_PRODUCT}
              variant={variant}
              disabled={state === 'disabled'}
              onClick={() => {}}
              onSelectChange={() => {}}
              onSave={() => {}}
              onAddToList={() => {}}
            />
          </StateFrame>
        </div>
      ))}
    </div>
  )
}

function DoDontPair({
  doLabel,
  dontLabel,
  why,
}: {
  doLabel: string
  dontLabel: string
  why: string
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-sm">
        <div className="border-l-4 border-clean bg-clean-tint rounded-card p-md">
          <p className="text-label text-clean uppercase mb-xs"><span aria-hidden="true">✓</span> Do</p>
          <p className="text-body text-text-primary">{doLabel}</p>
        </div>
        <div className="border-l-4 border-avoid bg-avoid-tint rounded-card p-md">
          <p className="text-label text-avoid uppercase mb-xs"><span aria-hidden="true">✗</span> Don't</p>
          <p className="text-body text-text-primary">{dontLabel}</p>
        </div>
      </div>
      <p className="text-small text-text-tertiary italic">Why: {why}</p>
    </div>
  )
}

function AccessSubSection({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div>
      <h3 className="text-h4 text-text-primary mb-sm">{title}</h3>
      <dl className="space-y-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
            <dt className="text-small text-text-tertiary">{k}</dt>
            <dd className="text-body text-text-secondary">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'variants', label: 'Variants' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'states', label: 'States' },
  { id: 'do-dont', label: 'Do / Don\'t' },
  { id: 'accessibility', label: 'Accessibility' },
]

export default function ProductCardSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-primary uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-text-primary mb-sm">ProductCard</h1>
        <p className="text-body text-text-secondary max-w-[640px]">
          Displays a product summary with name, brand, rating, category, and description. Used
          in search results, the product library, comparison pickers, and shopping list views.
        </p>
        <nav className="flex gap-md mt-md flex-wrap">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-small text-text-secondary hover:text-primary transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

        {/* Overview */}
        <section id="overview" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Overview</h2>
          <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg">
            <div className="max-w-[360px]">
              <ProductCard
                name="Dr. Bronner's Pure Castile Soap"
                brand="Dr. Bronner's"
                rating="clean"
                category="Personal Care"
                description="Organic, fair trade, no synthetic preservatives or detergents. EWG Verified."
                onSave={() => {}}
                onAddToList={() => {}}
                onClick={() => {}}
              />
            </div>
          </div>
          <p className="text-label text-text-tertiary uppercase mb-sm">Loading</p>
          <div className="max-w-[360px] mb-lg">
            <ProductCard
              loading
              name=""
              brand=""
              rating="clean"
              category=""
              description=""
            />
          </div>
          <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<ProductCard
  name="Dr. Bronner's Pure Castile Soap"
  brand="Dr. Bronner's"
  rating="clean"
  category="Personal Care"
  description="Organic, fair trade, no synthetic preservatives or detergents."
  onSave={handleSave}
  onAddToList={handleAddToList}
  onClick={handleOpenDetail}
/>`}
          </pre>
        </section>

        {/* Variants */}
        <section id="variants" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Variants</h2>
          <p className="text-body text-text-secondary mb-lg max-w-[640px]">
            Two variants. <code>default</code> opens a detail view on click. <code>selectable</code>{' '}
            turns the card into a selection control for comparison pickers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div>
              <p className="text-label text-text-tertiary uppercase mb-sm">default</p>
              <ProductCard
                name="Dr. Bronner's Pure Castile Soap"
                brand="Dr. Bronner's"
                rating="clean"
                category="Personal Care"
                description="Organic, fair trade, no synthetic preservatives or detergents."
                onSave={() => {}}
                onAddToList={() => {}}
                onClick={() => {}}
              />
            </div>
            <div>
              <p className="text-label text-text-tertiary uppercase mb-sm">selectable</p>
              <ProductCard
                variant="selectable"
                selected={true}
                onSelectChange={() => {}}
                name="Dr. Bronner's Pure Castile Soap"
                brand="Dr. Bronner's"
                rating="clean"
                category="Personal Care"
                description="Organic, fair trade, no synthetic preservatives or detergents."
              />
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section id="sizes" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Sizes</h2>
          <p className="text-body text-text-secondary mb-lg max-w-[640px]">
            Two sizes. <code>default</code> is used in search result grids and the product library.{' '}
            <code>compact</code> drops description and footer for shopping list rows and library scan views.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div>
              <p className="text-label text-text-tertiary uppercase mb-sm">default</p>
              <ProductCard
                name="Dr. Bronner's Pure Castile Soap"
                brand="Dr. Bronner's"
                rating="clean"
                category="Personal Care"
                description="Organic, fair trade, no synthetic preservatives or detergents."
                onClick={() => {}}
              />
            </div>
            <div>
              <p className="text-label text-text-tertiary uppercase mb-sm">compact</p>
              <div className="flex flex-col gap-sm">
                <ProductCard
                  size="compact"
                  name="Dr. Bronner's Pure Castile Soap"
                  brand="Dr. Bronner's"
                  rating="clean"
                  category="Personal Care"
                  description=""
                  onClick={() => {}}
                />
                <ProductCard
                  size="compact"
                  name="Ethique Solid Shampoo Bar"
                  brand="Ethique"
                  rating="clean"
                  category="Personal Care"
                  description=""
                  onClick={() => {}}
                />
                <ProductCard
                  size="compact"
                  name="Mrs. Meyer's Clean Day Dish Soap"
                  brand="Mrs. Meyer's"
                  rating="caution"
                  category="Home Cleaning"
                  description=""
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </section>

        {/* States */}
        <section id="states" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">States</h2>
          <p className="text-body text-text-secondary mb-lg max-w-[640px]">
            Interactive states for each variant. The default card in each strip is live — hover
            or tab to it. The rest are visually locked for side-by-side comparison. Selectable
            is shown unselected so hover, pressed, and focus effects are visible; see Variants
            above for the selected appearance.
          </p>

          <div className="mb-xl">
            <p className="text-label text-primary uppercase mb-md">Default variant</p>
            <StatesStrip variant="default" />
          </div>

          <div>
            <p className="text-label text-primary uppercase mb-md">Selectable variant</p>
            <StatesStrip variant="selectable" />
          </div>
        </section>

        {/* Do/Don't */}
        <section id="do-dont" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Do / Don't</h2>
          <div className="space-y-xl">
            <DoDontPair
              doLabel="Use default size in search result grids and product library"
              dontLabel="Use default in a narrow sidebar list — use compact"
              why="Default's 3-line description needs horizontal room; in a narrow column it wraps to 6 lines and collapses visually."
            />
            <DoDontPair
              doLabel="Use selectable variant for comparison pickers"
              dontLabel="Wrap a default ProductCard in your own checkbox layout"
              why="Click targets fight each other — the card's onClick and your outer checkbox click both fire. Use the native variant."
            />
            <DoDontPair
              doLabel="Let compact drop the description"
              dontLabel="Override compact to force description back in"
              why="Compact is a deliberate density decision for scanning, not a size fallback. If you need description, use default."
            />
            <DoDontPair
              doLabel="Pair saved={true} with an onSave callback"
              dontLabel="Render a saved-state card without a handler"
              why="Users see the filled heart, click it to unsave, nothing happens, they file a bug."
            />
          </div>
        </section>

        {/* Accessibility */}
        <section id="accessibility" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Accessibility</h2>
          <div className="space-y-lg max-w-[720px]">
            <AccessSubSection
              title="Keyboard"
              rows={[
                ['Default variant', 'role="button", tabIndex 0, Enter/Space activates onClick'],
                ['Selectable variant', 'role="checkbox" with aria-checked, Enter/Space toggles selection'],
                ['Disabled', 'Removed from tab order (tabIndex -1), aria-disabled="true", role omitted'],
                ['Inner buttons', 'Save and add-to-list have their own tab stops'],
              ]}
            />
            <AccessSubSection
              title="Focus"
              rows={[
                ['Ring', '2px primary outline with 2px offset'],
                ['Trigger', 'focus-visible only — keyboard nav, not mouse click'],
              ]}
            />
            <AccessSubSection
              title="Screen readers"
              rows={[
                ['Default announces', '"{name}, by {brand}, rated {rating}, category {category}. Button."'],
                ['Selectable announces', '"{name}, by {brand}, rated {rating}. Checkbox, {checked|not checked}."'],
                ['StatusBadge', 'Speaks its rating word ("Clean", "Caution", "Avoid"), not just color'],
                ['Save button', 'aria-label="Save to library" or "Remove from library"'],
              ]}
            />
            <AccessSubSection
              title="Color contrast"
              rows={[
                ['Body text', 'Meets WCAG AA'],
                ['Focus ring', 'Meets 3:1 against surface-bg'],
                ['Rating pills', 'Meet AA via the design tokens'],
              ]}
            />
            <AccessSubSection
              title="Motion"
              rows={[
                ['Reduced motion', 'Respects prefers-reduced-motion: reduce'],
                ['Effect', 'Hover shadow transition and pressed scale disabled for users who prefer no motion'],
              ]}
            />
          </div>
        </section>
    </>
  )
}
