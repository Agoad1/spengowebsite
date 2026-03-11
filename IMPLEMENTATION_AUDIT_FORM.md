# Implementation Plan: Website Audit Form

## Overview
We are rebuilding the existing `WebsiteAuditForm` component and integrating it onto the homepage. This component asks users 4 initial qualifying questions, progressively revealing the next question without hiding previous answers, and finishes with a lead capture form. 

## Current State Audit & Findings
1. **Existing Component Check**: `src/components/WebsiteAuditForm.tsx` currently exists.
   - It correctly connects to the Supabase `audits` table using `@/lib/supabase`.
   - The data model successfully matches the `audits` table schema (`business_type`, `biggest_problem`, `traffic_source`, `revenue_range`, `name`, `email`, `website_url`).
   - The progressive reveal logic works nicely (stacking previous answers), combined with Framer Motion animations.
2. **Missing Implementation Details**:
   - The component is not currently placed in `app/page.tsx`.
   - The design fits the general aesthetic but lacks integration wrapping for the homepage (e.g., standard padding, section wrappers).
3. **Design Adjustments Needed**:
   - Match colors closely to existing patterns (use Spengo's `primary` accents, subtle borders (`border-white/10`), glassomorphic backgrounds (`bg-white/[0.03]`), and glowing accents).
   - Ensure the form stays vertically concise and maintains mobile responsiveness.

## Phase 1: Verify & Polish Form Component
- [x] Review `src/components/WebsiteAuditForm.tsx` to double check exact padding, margins, and typography spacing against components like `Hero.tsx`.
- [x] Make sure `Button` and `lucide-react` icons render correctly with no client/server component conflicts. (Note: Component correctly uses `"use client"`).
- [x] Implement robust error and loading states (currently basic, make sure they feel premium).

## Phase 2: Page Integration
- [ ] Open `app/page.tsx`.
- [ ] Import `WebsiteAuditForm`.
- [ ] Add the component immediately below the `<Hero />` component (before or replacing the top of `<Pricing />` depending on flow).
- [ ] Wrap `<WebsiteAuditForm />` in a standard `<section>` container (e.g., `max-w-4xl mx-auto px-6 py-24`) to give it breathing room. Include a subtle gradient background or blobs if fitting.

## Phase 3: Testing & Polish
- [ ] Compile the application locally (`npm run dev`) and test the entire progressive flow by clicking through all 5 steps.
- [ ] Validate that data is successfully submitted to the `audits` table in Supabase.
- [ ] Ensure mobile readability (especially text sizes and card grids for steps 1-4).

## Issue Management (GITHUB_ISSUES_GUIDE.md)
Following project conventions, we must construct the following tracking issues in GitHub, using milestone tracking if defined.

1. **Master Issue**: `FEAT: Implement Progressive Website Audit Form`
2. **Phase 1 Sub-issue**: `FEAT: [Phase 1] Audit and refine WebsiteAuditForm.tsx component (Design + Logic)`
3. **Phase 2 Sub-issue**: `FEAT: [Phase 2] Integrate WebsiteAuditForm into Homepage under Hero`
4. **Phase 3 Sub-issue**: `FEAT: [Phase 3] Test form flow and Supabase insertion`

**Implementation Rules Recap**:
- Perform hard syncs between GitHub issues and this Markdown checklist.
- Commits must use the format: `[#ISSUE_ID] description...`.
- Always verify completion before moving on.
