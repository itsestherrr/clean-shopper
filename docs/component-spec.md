# Component Specification — Index

**Version:** 2.0 (v4 design system)
**Last updated:** 2026-04-20

This is a pointer file. Each component has its own deep spec under `docs/component-spec/<name>.md` and a live interactive page under `docs/spec/<name>.html`. Design decisions behind each component are logged in `docs/spec/decisions.html`.

**Source of truth for tokens:** `src/styles/globals.css` (Tailwind v4 `@theme`). Never hardcode hex colors, pixel font sizes, or spacing values in components. If a needed token does not exist, add it to `@theme` first.

---

## How to use this index

1. Before creating anything new, check here for an existing component that covers the pattern.
2. If one exists, open its deep spec (`component-spec/<name>.md`) — that's the contract.
3. If nothing covers it, propose a new component in the Decisions log before writing code.
4. All new components go through the same three-layer pattern: **decision → deep spec md → live spec html**.

---

## Components

Legend: **v4** = specced under v4 · **pre-v4** = built under v3, needs refactor · **planned** = not built yet

### Primitives

| Component | Status | Deep spec | Live page | Decisions |
| --- | --- | --- | --- | --- |
| **Button** | v4 ✓ | [`component-spec/button.md`](component-spec/button.md) | [`/spec/button`](spec/button.html) | `decisions.html#button` (B-01 → B-13) |
| **Badge** — StatusBadge · CategoryTag · AccentBadge | v4 ✓ | [`component-spec/badge.md`](component-spec/badge.md) | [`/spec/badge`](spec/badge.html) | `decisions.html#badge` (BD-01 → BD-05) |
| **IconButton** | v4 ✓ | [`component-spec/icon-button.md`](component-spec/icon-button.md) | [`/spec/icon-button`](spec/icon-button.html) | `decisions.html#icon-button` (IB-01) |
| **IngredientDot** | planned | — | — | — |

### Composites

| Component | Status | Deep spec | Live page | Decisions |
| --- | --- | --- | --- | --- |
| **ProductCard** | v4 ✓ | [`component-spec/product-card.md`](component-spec/product-card.md) | [`/spec/product-card`](spec/product-card.html) | — |
| **SearchInput** | pre-v4 | — | — | — |
| **EmptyState** | pre-v4 | — | — | — |
| **Modal** | pre-v4 | — | — | — |
| **Toast** | v4 ✓ | [`component-spec/toast.md`](component-spec/toast.md) | [`/spec/toast`](spec/toast.html) | `decisions.html#toast` (TS-01, TS-02) |

### Features

| Component | Status | Deep spec | Live page | Decisions |
| --- | --- | --- | --- | --- |
| **IngredientList** | pre-v4 | — | — | — |
| **IngredientBar** | pre-v4 | — | — | — |

### Shell

| Component | Status | Deep spec | Live page | Decisions |
| --- | --- | --- | --- | --- |
| **NavBar** | pre-v4 | — | — | — |

### Planned (not yet built)

- **Card** (generic container — separate from ProductCard)
- **SectionHeader**
- **Chip** (filter / toggle, not badge)
- **ComparisonPanel**
- **PreferenceTag**
- **ShoppingListItem**
- **SwapCard**
- **ScoreGauge**

---

## Deprecated / removed

- **RatingBadge** → absorbed into the new Badge spec as **StatusBadge**. See BD-01.

---

## Build pattern

Every component goes through this flow:

1. **Decisions** — open questions logged in `docs/spec/decisions.html` under the component's tab. Each decision has options with live visuals. User picks; decision flips to Decided.
2. **Deep spec** — `docs/component-spec/<name>.md` written after decisions lock. Props, variants, states, accessibility, tokens, do/don't, decision references.
3. **Live page** — `docs/spec/<name>.html` renders real markup using v4 tokens, matching the deep spec exactly.
4. **Code** — `src/components/<Name>.tsx` implements the spec. Typecheck must pass. Backward-compat with consumers or coordinate migration.

---

## Archive

The v3 component spec (20 components documented against pre-v4 tokens) is preserved at `docs/component-spec.md.v3-archive` for reference only. Do not use it as source of truth.
