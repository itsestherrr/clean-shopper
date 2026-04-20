# Design System: Clean Shopper

**Version:** 4.0 · Amethyst Apothecary
**Last Updated:** 2026-04-20
**Source of truth:** `docs/spec/design-system.html` (live spec) + `src/styles/globals.css` (tokens)

---

## How to Use This Document

This file is referenced by `CLAUDE.md` and read by Claude Code at the start of every session. Apply these tokens for all UI work. Do not hardcode hex values, pixel sizes, or spacing values in components. Reference Tailwind token classes generated from `src/styles/globals.css` `@theme`.

---

## Brand Direction

Clean Shopper is editorial, considered, trustworthy — a research tool that treats its user like someone who reads labels. The palette is amethyst-forward with a warm cream ground. Lime plays the loud accent; everything else is quiet supporting color. Asymmetric card radii + flat-offset amethyst shadows form the signature shape language.

---

## Color System — Role Lock

The system is organized in three tiers. **Never mix tiers.**

### Tier 1 · Brand (identity)
Each brand color has exactly one job. Drift kills the system.

| Token | Hex | Role |
| --- | --- | --- |
| `amethyst` | `#3F1F68` | Signature. Ink, card borders, primary CTA fill, flat-offset card shadow. Only color with a full ramp. |
| `lime` | `#C9EC2D` | Accent. Hero moments, premium badges. **Max one or two per screen.** Foreground on amethyst only — fails contrast on cream/white. |
| `slate` | `#3B7080` | Interactive. Links, focus rings, info banner accents. Never a card shadow. |
| `lilac` | `#ADA8B6` | Favorite heart family only. Tone-on-tone saved states. |
| `stone` | `#C9BDA8` | Category tags. One color for all categories — categories are non-judgmental. |

**Amethyst ramp** (ink hierarchy):

| Token | Hex | Usage |
| --- | --- | --- |
| `amethyst` | `#3F1F68` | Primary ink, all titles and body text |
| `amethyst-80` | `#6B4F8F` | Secondary ink, metadata, helper text |
| `amethyst-40` | `#ADA1BE` | Tertiary ink, captions, disabled |
| `amethyst-20` | `#DAD2E2` | Subtle borders, muted dividers |
| `amethyst-5` | `#F5F2F8` | Muted surfaces, skeletons |

**Surface partners** (each brand color has one paired tint for background use):

| Tint | Hex | Partner for |
| --- | --- | --- |
| `amethyst-5` | `#F5F2F8` | Muted surfaces |
| `lime-tint` | `#F0F9C9` | Accent chip backgrounds |
| `slate-tint` | `#E4EEF4` | Info banner backgrounds |
| `lilac-tint` | `#E4E2E7` | Favorite heart background |
| `stone-tint` | `#F0EAE0` | Category chip background |

### Tier 2 · Surfaces (ground)

| Token | Hex | Usage |
| --- | --- | --- |
| `surface-bg` / `cream` | `#FCFBFA` | App background — always the outermost surface |
| `surface-card` / `paper` | `#FFFFFF` | Cards, modals, inputs |
| `surface-muted` | `#F5F2F8` | Muted fills, skeletons (matches `amethyst-5`) |
| `surface-divider` | `#E9E6ED` | Hairlines, input borders |

### Tier 3 · Semantic Status (product rating only)

Status colors carry product safety meaning. Never decorative. Every product has exactly one rating. Each tier has four shades.

| Tier | Label | Dot | Bg | Tint |
| --- | --- | --- | --- | --- |
| Clean · sage | `clean` `#2B5F4E` | `clean-dot` `#7DBFA8` | `clean-bg` `#D7E8E0` | `clean-tint` `#E7F1ED` |
| Caution · amber | `caution` `#7A6115` | `caution-dot` `#C9A227` | `caution-bg` `#F5E9B8` | `caution-tint` `#FCF6DF` |
| Avoid · scarlet | `avoid` `#B3240E` | `avoid-dot` `#FF3A20` | `avoid-bg` `#FFD9D2` | `avoid-tint` `#FFEBE7` |

---

## Text on Dark Amethyst Surfaces

On amethyst backgrounds, do **not** use ramp colors — they fail contrast. Readable options only:

| Color | Use |
| --- | --- |
| `cream` `#FCFBFA` | Default text on amethyst |
| `lime` `#C9EC2D` | Accent moments on amethyst |
| `lilac-tint` `#E4E2E7` | Quiet meta text on amethyst |

---

## Typography

**Font families:**
- Body/display: **Plus Jakarta Sans** (400/500/600/700/800)
- Mono: **JetBrains Mono** (400/500) — hex values, timestamps, code

### Type Scale

| Token | Size | Weight | Tracking | Line-height | Usage |
| --- | --- | --- | --- | --- | --- |
| `text-display` | 48px | 800 | −0.05em | 1.0 | Hero moments only |
| `text-h1` | 30px | 800 | −0.02em | 1.1 | Page titles |
| `text-h2` | 24px | 700 | −0.015em | 1.2 | Section headers |
| `text-h3` | 18px | 700 | −0.008em | 1.3 | Card titles, subsection heads |
| `text-h4` | 16px | 600 | — | 1.35 | Minor headings |
| `text-body` | 14px | 400 | — | 1.55 | Body copy |
| `text-small` | 12px | 400 | — | 1.5 | Helper, metadata |
| `text-label` | 11px | 800 | +0.16em | 1.4 | UPPERCASE eyebrows, section labels |
| `text-micro` | 10px | 400 | — | 1.4 | Captions, timestamps |

