# IconButton — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/icon-button`. This markdown is the written reference; the live page has the rendered states. Design decision is tracked in `/spec/decisions` (IB-01).

**File:** `src/components/IconButton.tsx`

## Overview

Circular button for icon-only actions — save heart on ProductCard, close on Modal, nav icons in NavBar, dismiss on Toast. Always requires an `ariaLabel` since there's no visible text.

IconButton is the **workhorse control**: it carries no signature shadow or motion of its own. ProductCard and Button already own the amethyst/lime signature of the system — adding shadow to IconButton would compete with the ProductCard hover (20+ save hearts per search grid) or nest lime-shadow-on-lime-shadow when a heart sits on a card. (See IB-01.)

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `icon` | `ReactNode` | yes | — | The icon glyph. Phosphor recommended; plain chars like `×` also work. |
| `onClick` | `(e: MouseEvent) => void` | yes | — | Click handler. Accepts event so consumers can `stopPropagation`. |
| `variant` | `'default' \| 'ghost'` | no | `'default'` | Visual weight. `default` for standalone actions, `ghost` inside other components. |
| `size` | `'sm' \| 'md'` | no | `'md'` | `md` (36px) is the baseline touch target. `sm` (28px) is for tight layouts like card footers. |
| `active` | `boolean` | no | `false` | Filled state — "this action is currently applied" (saved, selected, on). |
| `ariaLabel` | `string` | yes | — | Required — no visible text to fall back on. |
| `disabled` | `boolean` | no | `false` | Disables interaction. Renders at 50% opacity. |

## Variants

| Variant | When to use | When not to use |
| --- | --- | --- |
| `default` | Standalone actions where the button needs to read as interactive on its own — the save heart overlaid on a ProductCard image. | Inside another component's chrome (Modal header, card footer) where the parent already provides visual context. |
| `ghost` | Inside other components — Modal close, NavBar icons, card footers. Transparent bg lets the parent's surface show through. | Standalone actions on a blank surface — users won't see it. |

## Sizes

| Size | Dimensions | Icon size | When to use |
| --- | --- | --- | --- |
| `md` | 36 × 36 | 18px | Default. Touch target for primary icon actions. |
| `sm` | 28 × 28 | 15px | Tight layouts — card footers, Modal headers, NavBar when space is constrained. |

## Visual spec

### Default variant

| State | Background | Icon color |
| --- | --- | --- |
| Rest | `bg-surface-muted` (#F5F2F8) | `text-ink-secondary` (#6B4F8F) |
| Hover | `bg-surface-divider` (#E9E6ED) | `text-ink-secondary` |
| Active (filled) | `bg-amethyst-5` (#F5F2F8) | `text-amethyst` (#3F1F68) |
| Disabled | Rest bg | Rest icon, 50% opacity |

### Ghost variant

| State | Background | Icon color |
| --- | --- | --- |
| Rest | transparent | `text-ink-tertiary` (#ADA1BE) |
| Hover | `bg-surface-muted` (#F5F2F8) | `text-ink-secondary` (#6B4F8F) |
| Active (filled) | transparent | `text-amethyst` (#3F1F68) |
| Disabled | transparent | Rest icon, 50% opacity |

### Motion

- No shadow, no translate, no scale — color-only.
- `transition-colors duration-fast ease-out-soft` on all color changes.
- No press animation. (See IB-01: motion was intentionally declined to avoid competing with ProductCard and Button.)

### Focus

`focus-visible:outline-2 focus-visible:outline-amethyst focus-visible:outline-offset-2` — matches the rest of the system.

## Where it's used

| Surface | Variant | Size | Notes |
| --- | --- | --- | --- |
| ProductCard save heart | `default` + custom frosted bg | `sm` | Overridden bg: `rgba(255,255,255,0.85)` + `backdrop-filter: blur(6px)` because it overlays the product image. `active=true` when saved. |
| Modal close | `ghost` | `md` | In the Modal header. `ariaLabel="Close modal"`. |
| NavBar tab icons | `ghost` | `sm` | Active tab is `active=true`; others stay ghost/inactive. |
| Toast dismiss | `ghost` | `sm` | Inside the toast body. `ariaLabel="Dismiss"`. |

## Accessibility

### Keyboard
- **Focus:** native `<button>` — reachable via Tab.
- **Activation:** Enter and Space trigger `onClick`.
- **Disabled:** HTML `disabled` attribute removes from tab order.

### Screen readers
- `ariaLabel` is **required** — there's no visible text.
- Active state is communicated through color only — consider toggling the label to reflect state where it matters (e.g. `"Save to library"` vs `"Remove from library"`).

## Anti-patterns

- ❌ Don't add text labels — if you need text, use `Button` with `icon` prop instead.
- ❌ Don't use `default` variant inside other components' chrome — use `ghost`.
- ❌ Don't add shadows or flat-offset treatments. (See IB-01.)
- ❌ Don't nest two IconButtons side by side without spacing — minimum `gap-xs` (4px).
