# Implementation Plan: Replace Contact Form with Website Audit Form

## Overview
We will fully replace the existing `<Contact />` form with our newly polished `<WebsiteAuditForm />` on the homepage, and guarantee all underlying analytics and email automations carry over properly.

## Form Documentation Review Findings
1. **Analytics**: The old `Contact.tsx` component utilized `trackClick('contact_submit')` from `@/lib/analytics`. We need to bring this tracking into the new `WebsiteAuditForm` (e.g., `trackClick('audit_submit')`).
2. **Database & n8n Automation**: The old form saved records to the `submissions` table. The n8n email automation is currently triggered via Supabase Database Webhooks listening to `INSERT` events on `submissions`. Because the new form uses the `audits` table, the webhook will break/not fire.
3. **Payload Differences**: The new `audits` schema provides richer data (`biggest_problem`, `traffic_source`, `revenue_range`) compared to the legacy `message` field.

## Phase 1: Frontend Migration & Tracking
- [x] In `src/components/WebsiteAuditForm.tsx`, import `trackClick` from `@/lib/analytics`.
- [x] Add `trackClick('audit_submit')` directly within the `handleSubmit` success block.
- [x] In `app/page.tsx`, remove the `<Contact />` component rendering and its import to leave only the `WebsiteAuditForm`.

## Phase 2: Backend Automation Fix (n8n & Supabase)
- [ ] Go to your Supabase Dashboard -> Database -> Webhooks.
- [ ] Update the existing webhook (or create a new one) to trigger on `INSERT` events securely on the new `audits` table, pointing to your n8n endpoint.
- [ ] Go into your n8n workflow editor and update the email parser to pull in the new fields instead of the empty `message` key!

## Phase 3: Admin Dashboard Sync & Schema Updates
- [ ] Add a `status` column (default `'new'`) to the `audits` table so the admin dashboard can track progress (New, Contacted, In Progress, Closed).
- [ ] Completely drop the `submissions` table from the Supabase database.
- [ ] Update `app/admin/page.tsx` to query `.from("audits")` instead of `submissions`.
- [ ] Update the TypeScript types inside `app/admin/page.tsx` (`interface Submission` -> `interface Audit`) to expect `biggest_problem`, `traffic_source`, and `revenue_range`.
- [ ] Adjust the UI of the expanded table row in `app/admin/page.tsx` to render these new rich fields in place of the old `message` block.

## Suggestions
- Since the payload now includes `revenue_range`, you can easily set a "priority path" filter inside n8n immediately that automatically flags/tags any lead checking ">$50k" so you know instantly who your hottest leads are through the webhook!
