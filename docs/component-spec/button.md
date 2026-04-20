# Button — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/button`. This markdown is the written reference; the live page has the rendered states. All design decisions are tracked in `/spec/decisions` (B-01 through B-13).

**File:** `src/components/Button.tsx`

## Overview

The primary interactive control for committing an action — "Save to library," "Add to shopping list," "Sign in," "Compare." Three variants cover the whole app: **primary** for the single most important action on a surface, **secondary** (knockout) for supporting actions, **ghost** for tertiary / inline actions. Buttons are always pill-shaped (`rounded-full`) — asymmetric radii are reserved for cards.

The signature flat-offset amethyst shadow is **not** a default button decoration — it's reserved for hero moments via the `hero` prop. Non-hero buttons never show a shadow.

## Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | yes | — | Button label (keep to 1–3 words) |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | no | `'primary'` | Visual weight / role |
| `size` | `'sm' \| 'md' \| 'lg'` | no | `'md'` | Height and padding scale |
| `hero` | `boolean` | no | `false` | Opt-in "big moment" treatment. Shadow appears on hover + button lifts. One per surface, max. |
| `icon` | `ReactNode` | no | — | Leading or trailing icon (Phosphor) |
| `iconPosition` | `'leading' \| 'trailing'` | no | `'leading'` | Icon placement |
| `disabled` | `boolean` | no | `false` | Disables interaction |
| `loading` | `boolean` | no | `false` | Replaces icon with spinner, suppresses clicks |
| `fullWidth` | `boolean` | no | `false` | Stretches to container width |
| `type` | `'button' \| 'submit'` | no | `'button'` | Native button type |
| `onClick` | `() => void` | no | — | Click handler |
| `aria-label` | `string` | no | — | Required when children is icon-only (route to `IconButton` instead) |

## Variants

| Variant | When to use | When not to use |
| --- | --- | --- |
| `primary` | The single most important commit action on a surface — "Save," "Sign in," "Add to list." One per view. | Dense toolbars with many equal actions — use `secondary` or `ghost`. Never stack two primaries side by side. |
| `secondary` | Supporting actions that aren't the hero action — "Cancel," "Compare," "See details." Pairs with a primary. | Where you actually need more visual weight — promote to `primary`. |
| `ghost` | Tertiary/inline actions embedded in text or dense surfaces — "Clear filters," "See all," row-level verbs. | Anything that commits data — use `secondary` at minimum so it doesn't read as a link. |

### Visual spec (rest)

