# ProductCard Deep Spec — Design Document

**Date:** 2026-04-14
**Status:** Approved, ready for implementation planning
**Branch:** feat/design-system-tailwind-and-core-components

---

## Context

Clean Shopper currently has a single `docs/component-spec.md` that documents all 22 components at a shallow level (props, visual structure, states, usage rules — about 50 lines per component). For the portfolio case study, we want one component documented at the depth GitHub Primer documents Button: variants, sizes, interactive states grid, do/don't, accessibility, tokens, composition, props reference — roughly 11 sections.

ProductCard was chosen over Button because it's the compound domain component that distinguishes Clean Shopper from a generic CRUD app. A deep spec on ProductCard showcases product judgment, not just knowledge that buttons have hover states.

The goal of this exercise is twofold:
1. Demonstrate design-system rigor in the portfolio case study
2. Produce a living reference that Claude Code and future contributors can use when building out the rest of Clean Shopper

Reference design systems consulted: GitHub Primer (Button page structure), Airbnb DLS (listing card patterns), Shopify Polaris (ResourceItem), Atlassian Design System, Material Design (cards).

---

## Decision summary

- **Approach:** expand ProductCard with new variants/sizes/states first, then document the expanded component. (Alternative "document-only" was rejected as too thin; "aspirational spec only" was rejected because spec and code must match.)
- **Deliverables:** three artifacts — expanded ProductCard code, a live `/spec/product-card` route, and a markdown companion file `docs/component-spec/product-card.md`
- **Documentation style:** Storybook-lite — a homemade React route inside Clean Shopper, not Storybook itself. Real Storybook was rejected as overkill for one component.
- **Markdown vs live page:** both exist, neither generates the other. Markdown has words (for Claude Code + GitHub readers). Live page has pixels (for humans in the browser + case study). Both reference each other.
- **File split:** ProductCard moves out of the shared `component-spec.md` into its own file. The 21 other components stay in the shared file.
- **Changelog lives on the live page only**, not in the markdown. Reason: narrative touch for the case study, lives next to the React code that changes.

---

## Section 1 — ProductCard API expansion

### New props

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `size` | `'default' \| 'compact'` | `'default'` | Layout density. Compact hides description and action footer. |
| `variant` | `'default' \| 'selectable'` | `'default'` | Selectable turns the card into a selection control (click toggles selection instead of opening detail). |
| `disabled` | `boolean` | `false` | Visually and functionally disables the card. Non-interactive, not in tab order, save/add handlers suppressed. |
| `selected` | `boolean` | `false` | Only meaningful when `variant === 'selectable'`. Drives the selection visual. |
| `onSelectChange` | `(selected: boolean) => void` | — | Only meaningful when `variant === 'selectable'`. Fires when user toggles selection. |

### Existing props unchanged

`name`, `brand`, `rating`, `category`, `description`, `onSave`, `onAddToList`, `saved`, `onClick`, `loading`.

### Interaction rules

- **Default variant:** clicking the card fires `onClick` (opens detail modal). Save/add-to-list icons shown in the footer.
- **Selectable variant:** clicking the card fires `onSelectChange(!selected)`. `onClick` is ignored. Save/add-to-list icons are hidden (the card itself is the interactive control).
- **Disabled state:** overrides both. No handlers fire. Card is removed from the tab order.

### States matrix

- Variants: `default`, `selectable` (2)
- Sizes: `default`, `compact` (2)
- Interactive states: `default`, `hover`, `pressed`, `focus-visible`, `disabled` (5)
- **Total cells in the states grid: 2 × 2 × 5 = 20**
- Plus the `loading` skeleton, shown separately as it's not a state of a rendered card.

### Focus-visible rule

Uses the same treatment as the Button spec for design system consistency:
```
focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
```

---

## Section 2 — Visual design for new variants

### Compact size

Same card container, reduced padding (`p-md` vs `p-lg`), and content stripped down. Used in shopping list rows and the saved library scan view.

**Kept:**
- Title
- Brand (secondary line under title, same `text-small text-text-tertiary`)
- Rating pill (top-right)

**Dropped:**
- Description paragraph
- Footer row (category badge, save/add-to-list icons)

**Rules:**
- Title wraps to 2 lines max
- Do not use in 3-column grids — compact is for narrow list layouts
- Do not override compact to force description back in; if you need description, use default

**Rendered height:** ~70–80px (vs ~180px for default).

### Selectable variant — selection affordance

- **Checkbox:** 20×20px, top-left of the card, padding adjusted to make room (`pl-[46px]`)
- **Unselected:** empty checkbox with 2px border using the `surface-divider` token, white fill
- **Selected:** checkbox filled with the `primary` token as background, white centered checkmark (via flex alignment, not absolute positioning — explicitly corrected from v1 which had an off-center checkmark)
- **Card border when selected:** 2px `primary` border replaces the default card surface edge
- **No tinted background** — this was explicitly removed from v1; border-only keeps the card feeling clean
- **Save and add-to-list icons are hidden** in the selectable variant regardless of selected state

