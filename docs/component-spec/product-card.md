# ProductCard — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/product-card` (or open `docs/spec/product-card.html` directly). This markdown is the written reference; the live page has the rendered states. All design decisions are tracked in `docs/spec/decisions.html#product-card` (PC-01 through PC-11).

**File:** `src/components/ProductCard.tsx`

## Overview

Flagship component. Every search result, library entry, and picker row is a ProductCard. Displays product name, brand, rating, category, and an always-visible save heart over a square product photo. Clicking the card navigates to the product detail page (PDP) — not a modal.

Composes `StatusBadge`, `CategoryTag`, and a dedicated heart button.

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `string` | yes | — | Product id — used to build the PDP route |
| `name` | `string` | yes | — | Product name |
| `brand` | `string` | yes | — | Brand name |
| `rating` | `'clean' \| 'caution' \| 'avoid'` | yes | — | Safety rating |
| `category` | `string` | yes | — | Category label |
| `imageUrl` | `string` | no | — | Product photo URL. Falls back to placeholder on error. |
| `size` | `'default' \| 'compact'` | no | `'default'` | Layout density |
| `variant` | `'default' \| 'selectable'` | no | `'default'` | Interaction mode |
| `disabled` | `boolean` | no | `false` | Disables all interaction |
| `selected` | `boolean` | no | `false` | Selection state for selectable variant |
| `onSelectChange` | `(selected: boolean) => void` | no | — | Selection toggle — selectable only |
| `saved` | `boolean` | no | `false` | Heart filled when true |
| `onSaveToggle` | `() => void` | no | — | Heart click handler. If omitted, heart is not rendered. |
| `loading` | `boolean` | no | `false` | Renders skeleton |

**Removed from v3 spec:**
- `description` prop — not displayed on card (was never rendered on default; compact drops it)
- `onClick` prop — default variant navigates to `/product/:id` via react-router, not a consumer handler (PC-11)
- `onSave` / `onAddToList` split — consolidated into a single `onSaveToggle` (PC-08). Add-to-list is PDP-only.
- `onAddToList` prop — removed entirely (PC-08)

## Variants

| Variant | When to use | When not to use |
| --- | --- | --- |
| `default` | Search result grids, product library, any browse surface | Comparison pickers — use `selectable` |
| `selectable` | Comparison picker lists where the card is the selection control | Normal browsing — hides the heart and overrides the navigate-to-PDP behavior |

## Sizes

| Size | Layout | When to use |
| --- | --- | --- |
| `default` | Square image on top (1:1), content block below (name / brand / category) | Search grids, library, detail previews |
| `compact` | 56×56 thumbnail left, two-line text right, StatusBadge at end | Shopping list rows, narrow sidebar lists, comparison pickers |

## Visual spec — default size

### Shape
- Card border-radius: `rounded-asym` (`24px 24px 10px 10px`) — full asymmetric signature (PC-01)
- Image area: 1:1 aspect ratio, full-bleed, top corners match card radius (22px inner, since the 1.5px border subtracts) (PC-03, PC-04)
- Image background: `surface-muted` placeholder

### Overlays on image
- **StatusBadge** (small size) at `top-left` with 10px inset (PC-05)
- **Heart button** at `top-right` with 10px inset. 32×32 frosted-white pill (`rgba(255,255,255,0.85)` + `backdrop-blur-sm`), amethyst heart icon. Filled heart = `saved=true`. (PC-06)

### Content block (below image)
- Padding: `p-lg` (24px)
- Stack, top-to-bottom: `name` (h4), `brand` (small, tertiary), `CategoryTag` inline below brand (PC-07)
- No footer row. The heart that used to live there now lives on the image.

### Border & surface
- Rest: `bg-surface-card` + 1.5px `surface-divider` border
- Rest shadow: none

### Hover state (PC-02)
- Border color → `amethyst`
- Box-shadow → `--shadow-flat-lime-sm` (`2.5px 2.5px 0 0 lime`)
- No translate, no scale
- Transition: `transition-[border-color,box-shadow] duration-base ease-out-soft`

