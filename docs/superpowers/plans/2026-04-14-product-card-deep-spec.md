# ProductCard Deep Spec Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand ProductCard with new variants/sizes/states and document it at GitHub Primer depth via a live `/spec/product-card` React route and a companion markdown file.

**Architecture:** ProductCard gains `size`, `variant`, `disabled`, `selected`, and `onSelectChange` props. A new React Router route renders a long-scroll spec page with 12 sections including a 20-cell states matrix. A `StateFrame` helper (spec-route-local) locks cells into visual states via CSS overrides without polluting the component API. A markdown companion at `docs/component-spec/product-card.md` gives Claude Code and GitHub readers the written reference.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router DOM (new dependency).

**Source spec:** `docs/superpowers/specs/2026-04-14-product-card-deep-spec-design.md`

**Testing note:** No test framework is installed in Clean Shopper. Verification for each task is visual — via the running dev server (currently on `http://localhost:5177`). The `/spec/product-card` page itself acts as the visual verification surface once it exists.

---

## Task 1: Install React Router and set up routes

**Files:**
- Modify: `package.json`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Create: `src/features/spec/ProductCardSpecPage.tsx` (placeholder)

- [ ] **Step 1: Install react-router-dom**

Run:
```bash
npm install react-router-dom
```

Expected: adds `react-router-dom` to dependencies in `package.json`.

- [ ] **Step 2: Create placeholder spec page file**

Create `src/features/spec/ProductCardSpecPage.tsx`:
```tsx
export default function ProductCardSpecPage() {
  return (
    <div className="p-2xl">
      <h1 className="text-h1 text-text-primary">ProductCard Spec</h1>
      <p className="text-body text-text-secondary mt-md">
        Placeholder — content coming in subsequent tasks.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Wrap App in BrowserRouter**

Replace `src/main.tsx` with:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 4: Define routes in App.tsx**

Replace `src/App.tsx` with:
```tsx
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import ProductCardSpecPage from './features/spec/ProductCardSpecPage'

