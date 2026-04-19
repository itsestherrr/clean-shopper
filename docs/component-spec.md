# Component Specification: Clean Shopper V1

**Version:** 1.0
**Last Updated:** 2026-04-03
**Components:** 19 total (2 existing, 17 new)

---

## How to Use This Document

This is the single source of truth for all reusable UI components. Before creating a new component, check here first. Every component uses design tokens from `src/styles/globals.css` — never hardcode hex colors, pixel sizes, or spacing values.

**Token reference shorthand used below:**
- Colors: `bg-primary`, `text-clean`, `bg-surface-card`, etc.
- Typography: `text-h1`, `text-body`, `text-label`, etc.
- Spacing: `p-lg`, `gap-sm`, `mt-md`, etc.
- Radius: `rounded-badge` (6px), `rounded-card` (16px), `rounded-full` (pill)
- Shadows: `shadow-hover`, `shadow-modal`
- Motion: `duration-base`, `duration-slow`, `ease-default`, `ease-enter`
- Z-index: `z-base`, `z-overlay`, `z-modal`, `z-toast`

---

## 1. Button

**Purpose:** Primary interactive element for CTAs and form submissions across the app.

**File:** `src/components/Button.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | yes | — | Button label text or content |
| `variant` | `'primary' \ | 'secondary' \ | 'ghost'` | no | `'primary'` | Visual style |
| `size` | `'sm' \ | 'md' \ | 'lg'` | no | `'md'` | Padding and font size |
| `disabled` | `boolean` | no | `false` | Disables interaction |
| `loading` | `boolean` | no | `false` | Shows loading spinner, disables click |
| `icon` | `ReactNode` | no | — | Optional leading icon |
| `onClick` | `() => void` | no | — | Click handler |
| `type` | `'button' \ | 'submit'` | no | `'button'` | HTML button type |
| `fullWidth` | `boolean` | no | `false` | Stretches to fill container width |

### Visual Structure

```
Primary:   bg-primary text-surface-card rounded-full
Secondary: bg-transparent text-primary rounded-full
           shadow-[inset_0_0_0_1.5px_var(--color-primary)]
Ghost:     bg-transparent text-text-secondary rounded-full

Size sm:   text-small px-md py-xs
Size md:   text-body px-lg py-sm
Size lg:   text-h4 px-xl py-md
```

### States

| State | Styles |
| --- | --- |
| Default | As described per variant above |
| Hover (primary) | `bg-primary-dark` |
| Hover (secondary) | `bg-primary-light` |
| Hover (ghost) | `bg-surface-muted` |
| Focus | `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` |
| Disabled | `opacity-50 cursor-not-allowed` — no hover change |
| Loading | Icon replaced with spinner, `pointer-events-none opacity-70` |

All hover transitions: `transition-colors duration-fast ease-default`

### Usage Rules

- Use `primary` for the single most important action per view (e.g., "Search", "Save to Library")
- Use `secondary` for supporting actions (e.g., "Compare", "Add to List")
- Use `ghost` for tertiary or inline actions (e.g., "Cancel", "See more")
- Do not use primary variant more than once per visible screen area
- Do not use for navigation — use links or nav items instead

---

## 2. RatingBadge

**Purpose:** Displays a clean/caution/avoid rating as a small colored pill with label text.

**File:** `src/components/RatingBadge.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `rating` | `'clean' \ | 'caution' \ | 'avoid'` | yes | — | Determines color and label |
| `size` | `'sm' \ | 'md'` | no | `'md'` | Small for inline use, medium for cards |

### Visual Structure

```
Container: rounded-badge px-sm py-xs inline-flex items-center gap-xs

Rating colors:
  clean:   bg-clean-bg text-clean
  caution: bg-caution-bg text-caution
  avoid:   bg-avoid-bg text-avoid

Size sm: text-micro
Size md: text-label uppercase
```

### States

| State | Styles |
| --- | --- |
| Default | Static display, no interaction |

### Usage Rules