### Pressed state
- `translate(1px, 1px)` + shadow shrinks `2.5px → 1.5px` (`--shadow-flat-lime-xs`). Border stays amethyst.
- Shadow-locked motion: translate matches shadow delta, so the shadow's outer edge stays planted (mirrors the Button's press-into-shadow language at a whisper volume).
- Transition: same `duration-base ease-out-soft` as hover
- Reverts fully on `prefers-reduced-motion: reduce` (no translate, no shadow change)

### Focus-visible
- `outline-2 outline-amethyst outline-offset-2`
- Only visible on keyboard focus

### Disabled
- Opacity 0.5
- No hover, no pointer events, removed from tab order
- `aria-disabled="true"`

### Loading (skeleton)
- Pulses `bg-surface-muted` block at full card dimensions
- No content rendered

## Visual spec — compact size

| Element | Treatment |
| --- | --- |
| Container | Flex row, 10px padding, `rounded-[12px]`, 1.5px border, `p-sm` |
| Thumbnail | 56×56 square, `rounded-[8px]`, image or placeholder (PC-09) |
| Text block | `flex-1`, two lines: name (13px), brand (10px) |
| StatusBadge | `sm` size, right-aligned |
| CategoryTag | Not rendered on compact (PC-07 note — revisit per surface) |
| Heart | Not rendered on compact by default (tap target belongs on full card or PDP) |

Compact has no hover motion — it lives in lists where row-hover would be noisy. Rows get only a subtle background tint on hover (`bg-amethyst-5`).

## Interaction patterns

### Default variant — card is a link
- Clicking the card anywhere outside the heart fires `navigate(\`/product/\${id}\`)` (PC-11)
- The card renders as a `<div>` with `role="link"` and an accompanying `<a>` wrapping the clickable surface, so browser right-click / cmd-click / open-in-new-tab all work
- Heart button has its own click handler with `stopPropagation` so clicking the heart does not navigate

### Selectable variant — card is a checkbox
- Clicking the card fires `onSelectChange(!selected)` instead of navigating
- Selectable cards do not render the heart (the card is the control)
- The `<a>` wrapper is replaced with a `<button role="checkbox" aria-checked>`

### Keyboard
- Default: focus → Enter / Space activates the link (navigates)
- Selectable: focus → Enter / Space toggles selection
- Heart has its own tab stop within the card; Enter / Space toggles save state
- Disabled: `tabIndex={-1}`, no focus, no activation

### Touch
- Heart is always visible — no hover-to-reveal (PC-06)
- Tap on the image region or content region both navigate
- Long-press on the card does nothing special (native browser link behavior)

## Do / Don't

- **Do** let the card navigate to the PDP on click. **Don't** wire `onClick` back up to open a modal. *Reason:* PDP is shareable, back-button-friendly, and not size-constrained (PC-11).
- **Do** use `size="default"` in any grid with 2–4 columns. **Don't** use `default` in narrow sidebar lists — use `compact`. *Reason:* 1:1 square image crowds narrow columns.
- **Do** always render the heart if `onSaveToggle` is provided. **Don't** hide it on hover or stash it in a menu. *Reason:* save-to-library is a primary action; hover-reveal is a touch anti-pattern (PC-06).
- **Do** keep the card minimal — name, brand, category, rating, heart. **Don't** add per-card buttons (share, compare, add-to-list). *Reason:* card is a scan surface, not an action panel. Multi-step actions live on PDP (PC-08).
- **Do** use `variant="selectable"` for comparison pickers. **Don't** wrap a default ProductCard in your own checkbox layout. *Reason:* click targets fight each other.

## Accessibility

**Keyboard:**
- Default: `role="link"`, in tab order, Enter/Space navigates to PDP
- Selectable: `role="checkbox"`, `aria-checked={selected}`, Enter/Space toggles
- Disabled: `aria-disabled="true"`, tab-skipped
- Heart button has its own tab stop regardless of variant

