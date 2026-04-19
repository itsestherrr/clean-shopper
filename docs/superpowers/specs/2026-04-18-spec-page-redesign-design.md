# ProductCard Spec Page Redesign — Design Document

**Date:** 2026-04-18
**Status:** Approved, ready for implementation
**Branch:** feat/design-system-tailwind-and-core-components

---

## Context

The current `/spec/product-card` page was built with 12 sections including a 20-cell states matrix (variant × size × state). An audit of 6 production design systems (Polaris, Gestalt, Base Web, Primer, Carbon, Material Design) found that no system uses a cross-product matrix. The page also duplicates content that already lives in the markdown spec at `docs/component-spec/product-card.md` (tokens, props, composition, interaction patterns).

The audit is at `docs/comparisons/design-system-spec-audit.md`.

## Goal

Rebuild the spec page as a focused visual showcase — 6 sections instead of 12. States rebuilt as Material Design-style horizontal strips. Engineering reference content stays in the markdown spec where it belongs.

## Audience

Portfolio reviewers and the user herself. This is a showcase, not an implementation reference. Engineers/Claude Code use the markdown spec.

---

## Page structure

Long-scroll with sticky TOC sidebar (same layout as current). Route stays at `/spec/product-card`.

### Section 1 — Overview

Same as current: one-line purpose, a single hero ProductCard rendered live, a JSX usage example. **Change:** fold the loading skeleton in as a second example below the hero card instead of a separate section.

### Section 2 — Variants

Same as current: default and selectable (pre-selected) rendered side by side in a 2-column grid with labels.

### Section 3 — Sizes

Same as current: default card on the left, three stacked compact cards on the right.

### Section 4 — States (rebuilt)

**Replace the 20-cell matrix with Material Design-style strips.**

One horizontal row of 5 cards per variant, each card forced into one state via the existing StateFrame/CSS override approach. Each card is labeled underneath with the state name.

Layout:
- Heading: "Default variant"
- Row of 5 cards: Default → Hover → Pressed → Focus → Disabled
- Heading: "Selectable variant"
- Row of 5 cards: Default → Hover → Pressed → Focus → Disabled

No size axis — states are shown at default size only. Compact size is already demonstrated in Section 3, and showing it again across 5 states adds no visual information.

The Default card in each row is a live interactive ProductCard (not wrapped in StateFrame). The other 4 are visually locked via the existing `.spec-force-hover/pressed/focus` CSS classes.

### Section 5 — Do / Don't

Same as current: 4 paired cards with green-tinted Do and red-tinted Don't, each with a "Why" line.

### Section 6 — Accessibility

Same as current: 5 sub-sections (Keyboard, Focus, Screen readers, Color contrast, Motion) using the existing `AccessSubSection` helper.

---

## Sections removed

These sections are cut from the live page. Their content already exists in the markdown spec at `docs/component-spec/product-card.md`.

| Cut section | Reason |
|---|---|
| Loading | Folded into Overview as a second example |
| Interaction patterns | Prose — belongs in markdown spec |
| Tokens used | Duplicates markdown spec exactly |
| Composition | ASCII tree — belongs in markdown spec |
| Props table | Duplicates markdown spec exactly |
| Changelog | Not a convention any audited system follows |

## TOC update

The sticky TOC reduces from 12 entries to 6: Overview, Variants, Sizes, States, Do / Don't, Accessibility.

## Implementation approach

Single rewrite of `src/features/spec/ProductCardSpecPage.tsx`. The existing helpers (`StateFrame`, `DoDontPair`, `AccessSubSection`) stay. `StatesRow` and `TokenGroup` helpers are removed. The `SECTIONS` array shrinks from 12 to 6.

The three `.spec-force-*` CSS classes in `globals.css` stay — they're still used by the states strip.

No other files change. The markdown spec, `component-spec.md` pointer, and `CLAUDE.md` reference are unaffected.

## Out of scope

- Tabs (Carbon/Material style) — adds routing complexity for one component
- Token tables (Carbon style) — duplicates markdown spec
- Auto-generated props from TypeScript (Gestalt style) — overkill for one component
- Anatomy diagrams (Carbon/Material style) — useful but separate effort
- Adding spec pages for other components