- Use wherever a product rating needs to be communicated: product cards, search results, comparison views, shopping list items
- Always shows the word "Clean", "Caution", or "Avoid" — never just a color dot
- Do not repurpose for non-rating status indicators; use Badge for those
- Do not add click handlers — this is a display-only element

---

## 3. ProductCard *(exists)*

ProductCard has its own deep specification at `docs/component-spec/product-card.md` — it was selected as the showcase component for the case study and is documented Primer-style with variants, sizes, states, do/don't, accessibility, tokens, and composition. The live interactive version renders at `/spec/product-card` in the running app.

**Quick summary:** Displays a product summary with name, brand, rating, category, description.
- **Variants:** `default`, `selectable`
- **Sizes:** `default`, `compact`
- **Composes:** `RatingBadge`, `Badge`, `IconButton`

---

## 4. SearchInput

**Purpose:** Text input for product search queries and filtering within lists.

**File:** `src/components/SearchInput.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | yes | — | Controlled input value |
| `onChange` | `(value: string) => void` | yes | — | Value change handler |
| `onSubmit` | `() => void` | no | — | Enter key / submit handler |
| `placeholder` | `string` | no | `'Search...'` | Placeholder text |
| `loading` | `boolean` | no | `false` | Shows spinner when AI is searching |
| `disabled` | `boolean` | no | `false` | Prevents interaction |
| `autoFocus` | `boolean` | no | `false` | Focus on mount |

### Visual Structure

```
Container: relative flex items-center
Input:     w-full bg-surface-card rounded-full
           px-lg py-sm text-body text-text-primary
           placeholder:text-text-placeholder
           shadow-[inset_0_0_0_1.5px_var(--color-surface-divider)]
           focus:shadow-[inset_0_0_0_1.5px_var(--color-primary)]
           focus:outline-none
           transition-shadow duration-fast ease-default
Icon:      absolute left-md text-text-tertiary (search icon)
Clear btn: absolute right-md text-text-tertiary (× when value is non-empty)
```

### States

| State | Styles |
| --- | --- |
| Default | Inset border using `surface-divider` |
| Focused | Inset border color changes to `primary` |
| Loading | Spinner replaces search icon, input remains editable |
| Disabled | `opacity-50 cursor-not-allowed`, no focus ring |
| Empty | Clear button hidden |

### Usage Rules

- Use for the main product search bar and for filtering saved product lists
- Always use controlled input pattern (`value` + `onChange`)
- Do not use for preference input (ingredient names, brand names) — those use inline text inputs within preference management
- The `onSubmit` callback is for the main search; filter inputs typically respond to `onChange` only

---

## 5. Badge

**Purpose:** Small label for displaying categories, certifications, ingredient tags, and other metadata.

**File:** `src/components/Badge.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | yes | — | Badge label text |
| `variant` | `'neutral' \ | 'clean' \ | 'caution' \ | 'avoid' \ | 'accent'` | no | `'neutral'` | Color scheme |

### Visual Structure

```
Container: inline-flex items-center rounded-badge px-sm py-xs text-label uppercase

Variants:
  neutral:  bg-surface-muted text-text-tertiary
  clean:    bg-clean-tint text-clean
  caution:  bg-caution-tint text-caution
  avoid:    bg-avoid-tint text-avoid
  accent:   bg-primary-light text-primary-dark
```

### States

| State | Styles |
| --- | --- |
| Default | Static display only |

### Usage Rules

- Use for category labels, certification markers (EWG Verified, USDA Organic), and ingredient tags
- Use `neutral` for categories, `accent` for certifications, and semantic variants for ingredient-level ratings
- Do not use for product-level ratings — use RatingBadge for those
- Do not add click handlers — Badge is display-only. Use Chip for interactive filtering.

---

## 6. Card

**Purpose:** Generic surface container used as a base wrapper for content panels and sections.

