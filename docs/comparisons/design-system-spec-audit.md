# Design System Component Spec Audit

**Date:** 2026-04-18
**Purpose:** Research how 6 production design systems document component specs, to inform a redesign of Clean Shopper's `/spec/product-card` page.

---

## Systems researched

### 1. Shopify Polaris (Card + ResourceItem)

**Layout:** Long-scroll, left sidebar nav, "On this page" anchor links
**Sections:** Title + description → named variant examples (one at a time via selector) → Props (flat list) → Best practices (bullets) → Related components
**States:** Not documented for layout components. Interactive sandbox handles it.
**Variants:** Clickable text list of named examples. Selecting one loads a CodeSandbox embed with React/HTML tabs. One example visible at a time.
**Do/Don't:** None visually. Text-only bullets for best practices and content guidelines.
**Accessibility:** Only on interactive components (ResourceItem gets keyboard + ARIA section; Card skips it entirely).
**Props:** Flat list (not a table). Name, type, default.
**Notable:** Lightweight, example-driven. The CodeSandbox embed does the heavy lifting. Compound subcomponents shown through examples but lack their own API docs.

### 2. Pinterest Gestalt (Button, Modal, WashAnimated)

**Layout:** Long-scroll, sidebar nav, single scrollable column
**Sections:** PageHeader with hero example → Auto-generated PropTable (from TypeScript) → Usage Guidelines (Do/Don't) → Best Practices (Do/Don't with live code) → Accessibility → Localization → Variants → Writing Guidelines → Quality Checklist → Related Components
**States:** Each state gets its own live Sandpack example under Variants. No matrix or grid.
**Variants:** Grouped under "Variants" heading with named subsections (Sizes, Colors, Width), each with a Sandpack demo.
**Do/Don't:** Two locations: Usage Guidelines (text-only cards) and Best Practices (cards with live code examples). Both use two-column layout.
**Accessibility:** Dedicated AccessibilitySection component. Covers ARIA, keyboard, color contrast, screen reader behavior. References WCAG 2.2 AA.
**Props:** Auto-generated from TypeScript types via docGen(). Placed early on the page (section 2).
**Notable:** Most comprehensive Do/Don't coverage. Quality Checklist is standardized across all components. Template is additive — simpler components get fewer sections.

### 3. Uber Base Web (Card + Button)

**Layout:** Long-scroll, left sidebar, playground at top
**Sections:** Component name → Interactive playground (live render + tabbed prop controls) → Editable code panel → API link → Description → "When to use" → Variant prose → Examples → Exports list
**States:** Dedicated "States" example showing four variants side by side: default, loading, selected, disabled. No hover/focus demos — those are only visible through interaction.
**Variants:** Prose explanation + dedicated "Kinds" example rendering all variants side by side. Playground also lets you toggle via radio buttons.
**Do/Don't:** None.
**Accessibility:** Minimal. No dedicated section. ARIA attributes visible in rendered output but not documented.
**Props:** Not on page — exposed only through interactive playground. Full API on separate cheat sheet page.
**Notable:** Playground-first approach. StackBlitz integration on every example. Style Overrides tab for deep customization.

### 4. GitHub Primer (Button)

