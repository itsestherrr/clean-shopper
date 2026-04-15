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
  if (state === 'default') {
    return <>{children}</>
  }

  if (state === 'disabled') {
    // Disabled is a real prop on ProductCard, not a visual override.
    // The parent passes disabled through on the child card directly.
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

const STATE_COLUMNS: LockedState[] = ['default', 'hover', 'pressed', 'focus', 'disabled']

function StatesRow({
  size,
  variant,
}: {
  size: 'default' | 'compact'
  variant: 'default' | 'selectable'
}) {
  return (
    <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-sm items-center mb-md">
      <p className="text-label text-text-tertiary uppercase text-right pr-sm">
        {size === 'default' ? 'MD' : 'SM'}
      </p>
      {STATE_COLUMNS.map((state) => (
        <div key={state} className="bg-surface-muted rounded-card p-sm flex items-center justify-center min-h-[180px]">
          <StateFrame state={state}>
            <ProductCard
              {...DEMO_PRODUCT}
              size={size}
              variant={variant}
              selected={variant === 'selectable'}
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

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'variants', label: 'Variants' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'states', label: 'States' },
  { id: 'loading', label: 'Loading' },
  { id: 'interaction', label: 'Interaction patterns' },
  { id: 'do-dont', label: 'Do / Don\'t' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'composition', label: 'Composition' },
  { id: 'props', label: 'Props' },
  { id: 'changelog', label: 'Changelog' },
]

export default function ProductCardSpecPage() {
  return (
    <div className="flex gap-2xl max-w-[1200px]">
      {/* Sticky TOC */}
      <aside className="w-[180px] shrink-0 sticky top-2xl self-start hidden lg:block">
        <p className="text-label text-text-tertiary uppercase mb-sm">On this page</p>
        <nav className="flex flex-col gap-xs">
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
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-2xl">
          <p className="text-label text-primary uppercase mb-xs">Component spec</p>
          <h1 className="text-h1 text-text-primary mb-sm">ProductCard</h1>
          <p className="text-body text-text-secondary max-w-[640px]">
            Displays a product summary with name, brand, rating, category, and description. Used
            in search results, the product library, comparison pickers, and shopping list views.
          </p>
        </header>

        {/* Overview */}
        <section id="overview" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Overview</h2>
          <div className="bg-surface-muted rounded-card p-xl mb-lg">
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
                  description="Organic, fair trade, no synthetic preservatives or detergents."
                  onClick={() => {}}
                />
                <ProductCard
                  size="compact"
                  name="Ethique Solid Shampoo Bar"
                  brand="Ethique"
                  rating="clean"
                  category="Personal Care"
                  description="Zero-waste, palm oil free."
                  onClick={() => {}}
                />
                <ProductCard
                  size="compact"
                  name="Mrs. Meyer's Clean Day Dish Soap"
                  brand="Mrs. Meyer's"
                  rating="caution"
                  category="Home Cleaning"
                  description="Mostly plant-derived but contains methylisothiazolinone."
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
            All variants across all sizes and interactive states. The cells in the Default column are
            real live ProductCards — hover them with your mouse, tab to them with the keyboard. The
            other columns are visually locked into one state for comparison.
          </p>

          <div className="mb-xl">
            <p className="text-label text-primary uppercase mb-sm">Default variant</p>
            <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-sm mb-sm">
              <div />
              {STATE_COLUMNS.map((s) => (
                <p key={s} className="text-label text-text-tertiary uppercase text-center">
                  {s}
                </p>
              ))}
            </div>
            <StatesRow size="default" variant="default" />
            <StatesRow size="compact" variant="default" />
          </div>

          <div className="mb-xl">
            <p className="text-label text-primary uppercase mb-sm">Selectable variant</p>
            <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-sm mb-sm">
              <div />
              {STATE_COLUMNS.map((s) => (
                <p key={s} className="text-label text-text-tertiary uppercase text-center">
                  {s}
                </p>
              ))}
            </div>
            <StatesRow size="default" variant="selectable" />
            <StatesRow size="compact" variant="selectable" />
          </div>
        </section>
      </div>
    </div>
  )
}