**File:** `src/components/Card.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | yes | — | Card content |
| `hoverable` | `boolean` | no | `false` | Enables hover shadow transition |
| `padding` | `'sm' \ | 'md' \ | 'lg'` | no | `'lg'` | Internal padding |
| `as` | `'div' \ | 'section' \ | 'article'` | no | `'div'` | Rendered HTML element |

### Visual Structure

```
Container: bg-surface-card rounded-card

Padding:
  sm: p-sm
  md: p-md
  lg: p-lg

Hoverable: transition-shadow duration-base ease-default hover:shadow-hover
```

### States

| State | Styles |
| --- | --- |
| Default | No shadow, no border |
| Hover (when hoverable) | `shadow-hover` |

### Usage Rules

- **When to use \****`<Card>`**\*\* vs. raw classes:** Use `<Card>` when the surface has interactive behavior (hoverable, clickable, semantic HTML element via `as`) or reusable padding. Use raw `bg-surface-card rounded-card` classes for one-off containers that are purely structural (e.g., a wrapper inside a modal).
- Use as the base wrapper for summary panels, preference cards, and any boxed content section
- Do not use directly for product display — use ProductCard which has its own layout
- Do not add borders. Cards are borderless per the design system.
- No shadow at rest. Shadow appears only on hover when `hoverable` is true.

---

## 7. Modal

**Purpose:** Centered overlay dialog for detailed views and confirmation actions.

**File:** `src/components/Modal.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | yes | — | Controls visibility |
| `onClose` | `() => void` | yes | — | Called on backdrop click, escape key, or close button |
| `title` | `string` | no | — | Optional modal heading |
| `children` | `ReactNode` | yes | — | Modal body content |
| `size` | `'sm' \ | 'md' \ | 'lg'` | no | `'md'` | Width of the modal panel |

### Visual Structure

```
Backdrop: fixed inset-0 bg-backdrop z-overlay
          transition-opacity duration-slow ease-enter

Panel:    fixed z-modal bg-surface-card rounded-card shadow-modal
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          p-lg max-h-[85vh] overflow-y-auto

Size sm:  w-[400px] max-w-[calc(100vw-48px)]
Size md:  w-[560px] max-w-[calc(100vw-48px)]
Size lg:  w-[720px] max-w-[calc(100vw-48px)]

Header:   flex justify-between items-center mb-md
  Title:  text-h2 text-text-primary
  Close:  <IconButton icon="×" variant="ghost" />

Body:     children rendered here
```

### States

| State | Styles |
| --- | --- |
| Closed | Not rendered (or `opacity-0 pointer-events-none`) |
| Open | Fade in backdrop + panel, `opacity-100` |
| Scrollable | Body scrolls when content exceeds `max-h-[85vh]` |

### Usage Rules

- Use for product detail/ingredient breakdown views, comparison panels, and destructive action confirmations
- Always provide an `onClose` handler — modals must be dismissible via backdrop click, Escape key, and close button
- Do not nest modals
- Do not use for lightweight feedback — use Toast instead
- Trap focus within the modal when open (a11y)

---

## 8. Toast *(exists)*

**Purpose:** Brief notification confirming a user action.

**File:** `src/components/Toast.tsx` (already implemented)

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | `'success' \ | 'info' \ | 'warning' \ | 'error'` | yes | — | Determines color scheme and icon |
| `message` | `string` | yes | — | Notification text |
| `duration` | `number` | no | `4000` | Auto-dismiss delay in ms; `0` for manual only |
| `onDismiss` | `() => void` | no | — | Callback when toast disappears |

### Visual Structure

Already implemented. Positioned at `z-toast` by the parent layout (toast container).

```
Container: rounded-card px-md py-sm flex items-center gap-sm shadow-hover
           w-[440px] max-w-[calc(100vw-48px)]

Type mapping:
  success: bg-clean-bg text-clean
  info:    bg-primary-light text-primary-dark
  warning: bg-caution-bg text-caution
  error:   bg-avoid-bg text-avoid
```

### States

| State | Styles |
| --- | --- |
| Entering | Slide up from bottom + fade in: `translate-y-2 opacity-0` to `translate-y-0 opacity-100`, `duration-slow ease-enter` |
| Visible | Rendered with auto-dismiss countdown |
| Exiting | Fade out: `opacity-100` to `opacity-0`, `duration-slow ease-exit`. Removed from DOM after transition. |

