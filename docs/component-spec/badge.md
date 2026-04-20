# Badge — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/badge`. This markdown is the written reference; the live page has the rendered states. All design decisions are tracked in `/spec/decisions` (BD-01 through BD-04).

**Files:**
- `src/components/StatusBadge.tsx`
- `src/components/CategoryTag.tsx`
- `src/components/AccentBadge.tsx`

## Overview

"Badge" is not one component — it's three. Each one does one job, uses its own shape, and is not interchangeable with the others. Keeping them separate prevents the common pattern of a single Badge component drowning in props (`variant`, `tone`, `shape`, `interactive`, `dot`) that no longer maps cleanly to how any single badge is actually used.

| Component | Role | Shape | Palette |
| --- | --- | --- | --- |
| `StatusBadge` | Product safety rating — loud, authoritative | Pill (`rounded-full`) | Clean / caution / avoid (saturated `-bg`) |
| `CategoryTag` | Category label — quiet, organizational | Tight 4px (`rounded-tag`) | Stone (one color for every category) |
| `AccentBadge` | Editorial moments — premium, editor's pick | Asymmetric (`rounded-asym-sm`) | Lime on amethyst only |

For inline ingredient-row indicators (a small colored dot next to an ingredient name), see `IngredientDot` — a separate component because it has different semantics (list marker, not a badge). (See BD-03.)

---

## StatusBadge

### Purpose
Communicates the overall safety rating of a product at a glance — every product has exactly one StatusBadge. This is the badge that appears on product cards, product detail headers, and inline in sentences like "This product is rated Clean based on ingredient analysis."

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `tier` | `'clean' \| 'caution' \| 'avoid'` | yes | — | Which rating to display |
| `size` | `'sm' \| 'md'` | no | `'md'` | Display size |
| `showIcon` | `boolean` | no | `true` | Whether to render the leading tier icon |

No `variant`, no `tone`, no `shape`. A StatusBadge is always a pill with the saturated `-bg` fill. (See BD-02, BD-04.)

### Tiers

