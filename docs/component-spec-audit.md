# Component Spec Audit — Clean Shopper V1

**Created:** 2026-04-03
**Status:** Complete — all 17 findings resolved (2026-04-03)

---

## Token/Class Issues

- [x] **1. Remove \****`tracking-wide`****\*\*\*\*\*\*\*\*\*\* where \*****\*\*\*\*\*\*\*\*\*****\*\*\*\*\*\*\*\*\*****\*\*\*\*\*\*****\*\*\*\*\*\*****\*\*\*****\*******`text-label`******\*\*\*\*\*\*\*\*\* is used****\*\*\*\*\*\*\*\*\*\*\*\* \*(resolved 2026-04-03)*
  Removed from 5 spec components (RatingBadge, Badge, SectionHeader, SwapCard, ScoreGauge) and existing ProductCard.tsx. `text-label` already generates the correct letter-spacing from the token.

- [x] **2. SwapCard score \****`font-bold`****\*\* conflicts with \*****\***`text-h1`****\*\*\* token weight****\* \*(resolved 2026-04-03)*
  Kept `font-bold` (700) as an intentional override. The swap score is the most prominent number in the card and needs extra visual weight beyond `text-h1`'s default 600. Documented in spec with a note explaining the override.

- [x] **3. Modal backdrop \****`bg-black/40`****\*\*\*\*\*\*\* is not a design token****\*\*\*\*\* \*(resolved 2026-04-03)*
  Added `--color-backdrop: rgba(100, 80, 50, 0.40)` to theme. Warm-tinted to match shadow system. Updated Modal spec to use `bg-backdrop`. Added to design-system.md.

- [x] **4. SwapCard \****`border-l-4`****\*\*\*\* breaks "no borders on cards" rule****\*\* \*(resolved 2026-04-03)*
  Replaced border with `bg-primary-light` tinted background. Teal tint signals "system recommendation" while staying within design rules. No borders. Visual comparison in `docs/comparisons/button-hierarchy.html`.

---

## Props Issues

- [x] **5. ProductCard missing \****`onClick`****\*\*\*\*\*\*\*/****\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\***`onViewDetails`**\*\*\*\*\*\*\*\*\*\*\*\*\*\* \*(resolved 2026-04-03)*
  Added `onClick` prop to open product detail modal.

- [x] **6. ComparisonPanel and SwapCard: loading states documented but no \****`loading`****\*\*\*\*\*\*\*\* prop****\*\*\*\*\*\* \*(resolved 2026-04-03)*
  Added `loading` prop to both components.

- [x] **7. IngredientList missing \****`maxItems`****\*\*\*\*\*\*\*\* for truncation****\*\*\*\*\*\* \*(resolved 2026-04-03)*
  Added `maxItems` prop. Omit to show all; pass a number for ComparisonPanel's truncated view.

- [x] **8. SearchInput missing \****`disabled`****\*\*\*\*\*\*\*\* prop****\*\*\*\*\*\* \*(resolved 2026-04-03)*
  Added `disabled` prop and disabled state (`opacity-50 cursor-not-allowed`).

- [x] **9. ShoppingListItem missing \****`onViewDetails`**\*\*\*\*\*\*\*\*\*\*\*\*\*\* \*(resolved 2026-04-03)*
  Added `onClick` prop to open product detail modal.

- [x] **10. SwapCard \****`originalName`****\*\*\*\*\*\* prop is never displayed****\*\*\*\* \*(resolved 2026-04-03)*
  Removed the prop. SwapCard already appears in the context of the evaluated product (inside the detail modal), so the original name is redundant.

---

## States Issues

- [x] **11. ProductCard missing loading state** *(resolved 2026-04-03)*
  Added skeleton loading state: `bg-surface-muted rounded-card animate-pulse h-[180px]`. Pulsing card shape with no content, used while AI search results stream in.

- [x] **12. Button, IconButton, Chip missing focus states** *(resolved 2026-04-03)*
  Added `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` to all three components. 2px primary teal ring, 2px offset. Only shows on keyboard nav, not mouse clicks. Visual comparison in `docs/comparisons/button-hierarchy.html`.

- [x] **13. IngredientList missing loading state** *(resolved 2026-04-03)*
  Added skeleton loading state: 4 pulsing rows at staggered widths (100%, 85%, 90%, 75%) using `bg-surface-muted rounded-badge animate-pulse`. Used while AI ingredient analysis is processing.

- [x] **14. Toast missing enter/exit transitions** *(resolved 2026-04-03)*
  Added Entering (slide up + fade in, `duration-slow ease-enter`) and Exiting (fade out, `duration-slow ease-exit`) states to spec.

---

## Usage Rules Issues

- [x] **15. SwapCard uses primary Button — conflicts with one-primary-per-view rule** *(resolved 2026-04-03)*
  No conflict: SwapCard lives inside the product detail modal, not on the search results page. No competing primary button. Also updated Button spec to three-tier system: primary (solid fill), secondary (teal outline), ghost (text only). Visual comparison saved to `docs/comparisons/button-hierarchy.html`.

- [x] **16. Card component missing guidance on when to use vs. raw classes** *(resolved 2026-04-03)*
  Added usage rule: use `<Card>` when the surface has interactive behavior (hoverable, clickable, semantic HTML) or reusable padding. Use raw `bg-surface-card rounded-card` classes for one-off structural containers.

- [x] **17. Toast missing positioning rule** *(resolved 2026-04-03)*
  Bottom-center on both mobile and desktop. Toast container uses `fixed bottom-lg left-1/2 -translate-x-1/2 z-toast flex flex-col gap-sm items-center`.