### Usage Rules

- **Positioning:** Bottom-center on both mobile and desktop. Toast container is `fixed bottom-lg left-1/2 -translate-x-1/2 z-toast flex flex-col gap-sm items-center`.
- Use to confirm actions: "Added to library", "Removed from list", "Preferences updated"
- Keep messages under 60 characters
- Do not use for errors that require user action — use inline error messages or Modal
- Do not stack more than 2 toasts at once

---

## 9. IconButton

**Purpose:** Small icon-only interactive element for inline actions.

**File:** `src/components/IconButton.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `icon` | `ReactNode` | yes | — | Icon element or emoji |
| `onClick` | `() => void` | yes | — | Click handler |
| `variant` | `'default' \ | 'ghost'` | no | `'default'` | Visual style |
| `active` | `boolean` | no | `false` | Filled/highlighted state (e.g., saved) |
| `size` | `'sm' \ | 'md'` | no | `'md'` | Button dimensions |
| `ariaLabel` | `string` | yes | — | Accessible label (required — no visible text) |
| `disabled` | `boolean` | no | `false` | Disables interaction |

### Visual Structure

```
Container: inline-flex items-center justify-center rounded-full
           transition-colors duration-fast ease-default
           cursor-pointer border-none

Variant default: bg-surface-muted text-text-secondary
  Hover:         bg-surface-divider
  Active:        bg-primary-light text-primary

Variant ghost:   bg-transparent text-text-tertiary
  Hover:         bg-surface-muted text-text-secondary
  Active:        text-primary

Size sm: w-7 h-7 (28px)
Size md: w-9 h-9 (36px)
```

### States

| State | Styles |
| --- | --- |
| Default | Per variant above |
| Hover | Background darkens one step |
| Active | Uses primary color tint |
| Focus | `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` |
| Disabled | `opacity-50 cursor-not-allowed` |

### Usage Rules

- Use for save, add-to-list, remove, expand/collapse, and close actions on cards and list items
- Always provide `ariaLabel` — this is an icon-only button with no visible text
- Do not use for primary actions — use Button instead
- Do not use for navigation

---

## 10. SectionHeader

**Purpose:** Consistent section title with optional eyebrow label for dividing content areas.

**File:** `src/components/SectionHeader.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | yes | — | Section heading text |
| `eyebrow` | `string` | no | — | Small uppercase label above the title |
| `action` | `ReactNode` | no | — | Optional right-aligned action (link, button, count) |
| `level` | `'h2' \ | 'h3'` | no | `'h2'` | Rendered heading element and text size |

### Visual Structure

```
Container: flex justify-between items-baseline mb-md

Eyebrow:  text-label uppercase text-text-tertiary mb-xs (block above title)
Title h2: text-h2 text-text-primary
Title h3: text-h3 text-text-primary
Action:   text-small text-primary (right-aligned)
```

### States

| State | Styles |
| --- | --- |
| Default | Static display |
| With eyebrow | Eyebrow renders above title in a column layout |
| With action | Action renders right-aligned |

### Usage Rules

- Use to divide product library by category, shopping list sections, and preference groups
- Use `h2` for top-level page sections, `h3` for subsections within cards or panels
- Do not use inside cards — card titles are part of the card's own layout
- The `action` slot is for lightweight actions like "See all" or a count badge, not full buttons

---

## 11. EmptyState

**Purpose:** Centered message for when a list or section has no content.

**File:** `src/components/EmptyState.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | yes | — | Brief headline (e.g., "No saved products yet") |
| `description` | `string` | no | — | Supporting text explaining what to do |
| `icon` | `ReactNode` | no | — | Optional illustration or icon |
| `action` | `ReactNode` | no | — | Optional CTA button |

### Visual Structure

```
Container: flex flex-col items-center justify-center text-center py-3xl px-lg

