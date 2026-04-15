import ProductCard from '../../components/ProductCard'

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
      </div>
    </div>
  )
}
