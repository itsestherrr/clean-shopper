# SearchInput — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/search-input`. This markdown is the written reference; the live page has the rendered states. Design decisions are tracked in `/spec/decisions` (SI-01 → SI-03).

**File:** `src/components/SearchInput.tsx`

## Overview

Primary control on the Search screen. Pill-shaped text input for product queries with a left search icon, a right clear button that appears when the value is non-empty, and a loading swap when a search is in flight.

SearchInput belongs to the **control family** (Button, IconButton, NavBar tabs) — full pill shape — and uses the system's single focus-visible convention: a 2px amethyst ring at 2px offset.

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | yes | — | Controlled value. |
| `onChange` | `(v: string) => void` | yes | — | Fires on keystroke and when clear is pressed. |
| `onSubmit` | `() => void` | no | — | Fires on Enter. |
| `placeholder` | `string` | no | `'Search...'` | Placeholder text shown when empty. |
| `loading` | `boolean` | no | `false` | Swaps left search icon for a spinner. See SI-03 note below — the main loading signal lives on the results surface, not here. |
| `disabled` | `boolean` | no | `false` | 50% opacity, `cursor-not-allowed`, no keyboard interaction. |
| `autoFocus` | `boolean` | no | `false` | Focus on mount. |

## Visual spec

### Shape & size
- **Shape:** `rounded-full` (pill — control family)
- **Height:** 44px via `py-sm`
- **Padding:** `pl-[44px]` for left icon; `pr-[44px]` when value is present (room for clear), otherwise `pr-lg`
- **Width:** full container width
- **Background:** `bg-surface-card`

### Border & focus (SI-01)

| State | Border / ring |
| --- | --- |
| Rest | Inset 1.5px `surface-divider` |
| Focused (keyboard) | Rest border **plus** 2px amethyst outline at 2px offset — the system's single focus-visible convention |
| Disabled | Rest border, 50% opacity on everything |

### Left slot
- Rest: search glyph (stroke 2px, `text-ink-tertiary`)
- Loading: spinner in same slot, same color

### Right slot (SI-02)
- Only visible when `value` is non-empty and not disabled
- Uses **IconButton** (`variant="ghost"` `size="sm"`) — same primitive as Modal close, Toast dismiss
- `ariaLabel="Clear search"`

### Typography
- Value: `text-body text-ink-primary`
- Placeholder: `text-ink-placeholder`

## States

| State | Visual |
| --- | --- |
| Rest, empty | Divider border. Muted placeholder. Search icon left. |
| Rest, filled | Divider border. Primary ink text. Search icon left. Clear IconButton right. |
| Focused (keyboard) | 2px amethyst outline ring added at 2px offset. |
| Focused (mouse) | Border only — `focus-visible` does not trigger on click. |
| Loading | Spinner replaces search icon. Rest of the input behaves normally (user can keep typing, clear). |
| Disabled | 50% opacity, no interaction, no clear button. |

## Motion

- `transition-shadow duration-fast ease-out-soft` on the border shadow.
- No translate, no scale. The input is a text field the user lives in; no motion on focus.

## Accessibility

- Native `<input type="text">` — standard keyboard behavior.
- Focus ring uses `:focus-visible` so mouse clicks don't draw the ring, but Tab navigation does.
- Clear button uses IconButton which already carries `aria-label`, Enter/Space activation, and 28px hit target.
- `placeholder` is never the sole source of information — the actual label (when applicable) lives above the input in its parent.

## Anti-patterns

- ❌ Don't add a submit button inside the pill. The input commits on Enter; a visible submit is redundant and clutters the pill shape.
- ❌ Don't add any motion on focus (scale, translate, lift). SI-01 declined C explicitly — a text field the user lives in for several seconds shouldn't "press down" every time it gains focus.
- ❌ Don't hide the clear button behind hover (SI-02 declined C) — fails touch discoverability.
- ❌ Don't carry the loading signal here alone. The primary loading signal belongs on the results surface (skeleton cards / streaming status). The spinner in the left slot is the quiet secondary confirmation.

## Decisions

- **SI-01** — Focus treatment → **B · system focus-visible ring** (one convention across the system)
- **SI-02** — Clear button affordance → **B · IconButton ghost sm** (one primitive for close/dismiss across components)
- **SI-03** — Loading signal → **Deferred**. Parked pending a separate page-level decision for what the SearchPage results area does during a Claude call. Once that is decided, SI-03 collapses to "stay consistent with the page signal."