Icon:        text-text-placeholder mb-md (rendered at 48px if SVG/emoji)
Title:       text-h3 text-text-primary mb-xs
Description: text-body text-text-secondary max-w-[320px]
Action:      mt-lg (renders a Button or link)
```

### States

| State | Styles |
| --- | --- |
| Default | Static centered layout |
| With action | CTA button appears below description |
| Without icon | Title moves to top |

### Usage Rules

- Use in product library (no saved products), shopping list (empty cart), and search results (no matches)
- Always provide a `title`. Description and action are optional but recommended.
- Keep title under 40 characters, description under 100 characters
- Do not use for error states — errors should explain what went wrong and how to fix it

---

## 12. Chip

**Purpose:** Pill-shaped, toggleable filter element for selecting categories, certifications, or ingredient filters.

**File:** `src/components/Chip.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | yes | — | Chip label |
| `selected` | `boolean` | no | `false` | Whether the chip is active |
| `onClick` | `() => void` | yes | — | Toggle handler |
| `disabled` | `boolean` | no | `false` | Disables interaction |

### Visual Structure

```
Container: inline-flex items-center rounded-full px-md py-xs
           text-small cursor-pointer border-none
           transition-colors duration-fast ease-default

Unselected: bg-surface-muted text-text-secondary
  Hover:    bg-surface-divider

Selected:   bg-primary-light text-primary-dark
  Hover:    bg-primary-light text-primary (slight darken)
```

### States

| State | Styles |
| --- | --- |
| Default (unselected) | `bg-surface-muted text-text-secondary` |
| Hover | `bg-surface-divider` |
| Selected | `bg-primary-light text-primary-dark` |
| Focus | `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` |
| Disabled | `opacity-50 cursor-not-allowed` |

### Usage Rules

- Use for filtering product library by category and for toggling certification filters
- Use in horizontal scrollable rows or flex-wrap groups
- Do not use for displaying static metadata — use Badge for that
- Do not use for preference tags that need removal — use PreferenceTag for that

---

## 13. IngredientList

**Purpose:** Stacked list of ingredients, each with a mini rating and one-line safety explanation.

**File:** `src/components/IngredientList.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `ingredients` | `Ingredient[]` | yes | — | Array of ingredient objects |
| `maxItems` | `number` | no | — | Limits visible rows; omit to show all. Used in ComparisonPanel to show key differences only |
| `highlightAvoided` | `boolean` | no | `true` | Emphasizes ingredients matching user's avoid list |

```ts
interface Ingredient {
  name: string
  rating: 'clean' | 'caution' | 'avoid'
  reason: string       // One-line safety explanation
  isUserAvoided?: boolean  // Matches user's "ingredients to avoid" list
}
```

### Visual Structure

```
Container: flex flex-col gap-xs

Each row: flex items-start gap-sm py-sm
          border-b border-surface-divider last:border-none

  Rating:  <RatingBadge size="sm" />
  Content: flex-1
    Name:    text-h4 text-text-primary
    Reason:  text-small text-text-secondary mt-xs
  Avoided:  (if isUserAvoided && highlightAvoided)
            <Badge variant="avoid">In your avoid list</Badge>
```

### States

| State | Styles |
| --- | --- |
| Default | All ingredients listed with their ratings |
| User-avoided highlighted | Avoided ingredients get an extra Badge callout |
| Loading | 4 skeleton rows: `bg-surface-muted rounded-badge animate-pulse h-[20px]` at staggered widths (100%, 85%, 90%, 75%). Used while AI ingredient analysis is processing. |
| Empty | Should not render — parent handles empty state |

### Usage Rules

- Use inside Modal for product detail / ingredient breakdown views
- Each ingredient gets its own row with a RatingBadge and a reason from the AI analysis
- The `isUserAvoided` flag is set by cross-referencing the user's saved preferences — this is how "ingredients to avoid" are called out
- Do not use outside of ingredient analysis contexts

---

## 14. ComparisonPanel

**Purpose:** Side-by-side layout for comparing two products across rating, ingredients, and certifications.

**File:** `src/components/ComparisonPanel.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `products` | `[Product, Product]` | yes | — | Exactly two products to compare |
| `recommendation` | `string` | no | — | AI-generated recommendation text |
| `loading` | `boolean` | no | `false` | Shows skeleton placeholder while AI generates comparison |