| Variant | Background | Border | Text | Shadow |
| --- | --- | --- | --- | --- |
| `primary` | `amethyst` (#3F1F68) | none | `cream` | none |
| `secondary` | `paper` (#FFFFFF) | 2px `amethyst` | `amethyst` | none |
| `ghost` | transparent | none | `amethyst` | none |

## Hero modifier

The `hero` prop adds a flat-offset shadow treatment on hover only — it does not appear at rest. Use on the one big-moment button per surface (landing hero CTA, empty-state primary, auth submit).

| Variant + hero | Rest | Shadow color (on hover) |
| --- | --- | --- |
| `primary` + `hero` | Same as primary rest (no shadow) | `shadow-flat-lime` (4px 4px 0 `lime`) |
| `secondary` + `hero` | Same as secondary rest (no shadow) | `shadow-flat-amethyst` (4px 4px 0 `amethyst`) |
| `ghost` + `hero` | Not supported — ghost can never be hero. |

**Why on hover only, not at rest:** an always-on decorative shadow competes with card shadows across dense screens. Turning the shadow into a response to intent makes the hover feel earned, and keeps hero buttons quiet at baseline. Hero still communicates importance through layout position + copy, not a resting shadow. (See B-08, B-12.)

**Why lime on primary / amethyst on secondary:** amethyst shadow on amethyst fill is invisible. Lime carries contrast against amethyst primary. Amethyst carries contrast against the paper fill of secondary. (See B-09.)

## Sizes

| Size | Height | Padding | Text token | Icon | When to use |
| --- | --- | --- | --- | --- | --- |
| `sm` | 32px | `py-xs px-md` (4×16) | `text-small` (12px) | 14px | Dense toolbars, filter rows, inline row actions |
| `md` | 40px | `py-sm px-lg` (8×24) | `text-body` (14px) | 16px | **Default** — most surfaces |
| `lg` | 48px | `py-md px-xl` (16×32) | `text-h4` (16px) | 20px | Hero CTAs, empty-state calls, auth flows |

Only one size per cluster. Do not mix `sm` and `md` in the same action group.

## States

### Non-hero buttons

| State | Visual |
| --- | --- |
| `default` | Variant colors as defined. No shadow. |
| `hover` | **Primary + secondary:** background → `amethyst-110` (#2A1247), text stays cream / becomes cream. <br>**Ghost:** background → `amethyst-20` (#DAD2E2), text stays amethyst. |
| `pressed` | `transform: scale(0.96)` — the whole button shrinks slightly into the click. Background returns to rest color (hover does not bleed through). Pops back with spring easing on release. |
| `focus-visible` | 2px `slate` outline with 2px offset (keyboard focus only). |
| `disabled` | 50% opacity, `cursor-not-allowed`, not in tab order. |
| `loading` | Icon slot swapped for spinner; label stays. `pointer-events: none`, `aria-busy="true"`, `cursor-wait`, opacity 0.7. |

### Hero buttons

| State | Visual |
| --- | --- |
| `default` | No shadow. Visually identical to non-hero rest. |
| `hover` | Shadow appears at `4px 4px 0` in the hero color (lime on primary, amethyst on secondary). Button translates `-2px, -2px`. Fill does **not** change. The translate makes the shadow look like it was revealed by lifting the button off the page. |
| `pressed` | `scale(0.96)`. Shadow dismisses (back to none). |
| `focus-visible` | 2px `slate` outline with 2px offset. Shadow remains if hovered + focused. |
| `disabled` / `loading` | Same as non-hero. |

### Rationale — press state is scale, not translate

Shrinking reads as a "pop into" gesture that works for every variant without needing a separate rule for hero vs non-hero. Earlier we considered `translate(2px, 2px)` + shadow collapse, but that only makes sense when there's a resting shadow to collapse. Scale is universal. (See B-10.)

### Rationale — hover color direction

Primary + secondary **darken** on hover rather than lighten. Amethyst is already a dark signature color; lightening it toward pastel fights the brand. Darkening reads as "pressing deeper into the action" and is the industry-standard primary-button pattern (Tailwind, Material, Radix). Ghost is the exception — it goes to `amethyst-20` (a light tint) because ghost is tertiary and should never transform into a filled commit button. (See B-13.)

## Interaction patterns

**Click.** Fires `onClick`. `type="submit"` submits the enclosing form; `type="button"` (default) does not.

**Keyboard.** Tab to focus (slate focus ring on keyboard nav only). Enter or Space activates. Space fires on keyup per native button behavior.

**Loading.** While `loading={true}`, clicks are suppressed and the button announces itself as busy (`aria-busy="true"`). The label remains visible so the button doesn't change size; the icon slot shows a spinner. Parent owns the loading flag — button does not manage its own async state.

**Disabled vs loading.** Use `disabled` when the action is not currently valid (form incomplete, permission missing). Use `loading` when the action is in flight. They are visually and semantically different; don't conflate.

**Icon-only.** If `children` is an icon with no text, use `IconButton` instead — it enforces the `aria-label` requirement and has a different shape (square, not pill). Don't shoehorn Button into an icon-only role.

## Do / Don't

- **Do** use one primary per surface. **Don't** stack two primaries. *Reason:* two primaries means neither is primary.
- **Do** use `hero` sparingly — max one per page, on the biggest-moment action. **Don't** sprinkle hero on every primary. *Reason:* the shadow is the brand's loudest signal; if it's everywhere it stops meaning anything.
- **Do** pair primary with secondary for "Save / Cancel" style dialogs. **Don't** pair primary with ghost — cancel needs weight. *Reason:* ghost reads as a link, not a commit.
- **Do** use `rounded-full`. **Don't** apply asymmetric radii. *Reason:* asymmetric is the card signature. Buttons are pills.
- **Do** let the flat shadow carry the hero signal. **Don't** add a soft `shadow-hover` drop on top. *Reason:* soft shadows are functional (dropdowns, modals). Buttons are decorative-flat only.
- **Do** use `loading` for in-flight async. **Don't** disable the button during async without a spinner. *Reason:* users think the click didn't register.
- **Do** keep labels to 1–3 words. **Don't** use sentences. *Reason:* pill shape breaks at long labels, and long labels usually mean the UX needs explanation next to the button, not inside it.

## Accessibility

**Keyboard:**
- Native `<button>` element — Tab/Shift+Tab, Enter, Space work for free
- `disabled` attribute removes it from tab order automatically
- `loading` keeps it focusable but suppresses activation

**Focus:** `focus-visible:outline-2 focus-visible:outline-slate focus-visible:outline-offset-2`. Slate in all contexts (including on amethyst fills) — consistent ring is easier to learn than context-switching colors. (See B-03.)

**Screen readers:**
- Label is the rendered children text
- Loading: `aria-busy="true"` while loading; label remains the announced name
- Icon-only case should not occur — route to `IconButton` which enforces `aria-label`
- Leading/trailing icons are decorative: wrap with `aria-hidden="true"`

**Color contrast (WCAG AA):**

| State | Text on bg | Ratio | WCAG |
| --- | --- | --- | --- |
| Primary rest | `cream` on `amethyst` | 12.6 : 1 | AAA ✓ |
| Primary hover | `cream` on `amethyst-110` | ~15 : 1 | AAA ✓ |
| Secondary rest | `amethyst` on `paper` | 11.9 : 1 | AAA ✓ |
| Secondary hover | `cream` on `amethyst-110` | ~15 : 1 | AAA ✓ |
| Ghost rest | `amethyst` on `cream` | 10.9 : 1 | AAA ✓ |
| Ghost hover | `amethyst` on `amethyst-20` | 8.8 : 1 | AAA ✓ |
| Focus ring | `slate` on `cream` | 4.9 : 1 | AA non-text (3:1 required) |

**Motion:** Press scale + hero lift use `duration-base` (200ms). Press release uses `ease-spring` for the pop-back; other transitions use `ease-out-soft`. Respects `prefers-reduced-motion: reduce` by dropping the scale/translate and using instant color swaps. Spinner animation falls back to a static dot.

## Tokens used

**Color:** `amethyst`, `amethyst-110` (hover), `amethyst-20` (ghost hover), `cream`, `paper`, `lime` (hero primary shadow), `slate` (focus ring only)

**Spacing:** `px-md`, `px-lg`, `px-xl`, `py-xs`, `py-sm`, `py-md`, `gap-sm`

**Radius:** `rounded-full` (9999px)

**Shadow (hero only):** `shadow-flat-lime` (4px 4px 0 `lime`), `shadow-flat-amethyst` (4px 4px 0 `amethyst`)

**Motion:** `duration-base`, `ease-out-soft`, `ease-spring`

**Typography:** `text-small`, `text-body`, `text-h4` — all at `font-weight: 600`

## Composition

```
Button (non-hero)
├── [icon]          (leading — Phosphor, aria-hidden)
├── <span>label</span>
└── [icon]          (trailing — Phosphor, aria-hidden)

Button (hero)
└── Same as non-hero. "Hero" is a hover behavior, not a structural change.

Loading state
Button
├── Spinner        (replaces leading icon slot, aria-hidden)
└── <span>label</span>
```

## Related components

- **IconButton** — square, icon-only, requires `aria-label`. Use when there's no text label.
- **Link** — inline anchor styled as slate underlined text. Use for navigation, not commits.
- **Badge** — not interactive. If you find yourself reaching for a "clickable badge," it's a `ghost` button.

## Decision references

All decisions logged in `docs/spec/decisions.html`:

- **B-01** Keep `ghost` variant (link-like tertiary)
- **B-02** Three sizes: sm/md/lg
- **B-03** Slate focus ring everywhere (no context switching)
- **B-04** Never support icon-only Button (route to IconButton)
- **B-05** No destructive variant — repurpose primary with copy/context
- **B-06** Loading: spinner replaces icon slot, label stays
- **B-07** Support both leading and trailing icon positions
- **B-08** Hero prop — shadow only on hero, and only on hover
- **B-09** Hero shadow colors: lime on primary, amethyst on secondary
- **B-10** Press = `scale(0.96)` universal, spring pop-back
- **B-11** Hover rules (structure — refined by B-12 and B-13)
- **B-12** Hero hover = shadow appears + translate(-2px, -2px), no fill change
- **B-13** Non-hero hover = darken to new `amethyst-110`; ghost exception to `amethyst-20`