**Layout:** Three-column: left sidebar (component nav), center content, right sidebar ("On this page" TOC). Three tabs: Overview, Guidelines, Accessibility.
**Sections (Overview):** Default example → Style variants → Full-width → Sizes → With visuals → Loading → Inactive → Props table
**Sections (Guidelines):** Anatomy → Inactive buttons → Best practices (Do/Don't)
**Sections (Accessibility):** Button schemes → Target size → aria-disabled → Descriptive buttons → Loading state → Built-in a11y → Implementation requirements → Testing checklist
**States:** Live interactive demos, not a static grid. Each state with a distinct prop (loading, inactive) gets its own subsection. Hover/focus/active styling visible through interaction only.
**Variants:** Grouped in a single live demo using horizontal Stack layout, with bullet descriptions of each variant's purpose.
**Do/Don't:** Side-by-side paired cards on Guidelines tab. Each has a Figma-embedded screenshot with descriptive text.
**Accessibility:** Dedicated tab with substantial depth. ARIA attributes, target sizes, keyboard focus, screen reader behavior, testing checklist.
**Props:** Table at bottom of Overview tab (Name, Default, Description/Type).
**Notable:** No states matrix. Anatomy diagrams on Guidelines tab. Accessibility has its own full tab with testing requirements.

### 5. IBM Carbon (Button + Tile/Card)

**Layout:** Left sidebar with TOC. Four tabs per component: Usage, Style, Code, Accessibility.
**Sections (Usage):** Live demo → Overview (when to use / not to use) → Formatting (anatomy diagrams, sizing tables) → Content → One section per variant → Modifiers → Related → References
**Sections (Style):** Color token tables per variant, organized by state. Typography and structure specs with px/rem/token values.
**Sections (Code):** Live demo → links to Storybook for API docs.
**Sections (Accessibility):** What Carbon provides → Design recommendations → Developer considerations → Testing status matrix.
**States:** Color token tables per variant, not a visual matrix. States listed as subsections under each variant's color spec (hover, focus, active, disabled each get a token table row). Contextual screenshots for loading state.
**Variants:** Summary comparison table in Overview, then each variant gets its own full section with screenshot, guidance, and Do/Don't.
**Do/Don't:** Side-by-side image pairs. "Do" left, "Do not" right. No green/red color — labels carry meaning. Used throughout variant sections and content guidance.
**Accessibility:** Dedicated tab with three layers: automatic support, design recommendations, developer considerations. Includes testing status matrix.
**Props:** Not on page — links to Storybook for four frameworks.
**Notable:** Most structured approach. Anatomy diagrams with numbered callouts. Token-centric specs (never raw hex/px). Tile (their Card) has four variants with per-variant state lists.

### 6. Material Design 3 (Cards)

**Layout:** Left sidebar ("On this page"), center content. Four tabs: Overview, Specs, Guidelines, Accessibility.
**Sections (Overview):** Purpose bullets → Numbered annotated variant image → Availability table → Changes from M2
**Sections (Specs):** Token tables by variant → Anatomy diagrams with callouts → Color role assignments → State diagrams → Measurements
**Sections (Guidelines):** Usage → Anatomy → Collections (grid/list/carousel) → Adaptive design → Behavior (expanding, navigation, gestures)
**Sections (Accessibility):** Use cases → Interaction patterns by input type → Focus management → Keyboard nav table → Screen reader labeling order
**States:** Horizontal strip of 5 annotated card illustrations per variant: Hovered → Focused → Pressed → Dragged → Disabled. Also expandable token tables by state on Specs tab.
**Variants:** Three (Elevated, Filled, Outlined). Each gets sections on Specs and Guidelines tabs.
**Do/Don't:** Paired images/videos on Guidelines tab. Green check "Do", red X "Don't", yellow exclamation "Caution".
**Accessibility:** Dedicated tab. Distinguishes actionable vs non-actionable cards. Keyboard nav table, screen reader reading-order diagram, interaction videos.
**Props:** None — links to platform-specific docs.
**Notable:** State layer concept (semi-transparent overlay with opacity tokens per state). Anatomy diagrams with numbered callouts. Most visual documentation overall.

---

## Patterns across all 6 systems

### States presentation

**No system uses a variant × size × state cross-product matrix.**

| System | States approach |
|---|---|
| Material Design | Horizontal strip of annotated illustrations per variant |
| Carbon | Color token tables per variant, organized by state |
| Primer | Live interactive demos (no static catalog) |
| Polaris | Not documented for layout components |
| Base Web | Simple side-by-side row (default, loading, selected, disabled) |
| Gestalt | Each state as its own live Sandpack example |

### Common section order

1. Hero/overview with live example
2. Props/API (early — Gestalt, Primer, Polaris) or deferred to Storybook (Carbon)
3. Variants (each as live example)
4. Do/Don't (4 of 6 systems have this)
5. Accessibility (dedicated section or tab — all except Polaris Card and Base Web)
6. Related components

### Tabs vs long-scroll

- **Tabs:** Carbon (4), Material (4), Primer (3)
- **Long-scroll:** Polaris, Gestalt, Base Web

### Do/Don't

- **Visual Do/Don't:** Carbon, Material, Primer, Gestalt (4/6)
- **Text-only:** Polaris
- **None:** Base Web

### Anatomy diagrams

- **Yes:** Carbon, Material (numbered callout style)
- **No:** Primer, Polaris, Base Web, Gestalt

### Props on page vs external

- **On page:** Gestalt (auto-generated), Primer (table), Polaris (flat list)
- **External/Storybook:** Carbon, Material, Base Web