```ts
interface Product {
  name: string
  brand: string
  rating: 'clean' | 'caution' | 'avoid'
  ingredients: Ingredient[]
  certifications: string[]
}
```

### Visual Structure

```
Container: bg-surface-card rounded-card p-lg

Header row: grid grid-cols-2 gap-lg mb-lg
  Each col: text-h3 text-text-primary (product name)
            text-small text-text-secondary (brand)
            <RatingBadge /> below

Ingredient rows: grid grid-cols-2 gap-lg
  Each cell: <IngredientList /> truncated to key differences

Certification row: grid grid-cols-2 gap-lg mt-md
  Each cell: flex flex-wrap gap-xs
             <Badge variant="accent" /> per certification

Recommendation: mt-lg p-md bg-primary-light rounded-card
                text-body text-primary-dark
```

### States

| State | Styles |
| --- | --- |
| Default | Two products displayed side by side |
| With recommendation | AI recommendation box appears at bottom |
| Loading | Skeleton placeholder while AI generates comparison |

### Usage Rules

- Use inside a Modal (size `lg`) for the comparison feature
- Always requires exactly two products — do not support 1 or 3+
- Ingredient lists should highlight differences, not show every ingredient
- Do not use for general product display — use ProductCard

---

## 15. PreferenceTag

**Purpose:** Removable pill displaying a saved ingredient, brand, or certification preference.

**File:** `src/components/PreferenceTag.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `string` | yes | — | The preference text (ingredient name, brand, certification) |
| `type` | `'ingredient' \ | 'brand' \ | 'certification'` | yes | — | Determines icon/color hint |
| `onRemove` | `() => void` | yes | — | Called when the remove button is clicked |

### Visual Structure

```
Container: inline-flex items-center gap-xs rounded-full
           px-md py-xs text-small
           transition-colors duration-fast ease-default

Type colors:
  ingredient:    bg-avoid-tint text-avoid
  brand:         bg-clean-tint text-clean
  certification: bg-primary-light text-primary-dark

Remove button: ml-xs text-current opacity-40 hover:opacity-70
               cursor-pointer bg-transparent border-none
               text-small leading-none
               (renders ×)
```

### States

| State | Styles |
| --- | --- |
| Default | Colored pill with remove button |
| Hover (remove) | Remove icon opacity increases |

### Usage Rules

- Use in the preference management section for displaying saved ingredients-to-avoid, trusted brands, and valued certifications
- Always provide `onRemove` — preferences must be removable
- Do not use for display-only tags — use Badge for those
- Do not use for filter toggles — use Chip for those

---

## 16. ShoppingListItem

**Purpose:** Compact row for shopping list items, optimized for scanning and checking off.

**File:** `src/components/ShoppingListItem.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` | yes | — | Product name |
| `brand` | `string` | yes | — | Brand name |
| `rating` | `'clean' \ | 'caution' \ | 'avoid'` | yes | — | Product rating |
| `checked` | `boolean` | no | `false` | Whether item has been checked off |
| `onToggle` | `() => void` | yes | — | Toggle checked state |
| `onRemove` | `() => void` | yes | — | Remove from shopping list |
| `onClick` | `() => void` | no | — | Opens product detail modal |

### Visual Structure

```
Container: flex items-center gap-md py-sm px-md
           bg-surface-card rounded-card
           transition-opacity duration-fast ease-default

Checkbox:  w-5 h-5 rounded-full border-2 border-surface-divider
           cursor-pointer flex-shrink-0
  Checked: bg-primary border-primary (with checkmark icon in text-surface-card)

Content:   flex-1 min-w-0
  Name:    text-h4 text-text-primary truncate
  Brand:   text-small text-text-tertiary

