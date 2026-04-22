# Toast — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/toast`. This markdown is the written reference; the live page has the rendered states. Design decisions are tracked in `/spec/decisions` (TS-01, TS-02).

**File:** `src/components/Toast.tsx`

## Overview

Transient, auto-dismissing message bar. Appears bottom-center over the current screen, lives ~4 seconds, then fades. Four types map to the shared semantic color system: **success · info · warning · error**.

Toast is a **floating surface**, not a control. It carries no signature shape or shadow of its own — status is communicated through color alone (bg + icon). The radius (16px symmetric) places it in the surface family as a small sibling of Modal; using a pill would have moved it into the control family alongside Button/IconButton. (See TS-01.)

Info color pulls from **slate**, an existing cool-neutral in the palette, to keep info visually distinct from brand amethyst. (See TS-02.)

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | `'success' \| 'info' \| 'warning' \| 'error'` | yes | — | Semantic bucket. Drives bg, text, icon bg, icon color, and icon glyph. |
| `message` | `string` | yes | — | The toast body. Plain string; no rich content. |
| `duration` | `number` (ms) | no | `4000` | Auto-dismiss delay. Pass `0` to disable auto-dismiss (manual only). |
| `onDismiss` | `() => void` | no | — | Fires when the toast closes (auto or manual). |

## Types

| Type | bg | text | icon bg | icon glyph | When to use |
| --- | --- | --- | --- | --- | --- |
| `success` | `bg-clean-bg` | `text-clean` | `bg-clean` | `✓` | Product saved, list updated, action confirmed |
| `info` | `bg-slate-tint` | `text-slate-deep` | `bg-slate` | `i` | Data updates, neutral announcements, background state changes |
| `warning` | `bg-caution-bg` | `text-caution` | `bg-caution` | `!` | Partial data, unverified ingredients, soft-fail states |
| `error` | `bg-avoid-bg` | `text-avoid` | `bg-avoid` | `×` | Failed requests, blocked actions, hard errors |

## Visual spec

- **Shape:** `rounded-card` (16px symmetric — all corners)
- **Shadow:** `shadow-hover` (soft amethyst-tinted drop)
- **Width:** `w-[440px]`, capped at `max-w-[calc(100vw-48px)]` for narrow screens
- **Padding:** `px-md py-sm`
- **Layout:** flex row — icon · message · dismiss
- **Icon:** 20 × 20 circle, bold glyph, status-colored bg
- **Dismiss:** `×` at 40% opacity, hover 70%, `aria-label="Dismiss"`

## Motion

- Enters from bottom, fades to 0 on dismiss. Transition tokens: `duration-fast ease-out-soft`.
- Auto-dismiss fires after `duration` ms (default 4000). Setting `duration={0}` pins the toast until the user clicks dismiss.

## Semantic palette

Toast pulls from the **shared semantic system** — same tokens used by badges, banners, inline validation, any status-communicating surface. There is no Toast-specific color set.

| Bucket | Hue | Source tokens |
| --- | --- | --- |
| success | green | `--color-clean*` |
| info | slate | `--color-slate*` |
| warning | amber | `--color-caution*` |
| error | coral | `--color-avoid*` |

## Accessibility

- **Role:** the parent container should be `role="status"` (for success/info) or `role="alert"` (for warning/error) — ToastContainer's responsibility, not this component's.
- **Dismiss button:** `aria-label="Dismiss"` always present; Enter and Space activate.
- **Auto-dismiss timing:** 4000 ms is long enough for most readers; use `duration={0}` when the message is critical (errors the user must acknowledge).
- **Contrast:** all four type palettes meet WCAG AA on their own bg.

## Anti-patterns

- ❌ Don't use Toast for actions the user can still take — use Modal or inline UI. Toasts fade.
- ❌ Don't stack more than one Toast at a time. If multiple messages arrive, queue them.
- ❌ Don't use info for brand announcements — info is slate (neutral). Use a banner or inline element instead.
- ❌ Don't put links, buttons, or form inputs inside a Toast. Message only.
- ❌ Don't override the radius — symmetric 16px places Toast in the surface family. A pill shape would move it into the control family, which is structurally wrong. (See TS-01.)

## Decisions

- **TS-01** — Shape + shadow signature → **A · symmetric 16px + soft drop**
- **TS-02** — Info color source → **slate** (existing token, no new hue added)
