# EmptyState — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/empty-state`. This markdown is the written reference; the live page has the rendered states. Design decision is tracked in `/spec/decisions` (ES-01).

**File:** `src/components/EmptyState.tsx`

## Overview

Surface for "no content yet" moments — empty Library, empty Search results, and any future "you have nothing here" state. Wraps an icon glyph + title + optional description + optional action in a soft white card with a divider border.

EmptyState is a **framed surface** in the same family as Modal (`24px` symmetric) and the surface-card baseline (`16px` symmetric). It's intentionally not signed — empty states aren't where the brand should sing. The frame's job is to give the message an anchor when it sits on a page that has chrome around it (filter rows, headers). (See ES-01.)

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | `string` | yes | — | Single-line headline. h3 weight. |
| `description` | `string` | no | — | One sentence explaining what to do next. Capped at `max-w-[320px]`. |
| `icon` | `ReactNode` | no | — | Stroke-style SVG glyph. The wrapper provides color (`text-ink-tertiary`), 32px size, and spacing — your SVG only needs `currentColor` and a viewBox. **No emoji.** |
| `action` | `ReactNode` | no | — | Usually a `<Button>` that gets the user to the next thing. Renders below the description. |

## Visual spec

| Token | Value |
| --- | --- |
| Background | `bg-surface-card` (white) |
| Border | `1.5px solid surface-divider` |
| Radius | `rounded-card` (16px symmetric) |
| Padding | `py-3xl px-lg` |
| Layout | flex column, centered |
| Icon wrapper | `w-14 h-14`, `text-ink-tertiary`, SVG forced to 32px |
| Title | `text-h3 text-ink-primary` |
| Description | `text-body text-ink-secondary`, `max-w-[320px]` |
| Action spacing | `mt-lg` from description |

No motion. No shadow.

## Icon guidance

- Use **stroke-style SVGs** with `stroke="currentColor"` so the wrapper's color flows through. Stroke width `1.6` matches the in-system pattern.
- Prefer 24px viewBox.
- Don't use emoji — visual weight is unpredictable across platforms and they don't pick up the theme color.
- Glyphs already in use:
  - **Heart** (Library empty) — outlined, single path
  - **Magnifier with horizontal slash** (Search no results) — circle + handle + interior dash, "search came up empty"

## Where it's used

| Surface | Icon | Title | Description | Action |
| --- | --- | --- | --- | --- |
| LibraryPage (empty saved list) | heart | "No saved products yet" | "Tap the heart on any product to save it here." | — (none today) |
| SearchPage (no results) | magnifier-slash | "No products found" | contextual to query / filters | — (none today) |

> **Design note:** Both real consumers omit the action prop. That's a gap — empty states should typically tell the user what to do next *and* give them a way to do it. Future: Library could surface a "Browse products" Button; Search could surface "Clear filters" or a popular-search chip.

## Accessibility

- Pure presentational. No keyboard interaction except via the optional `action` button.
- Title uses an `<h3>` — the parent page should not also render an h3 inside the empty state surface, since this one will already be in the heading hierarchy.
- Icon is decorative — don't add an `aria-label`. The title carries the meaning.

## Anti-patterns

- ❌ Don't use emoji — they don't theme, sizing is unpredictable, and they pull visual weight away from the title.
- ❌ Don't add brand signature here (asym shadow, lime accent, amethyst disc). Empty isn't where the brand should sing — see ES-01 rationale.
- ❌ Don't stack EmptyStates inside other EmptyStates. If you have nested empty containers, only the innermost one renders this component.
- ❌ Don't use it for loading or error — those are distinct concepts and need different visual + a11y treatment.

## Decisions

- **ES-01** — Visibility → **B · Framed surface card** (anchored, neutral, no signature; saves the brand's loudest treatment for places where it carries weight)