Rating:    <RatingBadge size="sm" />
Remove:    <IconButton icon="×" variant="ghost" size="sm" />
```

### States

| State | Styles |
| --- | --- |
| Default | Unchecked, full opacity |
| Checked | Checkbox filled with `bg-primary`, text gets `opacity-50 line-through` |
| Hover | Subtle `bg-surface-muted` background |

### Usage Rules

- Use exclusively in the shopping list view
- Do not use for product library items — use ProductCard for those
- The checked state is visual feedback for "I bought this", not permanent deletion
- Provide both `onToggle` (check off) and `onRemove` (delete from list)

---

## 17. SwapCard

**Purpose:** Displays a cleaner product alternative with a Swap Score when the searched product is rated caution or avoid.

**File:** `src/components/SwapCard.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `alternative` | `Product` | yes | — | The suggested cleaner product |
| `swapScore` | `number` | yes | — | 0-100 score indicating how much cleaner the swap is |
| `reason` | `string` | yes | — | One-sentence AI explanation of why this swap is better |
| `onAddToList` | `() => void` | no | — | Add the alternative to shopping list |
| `onViewDetails` | `() => void` | no | — | Open full product detail for the alternative |
| `loading` | `boolean` | no | `false` | Shows skeleton placeholder while AI finds alternative |

```ts
interface Product {
  name: string
  brand: string
  rating: 'clean' | 'caution' | 'avoid'
  category: string
}
```

### Visual Structure

```
Container: bg-primary-light rounded-card p-lg

Header:    flex justify-between items-start gap-md mb-md
  Label:   text-label uppercase text-text-tertiary
           "Cleaner alternative"
  Score:   text-h1 text-primary font-bold (e.g., "87%")
           ⚠ font-bold (700) intentionally overrides text-h1's 600 weight — the score
             is the most prominent number in the card and needs the extra visual weight.
           text-small text-text-tertiary below ("cleaner swap")

Product:   flex items-center gap-md mb-md
  Name:    text-h4 text-text-primary
  Brand:   text-small text-text-tertiary
  Rating:  <RatingBadge />

Reason:    text-body text-text-secondary mb-md

Actions:   flex gap-sm
           <Button variant="primary" size="sm">Add to list</Button>
           <Button variant="ghost" size="sm">View details</Button>
```

### States

| State | Styles |
| --- | --- |
| Default | Displays the swap suggestion |
| Loading | Skeleton placeholder while AI finds alternative |
| No swap available | Not rendered — parent handles this case |

### Usage Rules

- Only display when the evaluated product is rated `caution` or `avoid`
- Renders below the evaluated product's detail view
- The Swap Score is personalized based on the user's saved preferences (weighted by their avoided ingredients, trusted brands, valued certifications)
- Do not show for products already rated `clean`
- Only one SwapCard per evaluated product

---

## 18. ScoreGauge

**Purpose:** Visual progress indicator showing the user's overall Clean Confidence Score.

**File:** `src/components/ScoreGauge.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `score` | `number` | yes | — | 0-100 percentage |
| `label` | `string` | no | `'Your shelf is'` | Text above the score |
| `size` | `'sm' \ | 'lg'` | no | `'lg'` | Small for inline, large for dashboard |

### Visual Structure

```
Container: flex flex-col items-center text-center

Label:     text-label uppercase tracking-wide text-text-tertiary mb-xs

Score:     (circular progress ring)
  Ring bg:   stroke-surface-muted
  Ring fill: stroke-primary (dasharray calculated from score)
  Number:    text-display text-primary (centered inside ring, e.g., "74%")

Size sm:   Ring 64px diameter, number uses text-h2
Size lg:   Ring 120px diameter, number uses text-display

