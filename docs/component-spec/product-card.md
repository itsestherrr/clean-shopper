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
- Disabled: `tabIndex={-1}`, `aria-disabled="true"`, handlers suppressed, and `role` is omitted (disabled cards are not exposed as buttons or checkboxes)
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
