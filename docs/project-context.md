# Project Context Document
**Project:** Clean Shopper
**Date:** 2026-03-26
**Source:** Project brief (`docs/CCDCourse_CleanShopper_ProjectBrief.md`) and CLAUDE.md project instructions
**Version:** 1.0

---

## 1. Problem Statement
Consumers who want to buy clean, non-toxic home and personal care products face an overwhelming research burden: ingredient lists require expertise to interpret, "clean" and "natural" marketing claims are unreliable, and there is no single tool that researches, evaluates, and remembers their preferences across shopping sessions.

## 2. ICP (Ideal Customer Profile)
Someone actively trying to replace toxic or questionable products in their home — cleaning supplies, personal care items, pantry staples — but who has hit a wall because the research is fragmented and time-consuming. They already read labels and care about ingredients, but they lack the chemistry knowledge to evaluate what they find. They may have started using resources like EWG but find the process of cross-referencing multiple sources for every purchase unsustainable. They want a trusted shortcut, not just more data.

## 3. Pain Points
- **Ingredient lists are opaque.** Users encounter long chemical names they can't evaluate without specialized knowledge. Labels don't surface what actually matters.
- **"Clean" claims are untrustworthy.** Greenwashing is pervasive. Users have learned they can't trust front-of-package marketing but don't have a reliable alternative.
- **Research is fragmented and slow.** Comparing products requires visiting multiple sites (EWG, brand sites, review platforms), cross-referencing ingredients, and repeating this for every product category.
- **Preferences have no home.** Users build up knowledge over time — ingredients to avoid, brands they trust, certifications they value — but this knowledge lives in their heads or scattered notes, never applied automatically.

## 4. Proposed Solution
- Users can describe what they're looking for in natural language and receive AI-researched product recommendations with ingredient safety reasoning.
- Users can save preferences (avoided ingredients, trusted brands, valued certifications like EWG Verified, USDA Organic, B Corp) that are automatically applied to all future recommendations.
- Users can compare products side by side and receive a clear recommendation weighted by their saved preferences.
- Users can add recommended products to a persistent shopping cart that carries across sessions.

## 5. Success Metrics
Not defined in source material. No quantitative success criteria, KPIs, or measurement approach are specified in the brief or project instructions.

## 6. Design Constraints
- **Platform:** Web (single-page application, Vite + React + TypeScript)
- **Geography:** Not specified. No regional restrictions mentioned.
- **Accessibility:** Not specified.
- **Technical:**
  - Tailwind CSS only for styling — no inline styles, no CSS modules
  - React state management via `useState` and `useContext` only — no external state libraries
  - All external API calls routed through `/src/lib/api/` — never inline in components
  - AI model locked to `claude-sonnet-4-20250514` — no other models permitted
  - Supabase for database/persistence layer (PostgreSQL)
  - EWG Skin Deep API for ingredient safety data
  - Vercel for deployment
  - Single-user, no authentication in V1
- **Other:**
  - This is a course demo project for "Claude Code for Designers" — built incrementally over four weeks following a phased build plan
  - Out of scope for V1: checkout/payments, retailer integrations, barcode scanning, user accounts, mobile app

## 7. Open Questions
1. **What does the conversational interface look like?** The brief mentions "a conversational interface backed by Claude" but the CLAUDE.md describes a component-based UI with search, product library, and shopping lists. Which interaction model is primary?
2. **How does real-time web search work?** The brief says "Claude searches the web in real time" — what is the actual mechanism? Is this tool use via the Claude API, a separate search API, or manual data seeding for V1?
3. **What are the "clean standards" for ingredient evaluation?** The brief references evaluating ingredients "against clean standards" but doesn't define what those standards are beyond referencing EWG. Is there a defined rubric, or does Claude determine this per-query?
4. **What is the phased build plan?** The CLAUDE.md references `/docs/build-plan.md` but this file doesn't exist yet. The build order and phase boundaries are undefined.
5. **How does preference management persist?** Preferences are stored in Supabase, but the schema and how preferences are structured (free-text vs. structured categories) is not specified.
6. **What is the product data model?** How are products represented — full database records, cached API responses, or ephemeral AI-generated results?

## 8. Gaps
1. **Success Metrics (Section 5):** No success criteria are defined. Without these, there's no way to evaluate whether the product is working or to prioritize features by impact. Even directional metrics (e.g., "users complete a product research task in under 2 minutes") would help scope design decisions.
2. **Build Plan:** Referenced in CLAUDE.md but does not exist as a file. This is critical — the project is meant to be built phase-by-phase, but the phases are undefined. Design work needs to know what's in Phase 1 vs. later.
3. **Component Spec:** Referenced in CLAUDE.md (`/docs/component-spec.md`) but does not exist. Without this, there's no shared vocabulary for the UI building blocks.
4. **Information Architecture:** No sitemap, screen inventory, or navigation model is defined. The brief lists features but not how they relate spatially.
5. **Accessibility Requirements:** Not mentioned anywhere. For a web app, WCAG conformance level should be stated.
6. **Geography / Locale:** No mention of whether this is US-only, which affects product databases, certifications, and ingredient regulations.
7. **Interaction Model Clarity:** The brief describes a conversational agent; the CLAUDE.md describes a structured app with components, categories, and libraries. The relationship between these two models needs resolution before design can begin.