Subtitle:  text-small text-text-secondary mt-xs ("clean")
```

### States

| State | Styles |
| --- | --- |
| Default | Ring filled to score percentage |
| Zero | Empty ring with `text-text-placeholder` for the number |
| Animating | Ring fill animates on mount using `duration-slow ease-enter` |

### Usage Rules

- Use on the product library dashboard / home view
- Score is calculated from the ratio of `clean`-rated products to total saved products
- Use `sm` size when displayed inline (e.g., in a sidebar or header)
- Use `lg` size for the main dashboard placement
- Do not use for individual product scores — this is an aggregate metric only

---

## 19. NavBar

**Purpose:** Primary app navigation. Bottom tab bar on mobile, vertical sidebar on desktop.

**File:** `src/components/NavBar.tsx`

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `activeTab` | `'home' \ | 'library' \ | 'list' \ | 'preferences'` | yes | — | Currently active tab |
| `onNavigate` | `(tab: string) => void` | yes | — | Called when a tab is tapped |

### Nav Items

| Key | Label | Icon | Description |
| --- | --- | --- | --- |
| `home` | Home | house icon | Search and dashboard |
| `library` | Library | bookmark icon | Saved products |
| `list` | Shopping List | list/cart icon | Shopping list |
| `preferences` | Preferences | sliders/settings icon | Ingredient, brand, certification preferences |

### Visual Structure

```
Mobile (below md): fixed bottom-0 left-0 right-0 z-sticky
  Container: bg-surface-card border-t border-surface-divider
             flex justify-around items-center
             px-sm py-xs
             safe-area: pb-[env(safe-area-inset-bottom)]

  Each tab:  flex flex-col items-center gap-xs py-xs px-sm
             cursor-pointer transition-colors duration-fast ease-default
    Icon:    w-6 h-6
    Label:   text-micro

  Inactive:  text-text-tertiary
  Active:    text-primary

Desktop (md and above): fixed left-0 top-0 bottom-0 w-[240px] z-sticky
  Container: bg-surface-card border-r border-surface-divider
             flex flex-col py-lg px-md

  App name:  text-h3 text-text-primary px-md mb-2xl

  Each tab:  flex items-center gap-md px-md py-sm
             rounded-card cursor-pointer
             transition-colors duration-fast ease-default
    Icon:    w-5 h-5
    Label:   text-body

  Inactive:  text-text-secondary
  Active:    bg-primary-light text-primary font-medium
  Hover:     bg-surface-muted (inactive only)
```

### States

| State | Styles |
| --- | --- |
| Inactive tab | `text-text-tertiary` (mobile) / `text-text-secondary` (desktop) |
| Active tab | `text-primary` (mobile) / `bg-primary-light text-primary font-medium` (desktop) |
| Hover (desktop, inactive) | `bg-surface-muted` |
| Focus | `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` |

### Layout Integration

The NavBar controls the page layout shell. The parent layout should account for it:
- **Mobile:** Add `pb-[72px]` to the main content area to prevent content from hiding behind the fixed bottom bar
- **Desktop:** Add `ml-[240px]` to the main content area to sit beside the fixed sidebar

### Usage Rules

- Always visible on every screen — this is the persistent app shell
- Exactly one tab is active at a time
- Do not add more than 5 tabs — mobile bottom bars become cramped beyond that
- Do not hide the NavBar on any view (including modals — modals overlay above it via z-index)
- The border on the NavBar is the one exception to the "no borders on cards" rule — navigation chrome uses a single 1px `border-surface-divider` to separate from content

---

## Component Dependency Map

```
ProductCard ──> RatingBadge, Badge, IconButton
SwapCard ──> RatingBadge, Button
ComparisonPanel ──> RatingBadge, Badge, IngredientList
IngredientList ──> RatingBadge, Badge
ShoppingListItem ──> RatingBadge, IconButton
Modal ──> IconButton
```

## Build Priority

Build these in dependency order (leaf components first):

1. **Tier 1 — Primitives:** Button, Badge, RatingBadge, IconButton, Chip
2. **Tier 2 — Composites:** Card, SearchInput, SectionHeader, EmptyState, PreferenceTag, ScoreGauge, ShoppingListItem
3. **Tier 3 — Features:** IngredientList, ComparisonPanel, SwapCard, Modal
4. **Existing (modify):** ProductCard, Toast