**Focus ring:** `outline-2 outline-amethyst outline-offset-2`. Only visible on keyboard navigation.

**Screen readers:**
- Default announces: `{name}, by {brand}, rated {rating}, category {category}. Link.`
- Selectable announces: `{name}, by {brand}, rated {rating}. Checkbox, {checked|not checked}.`
- StatusBadge speaks the rating word ("Clean" / "Caution" / "Avoid")
- Heart button: `aria-label="Save to library"` / `"Remove from library"` — announced separately from the card

**Color contrast:**
- All text on `surface-card` meets WCAG AA via ink-primary / ink-secondary / ink-tertiary
- StatusBadge (on photo) — white pill backing via `bg-white/85` ensures the rating stays AA-compliant regardless of underlying image
- Heart pill — same frosted backing guarantees amethyst icon reads AAA

**Motion:** Respects `prefers-reduced-motion: reduce` — hover border/shadow transition and pressed scale are disabled. Static rest/hover/press are visually identical in reduced-motion mode; only the transitions are removed.

## Tokens used

**Color:** `surface-card`, `surface-divider`, `surface-muted`, `amethyst`, `amethyst-5`, `ink-primary`, `ink-secondary`, `ink-tertiary`, `lime`, `cream`

**Radius:** `rounded-asym` (24/24/10/10) for the card, `rounded-full` for the heart pill, `rounded-[8px]` for the compact thumbnail

**Shadow:** `--shadow-flat-lime-sm` (2.5px flat-offset lime on hover), `--shadow-flat-lime-xs` (1.5px flat-offset lime on pressed)

**Spacing:** `p-lg` (content block default), `p-sm` (compact container), `gap-sm`, `gap-xs`

**Motion:** `duration-base` (200ms), `ease-out-soft`

## Composition

```
ProductCard (default)
├── a[href="/product/:id"]  (wraps image + content for native link behavior)
│   ├── figure.image-container
│   │   ├── img | placeholder
│   │   ├── StatusBadge (overlay top-left)
│   │   └── button.heart (overlay top-right, stopPropagation)
│   └── div.content
│       ├── h4.name
│       ├── p.brand
│       └── CategoryTag
│
ProductCard (selectable)
└── button[role="checkbox"]
    ├── figure.image-container (no heart)
    └── div.content (same)

ProductCard (compact)
└── a[href="/product/:id"]
    ├── div.thumbnail (56×56)
    ├── div.text-block (name + brand)
    └── StatusBadge (sm)
```

## Decision references

Logged in `docs/spec/decisions.html#product-card`:

- **PC-01** Card radius = asymmetric (24/24/10/10)
- **PC-02** Hover = border → amethyst + `shadow-flat-lime-sm` (2.5px), no translate
- **PC-03** Image aspect = 1:1 square
- **PC-04** Image corners = full-bleed, follow card top
- **PC-05** StatusBadge placement = overlay top-left of image
- **PC-06** Heart placement = overlay top-right of image, always visible
- **PC-07** CategoryTag placement = inline below brand
- **PC-08** Add-to-list button = removed from card (heart only)
- **PC-09** Compact thumbnail = 56×56 square
- **PC-10** Ghost-reveal hover content = deferred
- **PC-11** Click target = navigates to `/product/:id` (not modal)

## Open threads (not blocking)

- **Compact-size StatusBadge placement** — current spec puts it at the end of the row; revisit per use case when shopping list / comparison picker ship.
- **CategoryTag on card** — locked as inline below brand, but flagged for review if it doesn't earn its 22px once real data is in view.
- **Save-flow UX** — whether the heart opens a list picker in the future (favorites vs wishlist vs shopping list) is deferred to a separate decision set when save-flows are specced.
- **Modal component fate** — with product detail moving off modals, the Modal component needs a purpose review (confirm dialogs? list-picker flows? retired entirely?).
