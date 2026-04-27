# NavBar — Component Specification

> **Live interactive version:** run the dev server and visit `/spec/navbar`. Design decisions are tracked in `/spec/decisions` (N-01 → N-06).

**File:** `src/components/NavBar.tsx`

## Overview

Global chrome — fixed to the top of every authenticated page. Houses the brand mark, two text page links (Home, Browse), the **global search input** as the primary action, and two right-side utility shortcuts (Favorites + Account dropdown).

The bar is intentionally restrained — no active indicator, no brand signature beyond the wordmark, plain text for page links — so the centered search bar reads as the primary action across breakpoints. (See N-01, N-02, N-05, N-06.)

## Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `user` | `{ email: string }` | yes | Current user. Email shown in the account dropdown; initials derived for the avatar. |
| `onSignOut` | `() => void` | yes | Fires when "Sign out" is clicked. |

The bar reads + writes the URL `?q=` param itself via React Router; consumers don't pass query state.

## Layout

### Desktop (≥ 768px)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Clean Shopper   Home  Browse     [   🔍 Search…   ]      ♡   [EO]   │
└──────────────────────────────────────────────────────────────────────┘
```

`64px` height. CSS grid: `auto auto 1fr auto`. SearchInput is centered in its 1fr column with a `560px` max width so it doesn't stretch on ultra-wide displays.

### Mobile (< 768px)

```
┌──────────────────────────────────┐
│  Clean Shopper        ♡   [EO]   │
│  [   🔍 Search…              ]   │
└──────────────────────────────────┘
```

Two stacked rows. Total height ≈ `112px`. Home and Browse drop from the chrome (logo links to `/home`; Browse is reachable via Home or by navigating directly).

## Search behavior (N-06)

- Query state lives in the URL: `/search?q=…`. NavBar mirrors it with local state for the input.
- **On any page that isn't `/search`** — typing does nothing to the URL. Pressing Enter (or hitting submit) routes to `/search?q=value`.
- **On `/search`** — typing replaces the URL `?q=` live (using `replace: true`) so results filter on every keystroke.
- Clearing the input (× button) sets `?q=` to empty without changing the route.
- Back/forward navigation works because state is URL-owned. NavBar `useEffect` keeps the input synced with `?q=`.

## Account dropdown (N-04)

| Aspect | Detail |
| --- | --- |
| Trigger | 36px avatar circle, amethyst gradient (`from-amethyst to-amethyst-110`), 2-letter initials in cream |
| Initials | First letter + first letter after `.`/`_`/`-` in local-part; otherwise first 2 chars |
| Menu | `min-w-[220px]`, `rounded-card`, `1.5px` divider border, `shadow-flat-amethyst`, anchored top-right |
| Contents | Email (label "Signed in" + email) → divider → Sign out (button, full-width, hover bg `surface-muted`) |
| Dismiss | Click outside · Escape · route change (closes automatically) |
| ARIA | `aria-haspopup="menu"`, `aria-expanded` reflects state, menu uses `role="menu"`, items `role="menuitem"` |

## Visual spec

| Token / value | Where |
| --- | --- |
| `bg-surface-card` | Bar background |
| `border-b border-surface-divider` | Bottom border |
| `fixed top-0 left-0 right-0 z-sticky` | Positioning |
| `h-[64px] px-xl` | Desktop |
| `px-md py-sm` (×2 rows) | Mobile |
| `text-h3` | Brand wordmark |
| `text-body text-ink-primary` | Home / Browse links |
| `w-9 h-9 rounded-full` | Utility icon hit area (Favorites + Account) |
| `hover:bg-surface-muted hover:text-amethyst` | Utility hover |
| `focus-visible:outline-2 outline-amethyst outline-offset-2` | All focusable elements (system convention) |

## Accessibility

- Brand and page links use NavLink — keyboard focusable, native click + Enter activation.
- Favorites is a NavLink with `aria-label="Favorites"` (icon-only).
- Account button: `aria-label="Account menu"`, `aria-haspopup="menu"`, `aria-expanded`. Menu items `role="menuitem"`.
- Escape closes the dropdown. Click-outside closes the dropdown.
- SearchInput keyboard behavior is owned by the SearchInput component (Enter submits; × clears).
- All focus rings use the system convention (no per-component focus treatment).

## Where it's used

`App.tsx` renders NavBar at the top of every authenticated route except `/signin` and `/signup`. Not rendered inside `/spec/*` consumer mode (the spec layout is its own surface).

## Anti-patterns

- ❌ Don't add an active indicator to Home / Browse. The page heading communicates location; the navbar is a frame, not a wayfinder. (N-02)
- ❌ Don't add icons to Home / Browse text links. Icons in the navbar are reserved for utilities (Favorites, Account). (N-01)
- ❌ Don't add brand-signature treatments (asym shadow, lime accent, amethyst disc) to the wordmark. The brand sings in ProductCard / Buttons / AccentBadge — not in the chrome. (N-05)
- ❌ Don't render the SearchInput inside individual pages. Search is global; pages read `?q=` and render results. (N-06)
- ❌ Don't put nav destinations behind the avatar dropdown. Account-related actions only (email, Sign out, future Preferences).

## Decisions

- **N-01** Icon system → SVG glyphs, but only for utilities (Favorites heart, Account avatar). Page links are plain text.
- **N-02** Active indicator → none.
- **N-03** Mobile pattern → stacked: header row (logo + utilities) + dedicated search row.
- **N-04** Account → avatar circle + dropdown.
- **N-05** Brand mark → plain wordmark.
- **N-06** Search placement → global in NavBar; URL-owned `?q=` state.