function App() {
  return (
    <div className="bg-surface-bg min-h-screen">
      <NavBar activeTab="home" onNavigate={(tab) => console.log(tab)} />

      {/* Main content — offset for NavBar */}
      <main className="md:ml-[240px] pb-[72px] md:pb-0 p-2xl">
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/spec/product-card" element={<ProductCardSpecPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 5: Verify routing works**

Visit `http://localhost:5177/` — should show BrowsePage (product grid).
Visit `http://localhost:5177/spec/product-card` — should show the placeholder heading.
Both should have the NavBar rendered.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/main.tsx src/App.tsx src/features/spec/ProductCardSpecPage.tsx
git commit -m "feat(routing): install react-router-dom and add /spec/product-card placeholder"
```

---

## Task 2: Expand ProductCard props (types + plumbing, no visual change)

**Files:**
- Modify: `src/components/ProductCard.tsx`

This task adds all new props to the TypeScript interface and destructures them in the function signature. No visual behavior changes yet — the point is to prove the type surface compiles without breaking existing usage in BrowsePage.

- [ ] **Step 1: Add new type aliases and extend the props interface**

Replace the type aliases and interface at the top of `src/components/ProductCard.tsx`:
```tsx
type Rating = 'clean' | 'caution' | 'avoid'
type Size = 'default' | 'compact'
type Variant = 'default' | 'selectable'

interface ProductCardProps {
  name: string
  brand: string
  rating: Rating
  category: string
  description: string
  size?: Size
  variant?: Variant
  disabled?: boolean
  selected?: boolean
  onSelectChange?: (selected: boolean) => void
  onSave?: () => void
  onAddToList?: () => void
  saved?: boolean
  onClick?: () => void
  loading?: boolean
}
```

- [ ] **Step 2: Update the function signature to destructure new props with defaults**

Replace the function signature (the `export default function ProductCard(...)` line through the opening brace):
```tsx
export default function ProductCard({
  name,
  brand,
  rating,
  category,
  description,
  size = 'default',
  variant = 'default',
  disabled = false,
  selected = false,
  onSelectChange,
  onSave,
  onAddToList,
  saved = false,
  onClick,
  loading = false,
}: ProductCardProps) {
```

- [ ] **Step 3: Verify BrowsePage still renders and TypeScript compiles**

Visit `http://localhost:5177/` — product grid should render identically to before (new props are unused so far).
Run `npm run build` — should complete without TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat(product-card): add size, variant, disabled, selected, onSelectChange prop types"
```

---

## Task 3: ProductCard compact size

**Files:**
- Modify: `src/components/ProductCard.tsx`

Compact hides description + footer, keeps title/brand/rating, uses `p-md` instead of `p-lg`.

- [ ] **Step 1: Compute isCompact and adjust container padding**

Inside the ProductCard function body, after the `loading` early return, add:
```tsx
const isCompact = size === 'compact'
```

Then change the main container className from:
```tsx
className="bg-surface-card rounded-card p-lg transition-shadow duration-base ease-default hover:shadow-hover cursor-pointer"
```

To:
```tsx
className={`bg-surface-card rounded-card transition-shadow duration-base ease-default hover:shadow-hover cursor-pointer ${isCompact ? 'p-md' : 'p-lg'}`}
```

- [ ] **Step 2: Conditionally remove the header bottom margin in compact mode**

Change the header wrapper from:
```tsx
<div className="flex justify-between items-start gap-sm mb-sm">
```

To:
```tsx
<div className={`flex justify-between items-start gap-sm ${isCompact ? '' : 'mb-sm'}`}>
```

- [ ] **Step 3: Conditionally render the description and footer**

Wrap the description paragraph and the footer div in a single conditional. Replace this block:
```tsx
{/* Description */}
<p className="text-body text-text-secondary mb-md">{description}</p>

{/* Footer */}
<div className="flex justify-between items-center">
  <Badge variant="neutral">{category}</Badge>
  <div className="flex items-center gap-xs">
    {onSave && (
      <IconButton
        icon={saved ? '♥' : '♡'}
        onClick={(e) => { e.stopPropagation(); onSave() }}
        variant="ghost"
        active={saved}
        ariaLabel={saved ? 'Remove from library' : 'Save to library'}
      />
    )}
    {onAddToList && (
      <IconButton
        icon="＋"
        onClick={(e) => { e.stopPropagation(); onAddToList() }}
        variant="ghost"
        ariaLabel="Add to shopping list"
      />
    )}
  </div>
</div>
```

With:
```tsx
{!isCompact && (
  <>
    {/* Description */}
    <p className="text-body text-text-secondary mb-md">{description}</p>

    {/* Footer */}
    <div className="flex justify-between items-center">
      <Badge variant="neutral">{category}</Badge>
      <div className="flex items-center gap-xs">
        {onSave && (
          <IconButton
            icon={saved ? '♥' : '♡'}
            onClick={(e) => { e.stopPropagation(); onSave() }}
            variant="ghost"
            active={saved}
            ariaLabel={saved ? 'Remove from library' : 'Save to library'}
          />
        )}
        {onAddToList && (
          <IconButton
            icon="＋"
            onClick={(e) => { e.stopPropagation(); onAddToList() }}
            variant="ghost"
            ariaLabel="Add to shopping list"
          />
        )}
      </div>
    </div>
  </>
)}
```

- [ ] **Step 4: Verify compact rendering**

Temporarily edit `src/features/browse/BrowsePage.tsx` — add `size="compact"` to the first `<ProductCard>` in the map:
```tsx
<ProductCard
  key={product.id}
  size="compact"
  name={product.name}
  // ...
/>
```

Visit `http://localhost:5177/`. The first card should render without description, without category badge, without icons — just title, brand, and rating pill. Other cards unchanged.

**Then revert the temporary edit** (remove `size="compact"` from BrowsePage before committing).

- [ ] **Step 5: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat(product-card): add compact size that drops description and footer"
```

---

## Task 4: ProductCard selectable variant

**Files:**
- Modify: `src/components/ProductCard.tsx`

Selectable adds a checkbox top-left, makes the card click-to-toggle, hides save/add-to-list icons, shows a primary border when selected.

- [ ] **Step 1: Add isSelectable flag and click routing**

Below the `const isCompact = size === 'compact'` line, add:
```tsx
const isSelectable = variant === 'selectable'

const handleClick = () => {
  if (isSelectable) {
    onSelectChange?.(!selected)
  } else {
    onClick?.()
  }
}

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}
```

- [ ] **Step 2: Update container className and ARIA for selectable variant**

Change the main container div. Replace:
```tsx
<div
  className={`bg-surface-card rounded-card transition-shadow duration-base ease-default hover:shadow-hover cursor-pointer ${isCompact ? 'p-md' : 'p-lg'}`}
  onClick={onClick}
  role={onClick ? 'button' : undefined}
  tabIndex={onClick ? 0 : undefined}
  onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
>
```

With:
```tsx
<div
  className={[
    'bg-surface-card rounded-card transition-shadow duration-base ease-default hover:shadow-hover cursor-pointer',
    isCompact ? 'p-md' : 'p-lg',
    isSelectable ? 'relative pl-[46px]' : '',
    isSelectable && selected ? 'border-2 border-primary' : '',
  ].filter(Boolean).join(' ')}
  onClick={handleClick}
  role={isSelectable ? 'checkbox' : 'button'}
  aria-checked={isSelectable ? selected : undefined}
  tabIndex={0}
  onKeyDown={handleKeyDown}
>
```

- [ ] **Step 3: Add the checkbox indicator element**

As the first child inside the container div (before the header `<div className="flex justify-between ...">`), add:
```tsx
{isSelectable && (
  <div
    className={`absolute top-[16px] left-[14px] w-5 h-5 rounded-[5px] border-2 flex items-center justify-center transition-colors ${
      selected ? 'bg-primary border-primary' : 'bg-surface-card border-surface-divider'
    }`}
    aria-hidden="true"
  >
    {selected && (
      <span className="text-surface-card text-[13px] font-bold leading-none">✓</span>
    )}
  </div>
)}
```

- [ ] **Step 4: Hide save/add-to-list icons in selectable variant**

In the footer, wrap the IconButton group (the `<div className="flex items-center gap-xs">`) in a `!isSelectable` check. Replace:
```tsx
<div className="flex items-center gap-xs">
  {onSave && (
    <IconButton ... />
  )}
  {onAddToList && (
    <IconButton ... />
  )}
</div>
```

With:
```tsx
{!isSelectable && (
  <div className="flex items-center gap-xs">
    {onSave && (
      <IconButton
        icon={saved ? '♥' : '♡'}
        onClick={(e) => { e.stopPropagation(); onSave() }}
        variant="ghost"
        active={saved}
        ariaLabel={saved ? 'Remove from library' : 'Save to library'}
      />
    )}
    {onAddToList && (
      <IconButton
        icon="＋"
        onClick={(e) => { e.stopPropagation(); onAddToList() }}
        variant="ghost"
        ariaLabel="Add to shopping list"
      />
    )}
  </div>
)}
```

- [ ] **Step 5: Verify selectable rendering**

Temporarily edit `src/features/browse/BrowsePage.tsx`. Add state and wire up selectable for the first card:
```tsx
const [demoSelected, setDemoSelected] = useState(false)
// ...
<ProductCard
  key={product.id}
  variant="selectable"
  selected={demoSelected}
  onSelectChange={setDemoSelected}
  name={product.name}
  // ...
/>
```

Visit `http://localhost:5177/`. First card should:
- Show an empty checkbox top-left
- Not show save/add-to-list icons
- Toggle between selected (filled checkbox + primary border) and unselected when clicked
- Toggle via Enter/Space when keyboard-focused

**Then revert the temporary edits** before committing.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat(product-card): add selectable variant with checkbox and click-to-toggle"
```

---

## Task 5: ProductCard disabled, pressed, focus-visible, reduced-motion

**Files:**
- Modify: `src/components/ProductCard.tsx`

- [ ] **Step 1: Add disabled styling and ARIA**

Update the container className array to include disabled styling and focus-visible ring. Replace the className array from Task 4 with:
```tsx
className={[
  'bg-surface-card rounded-card transition-shadow duration-base ease-default',
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
  'motion-reduce:transition-none motion-reduce:active:scale-100',
  isCompact ? 'p-md' : 'p-lg',
  disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:shadow-hover active:scale-[0.98]',
  isSelectable ? 'relative pl-[46px]' : '',
  isSelectable && selected ? 'border-2 border-primary' : '',
].filter(Boolean).join(' ')}
```

- [ ] **Step 2: Suppress handlers and update tabIndex/ARIA when disabled**

Update the container's event handlers and ARIA attributes. Replace the `onClick`, `role`, `aria-checked`, `tabIndex`, and `onKeyDown` lines with:
```tsx
onClick={disabled ? undefined : handleClick}
role={disabled ? undefined : isSelectable ? 'checkbox' : 'button'}
aria-checked={isSelectable ? selected : undefined}
aria-disabled={disabled || undefined}
tabIndex={disabled ? -1 : 0}
onKeyDown={disabled ? undefined : handleKeyDown}
```

- [ ] **Step 3: Guard IconButton click handlers against disabled**

In the footer IconButtons, update the onClick handlers to check `disabled`. Replace:
```tsx
onClick={(e) => { e.stopPropagation(); onSave() }}
```

With:
```tsx
onClick={(e) => { e.stopPropagation(); if (!disabled) onSave() }}
```

Do the same for the onAddToList IconButton:
```tsx
onClick={(e) => { e.stopPropagation(); if (!disabled) onAddToList() }}
```

- [ ] **Step 4: Verify all new states**

Temporarily add `disabled` to the first card in BrowsePage. Visit `/`:
- Card should have 50% opacity, no hover effect, cursor not-allowed
- Clicking should do nothing
- Card should be skipped when tabbing through with the keyboard

Remove `disabled`, then tab through cards:
- Focused card should show a 2px `primary` outline (focus-visible ring)
- Focus ring should NOT appear when clicking with the mouse

Press and hold mouse button on a card:
- Card should briefly scale to 0.98 (active state)

Open system preferences → reduce motion (or use Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`):
- Hover shadow should appear instantly, no transition
- Active scale should not apply

**Revert the temporary edits** before committing.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat(product-card): add disabled, pressed, focus-visible, reduced-motion support"
```

---

## Task 6: ProductCardSpecPage — scaffold with sticky TOC + Overview section

**Files:**
- Modify: `src/features/spec/ProductCardSpecPage.tsx`

This task replaces the placeholder with a real page scaffold: sticky TOC on the left, long-scrolling content on the right, and the Overview section.

- [ ] **Step 1: Replace the placeholder file with the scaffold**

Replace the entire contents of `src/features/spec/ProductCardSpecPage.tsx`:
```tsx
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
```

- [ ] **Step 2: Verify the scaffold renders**

Visit `http://localhost:5177/spec/product-card`.
- Should see the sticky TOC on the left (on screens >1024px wide) with all 12 section links
- Should see the "Component spec / ProductCard" header
- Should see the Overview section with one live ProductCard rendered in a muted background card
- Should see the JSX code block below the live card

Clicking a TOC link should scroll to that section (sections other than Overview don't exist yet, so most links scroll to the bottom of the page).

- [ ] **Step 3: Commit**

```bash
git add src/features/spec/ProductCardSpecPage.tsx
git commit -m "feat(spec-page): add ProductCardSpecPage scaffold with sticky TOC and Overview"
```

---

## Task 7: Spec page — Variants + Sizes sections

**Files:**
- Modify: `src/features/spec/ProductCardSpecPage.tsx`

- [ ] **Step 1: Add Variants section**

Inside the content div, after the `overview` section and before the closing `</div>`, add:
```tsx
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
```

- [ ] **Step 2: Add Sizes section**

After the Variants section, add:
```tsx
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
```

- [ ] **Step 3: Verify Variants and Sizes render correctly**

Visit `http://localhost:5177/spec/product-card`. Below the Overview, you should see:
- A Variants section with two live cards side-by-side: a normal card and a selectable card (shown pre-selected with the primary border and checkmark)
- A Sizes section with one default card on the left and three stacked compact cards on the right

The selectable card in Variants should still be interactive — click it to toggle selection (though the state won't persist since no `useState` is wired up). This is expected.

- [ ] **Step 4: Commit**

```bash
git add src/features/spec/ProductCardSpecPage.tsx
git commit -m "feat(spec-page): add Variants and Sizes sections"
```

---

## Task 8: Spec page — States grid with StateFrame helper

**Files:**
- Modify: `src/features/spec/ProductCardSpecPage.tsx`

This is the centerpiece of the page: the 20-cell matrix (2 variants × 2 sizes × 5 states). First we define `StateFrame`, then we build the grid.

- [ ] **Step 1: Add StateFrame helper component at the top of the file**

At the top of `src/features/spec/ProductCardSpecPage.tsx`, after the imports and before the `SECTIONS` array, add:
```tsx
type LockedState = 'default' | 'hover' | 'pressed' | 'focus' | 'disabled'

function StateFrame({
  state,
  children,
}: {
  state: LockedState
  children: React.ReactNode
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
```

- [ ] **Step 2: Add the force-state CSS classes to globals.css**

Open `src/styles/globals.css`. At the bottom of the file (after the `@theme` block), add:
```css
/* ── Spec page state forcing (used only in /spec/product-card) ─────── */
.spec-force-hover > * {
  box-shadow: var(--shadow-hover) !important;
}
.spec-force-pressed > * {
  transform: scale(0.98) !important;
  box-shadow: var(--shadow-hover) !important;
}
.spec-force-focus > * {
  outline: 2px solid var(--color-primary) !important;
  outline-offset: 2px !important;
}
```

- [ ] **Step 3: Add a reusable StatesRow renderer**

In `ProductCardSpecPage.tsx`, above the `SECTIONS` array, add a helper function:
```tsx
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
```

- [ ] **Step 4: Add the States section that uses StatesRow**

After the Sizes section in the JSX, add:
```tsx
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
```

- [ ] **Step 5: Verify the states grid**

Visit `http://localhost:5177/spec/product-card` and scroll to the States section.
- Should see two sub-sections: "Default variant" and "Selectable variant"
- Each has two rows (MD + SM) × 5 columns (default, hover, pressed, focus, disabled) = 10 cells per sub-section
- 20 total cells
- Default-column cells respond to real hover (mouse over them — shadow appears)
- Hover column cells show the shadow permanently
- Pressed column cells show scale 0.98 permanently
- Focus column cells show the primary outline permanently
- Disabled column cells show 50% opacity

- [ ] **Step 6: Commit**

```bash
git add src/features/spec/ProductCardSpecPage.tsx src/styles/globals.css
git commit -m "feat(spec-page): add States matrix with StateFrame helper"
```

---

## Task 9: Spec page — Loading + Interaction patterns + Do/Don't sections

**Files:**
- Modify: `src/features/spec/ProductCardSpecPage.tsx`

- [ ] **Step 1: Add Loading section**

After the States section, add:
```tsx
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
```

- [ ] **Step 2: Add Interaction patterns section**

After the Loading section, add:
```tsx
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
```

- [ ] **Step 3: Add Do/Don't section**

After the Interaction section, add:
```tsx
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
```

Then, at the top of the file below `StatesRow`, add the `DoDontPair` helper component:
```tsx
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
          <p className="text-label text-clean uppercase mb-xs">✓ Do</p>
          <p className="text-body text-text-primary">{doLabel}</p>
        </div>
        <div className="border-l-4 border-avoid bg-avoid-tint rounded-card p-md">
          <p className="text-label text-avoid uppercase mb-xs">✗ Don't</p>
          <p className="text-body text-text-primary">{dontLabel}</p>
        </div>
      </div>
      <p className="text-small text-text-tertiary italic">Why: {why}</p>
    </div>
  )
}
```

- [ ] **Step 4: Verify all three sections render**

Visit the spec page and scroll through:
- **Loading:** one pulsing skeleton card
- **Interaction patterns:** three prose sub-sections
- **Do/Don't:** four paired cards with green ✓ Do and red ✗ Don't, with a "Why" line underneath each

- [ ] **Step 5: Commit**

```bash
git add src/features/spec/ProductCardSpecPage.tsx
git commit -m "feat(spec-page): add Loading, Interaction, and Do/Don't sections"
```

---

## Task 10: Spec page — Accessibility + Tokens + Composition + Props + Changelog sections

**Files:**
- Modify: `src/features/spec/ProductCardSpecPage.tsx`

- [ ] **Step 1: Add Accessibility section**

After the Do/Don't section, add:
```tsx
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
```

At the top of the file below `DoDontPair`, add the helper:
```tsx
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
```

- [ ] **Step 2: Add Tokens section**

After Accessibility, add:
```tsx
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
```

And the helper at the top with the others:
```tsx
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
```

- [ ] **Step 3: Add Composition section**

After Tokens, add:
```tsx
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
```

- [ ] **Step 4: Add Props section**

After Composition, add:
```tsx
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
```

- [ ] **Step 5: Add Changelog section**

After Props, add:
```tsx
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
```

- [ ] **Step 6: Verify all remaining sections render**

Visit the spec page and scroll through. Verify:
- **Accessibility:** 5 sub-sections (Keyboard, Focus, Screen readers, Color contrast, Motion), each with key/value rows
- **Tokens:** grouped token tables (Color, Spacing, Radius, Shadow, Motion)
- **Composition:** ASCII tree showing the three nested components
- **Props:** full table with all 15 props
- **Changelog:** two dated entries

Click each TOC link — each should scroll to its matching section.

- [ ] **Step 7: Commit**

```bash
git add src/features/spec/ProductCardSpecPage.tsx
git commit -m "feat(spec-page): add Accessibility, Tokens, Composition, Props, Changelog sections"
```

---

## Task 11: Write markdown spec file

**Files:**
- Create: `docs/component-spec/product-card.md`

- [ ] **Step 1: Create the markdown spec file**

Create `docs/component-spec/product-card.md`:
```markdown
# ProductCard — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/product-card`. This markdown is the written reference; the live page has the rendered states.

**File:** `src/components/ProductCard.tsx`

## Overview

Displays a product summary with name, brand, rating, category, and description. Used in search results, the product library, comparison pickers, and shopping list views. Composes `RatingBadge`, `Badge`, and `IconButton`.

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` | yes | — | Product name |
| `brand` | `string` | yes | — | Brand name |
| `rating` | `'clean' \| 'caution' \| 'avoid'` | yes | — | Product safety rating |
| `category` | `string` | yes | — | Category label |
| `description` | `string` | yes | — | Short description (hidden in compact size) |
| `size` | `'default' \| 'compact'` | no | `'default'` | Layout density |
| `variant` | `'default' \| 'selectable'` | no | `'default'` | Interaction mode |
| `disabled` | `boolean` | no | `false` | Disables interaction |
| `selected` | `boolean` | no | `false` | Selection state for selectable variant |
| `onSelectChange` | `(selected: boolean) => void` | no | — | Selection toggle handler |
| `onSave` | `() => void` | no | — | Save-to-library handler |
| `onAddToList` | `() => void` | no | — | Add-to-shopping-list handler |
| `saved` | `boolean` | no | `false` | Drives the heart icon state |
| `onClick` | `() => void` | no | — | Click handler (default variant only, ignored when `variant="selectable"`) |
| `loading` | `boolean` | no | `false` | Renders skeleton placeholder |

## Variants

| Variant | When to use | When not to use |
| --- | --- | --- |
| `default` | Search result grids, product library, detail previews | Comparison pickers — use `selectable` |
| `selectable` | Comparison picker lists where the card itself is the selection control | Normal browsing — it hides save/add-to-list actions |

## Sizes

| Size | When to use | Content |
| --- | --- | --- |
| `default` | Search grids, product library, detail previews | Title, brand, rating, description, category, action icons |
| `compact` | Shopping list rows, library scan views, narrow sidebar lists | Title, brand, rating (drops description, category, and icons) |

## States

| State | Visual |
| --- | --- |
| `default` | No shadow, white `surface-card` background |
| `hover` | `shadow-hover` via transition (respects reduced motion) |
| `pressed` | Slight scale to 0.98 with deeper shadow |
| `focus-visible` | 2px `primary` outline with 2px offset, keyboard focus only |
| `disabled` | 50% opacity, `cursor-not-allowed`, no hover effect, removed from tab order |
| `loading` | Pulsing muted skeleton placeholder, no content rendered |

See `/spec/product-card` for the full interactive states matrix.

## Interaction patterns

**Default variant — click to open.** Clicking the card (or pressing Enter/Space when focused) fires `onClick`, which typically opens a detail modal. The inner save and add-to-list icon buttons have their own click handlers and use `stopPropagation` so clicking them doesn't also open the detail.

**Selectable variant — click to toggle.** Clicking the card fires `onSelectChange(!selected)` instead of `onClick`. `onClick` is ignored when `variant` is `selectable`. Save and add-to-list icons are hidden because the card itself is the interactive control.

**Keyboard.** Tab to focus (focus-visible outline appears on keyboard focus only). Enter or Space activates the primary action. Inner icon buttons have their own tab stops.

**Disabled.** No handlers fire. Card is removed from the tab order (`tabIndex={-1}`), marked with `aria-disabled="true"`, and styled at 50% opacity.

## Do / Don't

- **Do** use `size="default"` in search result grids. **Don't** use `default` in a narrow sidebar list — use `compact`. *Reason:* default's description wraps to 6 lines in narrow columns and collapses visually.
- **Do** use `variant="selectable"` for comparison pickers. **Don't** wrap a default ProductCard in your own checkbox layout. *Reason:* click targets fight each other.
- **Do** let `compact` drop the description. **Don't** override `compact` to force description back in. *Reason:* compact is a deliberate density decision, not a size fallback.
- **Do** pair `saved={true}` with an `onSave` callback. **Don't** render a saved card without a handler. *Reason:* users click the filled heart expecting it to unsave.

## Accessibility

**Keyboard:**
- Default variant: `role="button"`, `tabIndex={0}`, Enter/Space activates `onClick`
- Selectable variant: `role="checkbox"` with `aria-checked={selected}`, Enter/Space toggles `onSelectChange`
- Disabled: `tabIndex={-1}`, `aria-disabled="true"`
- Inner save/add-to-list buttons have their own tab stops

**Focus:** `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`. Only visible on keyboard navigation.

**Screen readers:**
- Default announces: `{name}, by {brand}, rated {rating}, category {category}. Button.`
- Selectable announces: `{name}, by {brand}, rated {rating}. Checkbox, {checked|not checked}.`
- RatingBadge speaks the rating word (`"Clean"`, `"Caution"`, `"Avoid"`)
- Save button: `aria-label="Save to library"` / `"Remove from library"`
- Add-to-list button: `aria-label="Add to shopping list"`

**Color contrast:** All text meets WCAG AA. Focus ring meets 3:1 against `surface-bg`. Rating pills meet AA via the design tokens.

**Motion:** Respects `prefers-reduced-motion: reduce` — hover shadow transition and pressed scale are disabled for users who prefer no motion.

## Tokens used

**Color:** `surface-card`, `surface-muted`, `surface-divider`, `primary`, `text-primary`, `text-secondary`, `text-tertiary`

**Spacing:** `p-md` (compact), `p-lg` (default), `gap-sm`, `gap-xs`, `mb-md`, `mb-sm`, `mt-xs`

**Radius:** `rounded-card` (16px)

**Shadow:** `shadow-hover`

**Motion:** `duration-base`, `ease-default`

## Composition

```
ProductCard
├── RatingBadge       (rating pill, top-right of header)
├── Badge             (category label, footer, default variant only)
└── IconButton × 2    (save + add-to-list, footer, non-selectable only)
```
```

- [ ] **Step 2: Verify the file is valid markdown**

Open the file in a markdown preview (VS Code: Cmd+Shift+V). Confirm tables render, code blocks render, headings are correct.

- [ ] **Step 3: Commit**

```bash
git add docs/component-spec/product-card.md
git commit -m "docs(product-card): add deep markdown spec as written companion"
```

---

## Task 12: Update component-spec.md pointer and CLAUDE.md reference

**Files:**
- Modify: `docs/component-spec.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace ProductCard section in component-spec.md with a pointer**

Open `docs/component-spec.md`. Find the section headed `## 3. ProductCard *(exists)*` and replace its entire content (through the `---` separator before the next section) with:
```markdown
## 3. ProductCard *(exists)*

ProductCard has its own deep specification at `docs/component-spec/product-card.md` — it was selected as the showcase component for the case study and is documented Primer-style with variants, sizes, states, do/don't, accessibility, tokens, and composition. The live interactive version renders at `/spec/product-card` in the running app.

**Quick summary:** Displays a product summary with name, brand, rating, category, description.
- **Variants:** `default`, `selectable`
- **Sizes:** `default`, `compact`
- **Composes:** `RatingBadge`, `Badge`, `IconButton`

---
```

- [ ] **Step 2: Add reference line to CLAUDE.md**

Open `CLAUDE.md`. Find the `## References` section. Add a new bullet after the existing component-spec reference line:
```markdown
- ProductCard deep spec: See /docs/component-spec/product-card.md — ProductCard is documented in its own file with full variants/sizes/states/accessibility treatment. Live interactive version at /spec/product-card in the app.
```

- [ ] **Step 3: Verify both files**

Open both files in a markdown preview and confirm:
- `docs/component-spec.md` section 3 now shows the pointer (short summary + link to the deep spec)
- `CLAUDE.md` References section has the new ProductCard deep spec line

- [ ] **Step 4: Commit**

```bash
git add docs/component-spec.md CLAUDE.md
git commit -m "docs: point component-spec.md and CLAUDE.md to ProductCard deep spec"
```

---

## Done criteria

After all 12 tasks:

- `http://localhost:5177/` still renders the browse page with the original grid, unchanged
- `http://localhost:5177/spec/product-card` renders the full 12-section deep spec page with a working sticky TOC, the 20-cell states matrix, and all supporting sections
- `src/components/ProductCard.tsx` supports `size`, `variant`, `disabled`, `selected`, `onSelectChange`, with correct ARIA, keyboard handling, focus-visible, and reduced-motion support
- `docs/component-spec/product-card.md` exists as the written companion
- `docs/component-spec.md` section 3 points to the new file
- `CLAUDE.md` `## References` has one new line for the deep spec
- `npm run build` succeeds (no TypeScript errors)

Case study deliverable: link to `https://<your-vercel-deployment>/spec/product-card` from the case study narrative.