---

## Section 3 — /spec/product-card route structure

### Route

Single hardcoded URL: `/spec/product-card`. No `/spec` index page (YAGNI — add it if a second component ever gets a deep spec).

### Page layout

Long-scroll with a sticky table of contents on the left. Tabs were rejected because they hide content and make it harder to screenshot or skim the whole thing. Long-scroll is what Material Design and Radix use and what works best for a portfolio showcase.

### Sections (12 total on the live page; mirrors Primer's Button page plus a changelog)

1. **Overview** — one-line purpose, a single hero ProductCard rendered live, a JSX usage example
2. **Variants** — `default` vs `selectable`, each rendered live with a label
3. **Sizes** — `default` vs `compact`, rendered in their real use context (grid for default, stacked list for compact)
4. **States** — the 20-cell matrix (2 variants × 2 sizes × 5 interactive states)
5. **Loading** — the skeleton shown separately
6. **Interaction patterns** — click-to-open vs click-to-select, keyboard behavior
7. **Do / Don't** — 4 paired visual examples with green check / red X treatment
8. **Accessibility** — focus ring, keyboard tab order, ARIA labels, screen reader expectations
9. **Tokens used** — every color, spacing, radius, shadow, and motion token consumed, with values
10. **Composition** — component tree showing RatingBadge, Badge, IconButton nested inside
11. **Props reference** — full table
12. **Changelog** *(live page only, not in the markdown)* — dated list of component evolution for narrative purposes

### Technical — how the states grid renders

ProductCard's component code is not modified to support the spec page. A `forceState` prop would pollute the component API with something only docs would ever use.

Instead, a `StateFrame` helper component defined inside the /spec route file wraps ProductCard and applies CSS overrides that force one visual state:

```tsx
<StateFrame state="hover">
  <ProductCard {...props} />
</StateFrame>
```

- `hover` → applies the hover shadow via direct CSS class (bypassing the `:hover` pseudo-class)
- `pressed` → applies the pressed scale + deeper shadow
- `focus-visible` → applies the focus ring outline via a static class
- `disabled` → passes `disabled={true}` through to the child (real prop, no CSS override needed)

**Live vs locked cells:**
- The 4 cells in the "default" state column in each row are NOT wrapped in StateFrame — they're real ProductCards that respond to real mouse hover, keyboard focus, and clicks. These are the "try it yourself" cells.
- All other cells ARE wrapped in StateFrame, visually locked into one state. They're still live React (not PNGs), but their appearance doesn't respond to the actual cursor — it's frozen so you can see all states side-by-side.

StateFrame lives only in the spec route and is never imported elsewhere.

---

## Section 4 — Markdown spec file structure

### File location

`docs/component-spec/product-card.md`

### Update to the existing `component-spec.md`

The current ~50-line ProductCard section (Section 3) is replaced with a short pointer:

```markdown
## 3. ProductCard

ProductCard has its own deep specification at `docs/component-spec/product-card.md`.
Quick summary: displays a product with name, brand, rating, category, description.
Variants: `default`, `selectable`. Sizes: `default`, `compact`. Composes RatingBadge,
Badge, IconButton.
```

The other 21 components stay in the shared file untouched.

### Update to `CLAUDE.md`

One line added to the `## References` section:

```markdown
- ProductCard deep spec: See /docs/component-spec/product-card.md — ProductCard is
  documented in its own file with full variants/sizes/states/accessibility treatment.
  Live interactive version at /spec/product-card in the app.
```

### Sections in `product-card.md`

Text-only, no embedded images. Mirrors the live page sections but written as prose, tables, and bullets:

1. **Overview** — purpose, one-line summary, link to the live spec page
2. **Props reference** — complete table (types, defaults, descriptions, notes)
3. **Variants** — table with `variant` values, when to use, when not to use
4. **Sizes** — table with `size` values, when to use, content differences
5. **States** — table describing each state's visual (refers reader to live page for the visuals)
6. **Interaction patterns** — prose describing click-to-open vs click-to-select, keyboard nav, how selectable suppresses save/add-to-list icons
7. **Do / Don't** — bulleted paired rules
8. **Accessibility** — ARIA labels, keyboard tab order, focus-visible treatment, screen reader expectations, motion preference
9. **Tokens used** — full list of every design token consumed, grouped by category
10. **Composition** — which child components it renders, in what layout

No changelog in the markdown — it lives on the live page only.

### Relationship between markdown and live page

- Markdown is for Claude Code + GitHub readers → *words*
- Live page is for humans in the browser + case study → *pixels*
- Neither embeds the other's content. They reference each other via links.
- Both are derived from the same ProductCard component code. If the code changes, both need updating. Neither is auto-generated.

---

## Section 5 — Do/Don't content and Accessibility