| Tier | Icon | Background | Text | Meaning |
| --- | --- | --- | --- | --- |
| `clean` | `ph-check-circle-fill` | `clean-bg` (#D7E8E0) | `clean` (#2B5F4E) | Pass — no flagged ingredients |
| `caution` | `ph-warning-circle-fill` | `caution-bg` (#F5E9B8) | `caution` (#7A6115) | Mixed — one or more ingredients to watch |
| `avoid` | `ph-x-circle-fill` | `avoid-bg` (#FFD9D2) | `avoid` (#B3240E) | Fail — contains flagged ingredients |

### Sizes

| Size | Height | Padding | Text | Icon | When to use |
| --- | --- | --- | --- | --- | --- |
| `sm` | 20px | `px-sm py-[2px]` | `text-micro` (10px) uppercase, tracking 0.16em | 12px | Product card overlays, dense tables |
| `md` | 28px | `px-md py-xs` | `text-label` (11px) uppercase, tracking 0.16em | 14px | **Default** — product headers, inline sentences |

Text is always uppercase + tracked, weight 800. The treatment reinforces "this is a label, not body copy."

### Why always `-bg` and not `-tint`

A status badge's entire job is to be legible at a glance. The paler `-tint` variants get lost against photo backgrounds (product card overlays) and read as a whisper on cream surfaces. The "twelve badges on a listing page becomes a parade" concern is real but is better solved through layout (rating visible only on hover/detail) than by making every badge quieter. (See BD-04.)

`-tint` still has a job — as a surface fill for larger highlight zones, e.g. an "Ingredients to watch" callout panel. Tint = surface. Bg = the badge itself.

---

## CategoryTag

### Purpose
A category label on a product (skincare, haircare, home, etc.). These accumulate: a listing page may show 12 tags at once. The design goal is a crisp, editorial label that recedes next to StatusBadges.

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | yes | — | Category name (1–2 words) |
| `size` | `'sm' \| 'md'` | no | `'md'` | Display size |

No color prop. Every category uses the same stone palette — Clean Shopper does not rank categories. (See category-heart research and design-system.md.)

### Visual spec

| Property | Value |
| --- | --- |
| Background | `stone-tint` (#F0EAE0) |
| Text | `stone-deep` (#5A4F3A) |
| Border | none |
| Radius | `rounded-tag` (4px) |
| Text treatment | uppercase, tracking 0.16em, weight 800, `text-label` (11px) or `text-micro` (10px) at sm |

### Why 4px, not pill

Category tags are quiet by design. A pill shape would collide with StatusBadge — and visually equalize a rating (which carries safety meaning) with a category (which is just organization). The 4px corner reads as "label, not badge" and stays out of the way when a row of six categories appears on a product detail page. (See BD-02.)

### Sizes

| Size | Height | Padding | Text |
| --- | --- | --- | --- |
| `sm` | 18px | `px-sm py-[1px]` | `text-micro` (10px) |
| `md` | 22px | `px-sm py-xs` | `text-label` (11px) |

---

## AccentBadge

### Purpose
Editorial / premium moments only — "Editor's pick," "Premium," "New." Reserved for surfaces that are already amethyst (landing hero, featured card, marketing rails). One per screen, max.

### Props

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | yes | — | Label (1–2 words) |
| `icon` | `ReactNode` | no | — | Optional leading icon (Phosphor) |

AccentBadge does not have a `size` prop — it's a single editorial size on purpose. If you want multiple sizes, you're probably reaching for StatusBadge or CategoryTag.

### Visual spec

| Property | Value |
| --- | --- |
| Background | `lime` (#C9EC2D) |
| Text | `amethyst` (#3F1F68) |
| Border | none |
| Radius | `rounded-asym-sm` (16px 16px 8px 8px) |
| Text treatment | uppercase, tracking 0.16em, weight 800, `text-label` (11px) |
| Icon | 14px, same color as text |

### Placement constraint

AccentBadge is **only** placed on amethyst surfaces. Lime fails contrast on cream and paper, and the whole design system pivots on lime being the signature-accent-on-amethyst pairing. If the surface isn't amethyst, you probably want StatusBadge or a CategoryTag variant instead. (See design-system.md, BD-02.)

### Why asymmetric

The asymmetric radius (flat bottom, rounded top) echoes the signature card shape, tying AccentBadge into the broader brand language without reusing either of the other two badge shapes. Pill would read as a button. 6px or 4px would read as another tag. Asymmetric is the only shape that says "this is the editorial moment." (See BD-02.)

---

## States (all three components)

Badges are **not interactive**. They have no hover, no press, no focus, no disabled states. They never receive clicks, never open menus, never gate actions.

If you find yourself wanting a clickable badge, the right primitive is:
- A **filter chip** (separate component, owns its own interactive states), or
- A `ghost` variant Button (See BD-03 rationale — keeping badges non-interactive preserves their semantic meaning and keeps us out of the "is this clickable?" ambiguity trap.)

The only rendered state variation is:
- **Loading.** Not supported. A badge's value is fixed at render. If the rating is being computed, show a skeleton placeholder or leave the slot empty — don't render a spinner badge.
- **Dark mode.** Out of scope for V1.

---

## Do / Don't

**StatusBadge**
- **Do** show exactly one StatusBadge per product, ever. **Don't** stack multiple ratings on one product. *Reason:* a product has a single computed safety rating — multiple badges implies multiple truths.
- **Do** keep the icon on. **Don't** disable `showIcon` except in ultra-dense data tables. *Reason:* the icon is half the legibility of the badge — tier color alone isn't enough for colorblind users.
- **Do** use `-bg` always. **Don't** reach for `-tint` on a StatusBadge. *Reason:* (See BD-04.)

**CategoryTag**
- **Do** use the stone palette for every category. **Don't** introduce per-category colors. *Reason:* a color per category implies a ranking we don't want to make.
- **Do** keep labels to 1–2 words. **Don't** use category descriptions. *Reason:* 4px tight shape assumes short labels.

**AccentBadge**
- **Do** place on amethyst surfaces only. **Don't** drop lime onto cream or paper. *Reason:* contrast fails and it breaks the accent-on-amethyst brand pairing.
- **Do** use once per surface. **Don't** stack "Editor's pick" + "Premium" + "New" on the same card. *Reason:* the whole point of accent is that it's rare.

**All three**
- **Do** keep them non-interactive. **Don't** make badges clickable. *Reason:* interactive elements need hover/focus/press — that's a Button or a chip, not a badge.

---

## Accessibility

**StatusBadge**
- Renders an icon + uppercase label. The label is the announced name; the icon is `aria-hidden="true"`.
- When the label alone isn't enough context ("Clean" without a product name), wrap with `aria-label` that includes the product context: `aria-label="Rated Clean — Aesop body wash"`.

**CategoryTag**
- Label is the announced name. If appearing inline as navigation or filter selection, the parent element should own the interactive semantics — not the tag.

**AccentBadge**
- Treated as decorative in most cases. If it carries meaning ("Editor's pick"), expose that in the parent's `aria-label` or in adjacent text.

**Color contrast (WCAG AA):**

| Badge | Text on bg | Ratio | WCAG |
| --- | --- | --- | --- |
| StatusBadge clean | `clean` on `clean-bg` | 7.1 : 1 | AAA ✓ |
| StatusBadge caution | `caution` on `caution-bg` | 6.2 : 1 | AAA ✓ |
| StatusBadge avoid | `avoid` on `avoid-bg` | 5.8 : 1 | AA ✓ |
| CategoryTag | `stone-deep` on `stone-tint` | 8.2 : 1 | AAA ✓ |
| AccentBadge | `amethyst` on `lime` | 8.9 : 1 | AAA ✓ |

**Motion:** None. Badges do not animate in, out, or on state change. The only transition a badge participates in is whatever its container does (card fade-in, page transition) — the badge itself stays still.

---

## Tokens used

**StatusBadge:**
- Color: `clean`, `clean-bg`, `caution`, `caution-bg`, `avoid`, `avoid-bg`
- Radius: `rounded-full`
- Spacing: `px-sm`, `px-md`, `py-xs`
- Typography: `text-label`, `text-micro` (uppercase, `tracking-wide`, weight 800)

**CategoryTag:**
- Color: `stone-tint` bg, `stone-deep` text
- Radius: `rounded-tag` (4px)
- Spacing: `px-sm`, `py-xs`
- Typography: `text-label`, `text-micro` (uppercase)

**AccentBadge:**
- Color: `lime` bg, `amethyst` text
- Radius: `rounded-asym-sm`
- Spacing: `px-sm`, `py-xs`
- Typography: `text-label` (uppercase)

---

## Composition

```
StatusBadge
├── <Icon aria-hidden="true" />   (tier icon — unless showIcon={false})
└── <span>Clean | Caution | Avoid</span>

CategoryTag
└── <span>{children}</span>       (no icon)

AccentBadge
├── [Icon aria-hidden="true"]     (optional)
└── <span>{children}</span>
```

---

## Related components

- **IngredientDot** — separate component for inline ingredient-row indicators. Uses the same `-dot` color tokens but has its own spec and accessibility treatment (list-marker semantics, parent-row labeling). See `docs/component-spec/ingredient-dot.md`.
- **Button (ghost)** — use when you actually want a clickable "badge-like" element. Badges are never interactive.
- **FilterChip** — forthcoming. Different component from CategoryTag because filter chips have selected/hover/press states and carry click behavior.

---

## Decision references

All decisions logged in `docs/spec/decisions.html` under the Badge tab:

- **BD-01** Three separate components (StatusBadge, CategoryTag, AccentBadge) — not one with variants
- **BD-02** Shape per component: Status = pill, Category = tight 4px, Accent = asymmetric
- **BD-03** IngredientDot is its own component, not a StatusBadge size variant
- **BD-04** StatusBadge always uses `-bg` (saturated), never `-tint`
- **BD-05** CategoryTag text color — new `stone-deep` token (#5A4F3A), keeps the stone family self-contained (tint/base/deep)