---

## Spacing Scale (4px base)

| Token | Value | Usage |
| --- | --- | --- |
| `xs` | 4px | Icon gaps, tight inline |
| `sm` | 8px | Between tags/badges |
| `md` | 16px | Standard component padding |
| `lg` | 24px | Card padding, section internal |
| `xl` | 32px | Between cards |
| `2xl` | 48px | Between major sections |
| `3xl` | 64px | Page-level hero margins |

**⚠ Tailwind v4 gotcha:** these names collide with default `max-w-*` sizes. `max-w-xs` etc. will resolve to our spacing values (e.g. 4px), not Tailwind's default widths. Use `max-w-[600px]` or `max-w-screen-md` for layout widths. See `CLAUDE.md`.

---

## Border Radius

| Token | Value | Usage |
| --- | --- | --- |
| `rounded-badge` | 6px | Badges, chips |
| `rounded-card` | 16px | Modals, sheets |
| `rounded-asym-sm` | `16px 16px 8px 8px` | Mini cards |
| `rounded-asym` | `24px 24px 10px 10px` | **Product cards** (signature shape) |
| `rounded-asym-lg` | `36px 36px 12px 12px` | Hero containers |
| `rounded-full` | 9999px | Buttons, pills, heart, filter chips |

The asymmetric radii (top bigger than bottom) are the signature — use on anything that feels like a "card" or "container," not on UI chrome.

---

## Shadows

### Signature — flat-offset decorative

| Token | Value | Usage |
| --- | --- | --- |
| `shadow-flat-amethyst` | `4px 4px 0 0 ``#3F1F68` | **Default** — every product card, primary CTA at rest |
| `shadow-flat-amethyst-lg` | `6px 6px 0 0 ``#3F1F68` | Card hover, hero callouts |
| `shadow-flat-lime` | `4px 4px 0 0 ``#C9EC2D` | Accent moments on amethyst backgrounds only |
| `shadow-flat-slate` | `4px 4px 0 0 ``#3B7080` | Reserved — rarely used |

### Functional — soft lift

| Token | Value | Usage |
| --- | --- | --- |
| `shadow-hover` | `0 4px 16px rgba(63,31,104,0.08)` | Dropdowns, tooltips |
| `shadow-modal` | `0 12px 40px rgba(63,31,104,0.12)` | Modals, sheets, toasts |

---

## Button Patterns

- **Primary** — filled amethyst bg, cream text, `shadow-flat-amethyst` at rest.
- **Secondary (knockout)** — white bg, 2px amethyst border, amethyst text, `shadow-flat-amethyst` at rest.
- Both shift 2px down-right and lose shadow on press (`translate(2px, 2px)` + shadow collapse) for the flat-offset "pushed" effect.

---

## Favorite Heart

Tone-on-tone on `lilac-tint` background with `amethyst-80` heart icon. No pop color. Filled state uses the same palette, just a solid heart.

---

## Motion

| Token | Value | Usage |
| --- | --- | --- |
| `duration-fast` | 100ms | Color, small toggles |
| `duration-base` | 200ms | **Default** — hovers, buttons, heart |
| `duration-slow` | 300ms | Card lift |
| `duration-slower` | 400ms | Ghost reveals |
| `ease-out-soft` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default ease (90% of transitions) |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Card lift + heart tap |

---

## Z-Index Scale

| Token | Value |
| --- | --- |
| `z-base` | 0 |
| `z-raised` | 10 |
| `z-dropdown` | 100 |
| `z-sticky` | 200 |
| `z-overlay` | 300 |
| `z-modal` | 400 |
| `z-toast` | 500 |

---

## Usage Rules Summary

1. Never hardcode a hex, pixel font size, or spacing value. Use tokens from `@theme` in `src/styles/globals.css`.
2. **Role-lock colors.** Amethyst = signature. Lime = accent (max one-two per screen). Slate = interactive only. Lilac = favorite only. Stone = categories only. Status colors = product ratings only.
3. Cards use `rounded-asym` + 2px amethyst border + `shadow-flat-amethyst`. That's the signature.
4. **Lime is never foreground on cream/white** — fails contrast. Lime text only on amethyst.
5. Primary CTA = filled amethyst. Secondary CTA = knockout (white bg + amethyst border).
6. All categories share `stone-tint` background. Categories are organizational, not evaluative.
7. Favorite heart is tone-on-tone lilac. No pop color.
8. Status badges (clean/caution/avoid) only appear on products — never as generic UI state indicators.
9. Text on dark amethyst surfaces uses cream (default), lime (accent), or lilac-tint (quiet). Never ramp colors.
10. Page background is always `cream` / `surface-bg`. Cards are always `paper` / `surface-card`. Never invert.
