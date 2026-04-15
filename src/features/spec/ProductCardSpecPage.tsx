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

function TokenGroup({ label, tokens }: { label: string; tokens: [string, string][] }) {
  return (
    <div>
      <p className="text-label text-text-tertiary uppercase mb-sm">{label}</p>
      <dl className="space-y-xs">
        {tokens.map(([name, value]) => (
          <div key={name} className="grid grid-cols-[180px_1fr] gap-sm">
            <dt><code className="text-small">{name}</code></dt>
            <dd className="text-small text-text-secondary">{value}</dd>
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

        {/* Loading */}
        <section id="loading" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Loading</h2>
          <p className="text-body text-text-secondary mb-lg max-w-[640px]">
            Skeleton placeholder shown while AI search results stream in. Not a "state" of the rendered
            card — the component returns a different element when <code>loading</code> is true.
          </p>
          <div className="max-w-[360px]">
            <ProductCard
              loading
              name=""
              brand=""
              rating="clean"
              category=""
              description=""
            />
          </div>
        </section>

        {/* Interaction patterns */}
        <section id="interaction" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Interaction patterns</h2>
          <div className="space-y-lg max-w-[720px]">
            <div>
              <h3 className="text-h4 text-text-primary mb-xs">Default variant — click to open</h3>
              <p className="text-body text-text-secondary">
                Clicking the card (or pressing Enter/Space when focused) fires <code>onClick</code>,
                which typically opens a detail modal or navigates to a detail view. The inner save
                and add-to-list icon buttons have their own click handlers and use{' '}
                <code>stopPropagation</code> so clicking them doesn't also open the detail.
              </p>
            </div>
            <div>
              <h3 className="text-h4 text-text-primary mb-xs">Selectable variant — click to toggle</h3>
              <p className="text-body text-text-secondary">
                Clicking the card fires <code>onSelectChange(!selected)</code> instead of{' '}
                <code>onClick</code>. <code>onClick</code> is ignored when <code>variant</code> is{' '}
                <code>selectable</code>. Save and add-to-list icons are hidden because the card itself
                is the interactive control.
              </p>
            </div>
            <div>
              <h3 className="text-h4 text-text-primary mb-xs">Keyboard</h3>
              <p className="text-body text-text-secondary">
                Tab to focus (focus-visible outline appears on keyboard focus only, not mouse click).
                Enter or Space activates the primary action (open for default, toggle for selectable).
                Inner icon buttons have their own tab stops — always reachable from the card.
              </p>
            </div>
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
                ['Disabled', 'Removed from tab order (tabIndex -1), aria-disabled="true"'],
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
                ['RatingBadge', 'Speaks its rating word ("Clean", "Caution", "Avoid"), not just color'],
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

        {/* Tokens */}
        <section id="tokens" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Tokens used</h2>
          <p className="text-body text-text-secondary mb-lg max-w-[640px]">
            Every design token ProductCard consumes, grouped by category. Values come from{' '}
            <code>src/styles/globals.css</code>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <TokenGroup
              label="Color"
              tokens={[
                ['bg-surface-card', '#FFFFFF'],
                ['bg-surface-muted', '#F0ECE6'],
                ['border-surface-divider', '#EBE7E0'],
                ['border-primary', '#5A8384'],
                ['text-text-primary', '#1D1D1D'],
                ['text-text-secondary', '#666'],
                ['text-text-tertiary', '#9a9a9a'],
              ]}
            />
            <TokenGroup
              label="Spacing"
              tokens={[
                ['p-md', '16px'],
                ['p-lg', '24px'],
                ['gap-sm', '8px'],
                ['gap-xs', '4px'],
                ['mb-md', '16px'],
              ]}
            />
            <TokenGroup
              label="Radius"
              tokens={[['rounded-card', '16px']]}
            />
            <TokenGroup
              label="Shadow"
              tokens={[['shadow-hover', 'see globals.css']]}
            />
            <TokenGroup
              label="Motion"
              tokens={[
                ['duration-base', 'see globals.css'],
                ['ease-default', 'see globals.css'],
              ]}
            />
          </div>
        </section>

        {/* Composition */}
        <section id="composition" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Composition</h2>
          <p className="text-body text-text-secondary mb-lg max-w-[640px]">
            ProductCard is a compound component. It renders three design-system components inside its
            own layout.
          </p>
          <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`ProductCard
├── RatingBadge       (rating pill, top-right of header)
├── Badge             (category label, footer, default variant only)
└── IconButton × 2    (save + add-to-list, footer, non-selectable only)`}
          </pre>
        </section>

        {/* Props */}
        <section id="props" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-small">
              <thead>
                <tr className="border-b border-surface-divider">
                  <th className="text-left py-sm pr-md text-text-tertiary font-normal">Prop</th>
                  <th className="text-left py-sm pr-md text-text-tertiary font-normal">Type</th>
                  <th className="text-left py-sm pr-md text-text-tertiary font-normal">Default</th>
                  <th className="text-left py-sm text-text-tertiary font-normal">Description</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {[
                  ['name', 'string', '—', 'Product name'],
                  ['brand', 'string', '—', 'Brand name'],
                  ['rating', "'clean' | 'caution' | 'avoid'", '—', 'Product safety rating'],
                  ['category', 'string', '—', 'Category label'],
                  ['description', 'string', '—', 'Short description (hidden in compact)'],
                  ['size', "'default' | 'compact'", "'default'", 'Layout density'],
                  ['variant', "'default' | 'selectable'", "'default'", 'Interaction mode'],
                  ['disabled', 'boolean', 'false', 'Disables interaction'],
                  ['selected', 'boolean', 'false', 'Selection state for selectable variant'],
                  ['onSelectChange', '(selected: boolean) => void', '—', 'Selection toggle handler'],
                  ['onSave', '() => void', '—', 'Save to library handler'],
                  ['onAddToList', '() => void', '—', 'Add to shopping list handler'],
                  ['saved', 'boolean', 'false', 'Saved state for the heart icon'],
                  ['onClick', '() => void', '—', 'Click handler (default variant only)'],
                  ['loading', 'boolean', 'false', 'Renders skeleton placeholder'],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} className="border-b border-surface-divider">
                    <td className="py-sm pr-md"><code>{prop}</code></td>
                    <td className="py-sm pr-md"><code>{type}</code></td>
                    <td className="py-sm pr-md"><code>{def}</code></td>
                    <td className="py-sm">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Changelog */}
        <section id="changelog" className="mb-3xl">
          <h2 className="text-h2 text-text-primary mb-md">Changelog</h2>
          <ul className="space-y-sm max-w-[640px]">
            <li className="flex gap-md">
              <span className="text-small text-text-tertiary w-[92px] shrink-0">2026-04-14</span>
              <span className="text-body text-text-secondary">
                Added <code>size="compact"</code>, <code>variant="selectable"</code>,{' '}
                <code>disabled</code>, pressed and focus-visible states, and{' '}
                <code>prefers-reduced-motion</code> support. First Primer-depth deep spec.
              </span>
            </li>
            <li className="flex gap-md">
              <span className="text-small text-text-tertiary w-[92px] shrink-0">earlier</span>
              <span className="text-body text-text-secondary">
                Initial implementation: name, brand, rating, category, description, save and
                add-to-list actions, hover shadow, loading skeleton.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