### Do / Don't — 4 paired rules

Each pair gets a visual treatment in the live spec page (side-by-side mini mockups with green check / red X) and a bulleted text version in the markdown.

1. **DO** use `size="default"` in search result grids and product library.
   **DON'T** use `default` in a narrow sidebar list — use `compact`.
   *Why:* default's 3-line description needs horizontal room; in a narrow column it wraps to 6 lines and collapses visually.

2. **DO** use `variant="selectable"` for comparison pickers.
   **DON'T** wrap a default ProductCard in your own checkbox layout.
   *Why:* click targets fight each other — the card's onClick and your outer checkbox click both fire. Use the native variant.

3. **DO** let `compact` drop the description.
   **DON'T** override `compact` to force description back in.
   *Why:* compact is a deliberate density decision for scanning, not a size fallback. If you need description, use default.

4. **DO** pair `saved={true}` with an `onSave` callback.
   **DON'T** render a saved-state card without a handler.
   *Why:* users see the filled heart, click it to unsave, nothing happens, they file a bug.

### Accessibility

**Keyboard:**
- Default variant: card is `role="button"`, `tabIndex={0}`, Enter/Space activates `onClick`
- Selectable variant: card is `role="checkbox"` with `aria-checked={selected}`, Enter/Space toggles `onSelectChange`
- Disabled state: card is removed from tab order (`tabIndex={-1}`), `aria-disabled="true"`
- Inner save and add-to-list buttons have their own tab stops, always reachable from the card

**Focus:**
- `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`
- Only visible on keyboard navigation, not on mouse click (`focus-visible` not `focus`)

**Screen readers:**
- Default variant announces: `"{name}, by {brand}, rated {rating}, category {category}. Button."`
- Selectable variant announces: `"{name}, by {brand}, rated {rating}. Checkbox, {checked/not checked}."`
- RatingBadge speaks its rating word (`"Clean"` / `"Caution"` / `"Avoid"`), never just a color
- Save button: `aria-label="Save to library"` / `"Remove from library"` (already in code)
- Add-to-list button: `aria-label="Add to shopping list"` (already in code)

**Color contrast:**
- All text meets WCAG AA
- Focus ring meets 3:1 against the `surface-bg` background
- Rating pills already meet AA via the design tokens

**Motion:**
- Respects `prefers-reduced-motion: reduce` — hover shadow transition and pressed scale are disabled for users who prefer no motion (rendered as instant state change with no transition)

---

## Deliverables

This spec will be implemented as four sets of changes:

1. **ProductCard component expansion** (`src/components/ProductCard.tsx`)
   - Add new props: `size`, `variant`, `disabled`, `selected`, `onSelectChange`
   - Compact size rendering (drop description + footer, keep brand)
   - Selectable variant rendering (checkbox + border, hide action icons)
   - Disabled state (aria-disabled, tabIndex -1, suppress handlers)
   - Pressed state visual (scale + deeper shadow on `:active`)
   - Focus-visible ring update
   - Respect `prefers-reduced-motion`

2. **Live spec route** (`src/features/spec/ProductCardSpecPage.tsx`)
   - New React Router route at `/spec/product-card`
   - `StateFrame` helper component defined in the same file, spec-route-local (never imported elsewhere)
   - All 12 sections laid out in a long-scrolling page with sticky TOC
   - Live and locked cells in the states grid per the rules in Section 3
   - Changelog section at the bottom

3. **Markdown spec file** (`docs/component-spec/product-card.md`)
   - New file with all 10 text sections
   - No embedded images

4. **Shared spec + CLAUDE.md updates**
   - Replace ProductCard section in `docs/component-spec.md` with a pointer to the new file
   - Add one line to CLAUDE.md `## References` section pointing to the new deep spec

---

## Out of scope

- **Featured variant** — vanity, Clean Shopper doesn't need it yet
- **Storybook installation** — overkill for one component; revisit if multiple components get deep specs
- **Automated screenshot capture via Playwright** — overkill for one page; manual screenshots (or just linking to the live Vercel deployment) is sufficient for the case study
- **Splitting the other 21 components into their own files** — only ProductCard gets its own file; the rest stay in `component-spec.md`
- **A `/spec` index page listing all deep-spec components** — YAGNI until there's a second one
- **Refactoring component-spec.md structure** beyond the ProductCard pointer

---

## References

- GitHub Primer Button page — https://primer.style/product/components/button/ (structure template for Variants/Sizes/States/Do-Don't/Accessibility/Tokens/Props)
- Airbnb DLS listing card (not linked, referenced from memory) — similar compound-retail card pattern
- Shopify Polaris ResourceItem — alternative compound card pattern
- Clean Shopper current ProductCard — `src/components/ProductCard.tsx`
- Clean Shopper current shared spec — `docs/component-spec.md` (ProductCard section #3)
- Clean Shopper design tokens — `src/styles/globals.css` (`@theme` block)
