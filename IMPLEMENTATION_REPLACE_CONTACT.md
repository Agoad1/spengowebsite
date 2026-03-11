# Implementation Plan: Replace Contact Form with Website Audit Form

## Overview
We will fully replace the existing `<Contact />` form with our newly polished `<WebsiteAuditForm />` on the homepage, and guarantee all underlying analytics and email automations carry over properly.

## Form Documentation Review Findings
1. **Analytics**: The old `Contact.tsx` component utilized `trackClick('contact_submit')` from `@/lib/analytics`. We need to bring this tracking into the new `WebsiteAuditForm` (e.g., `trackClick('audit_submit')`).
2. **Database & n8n Automation**: The old form saved records to the `submissions` table. The n8n email automation is currently triggered via Supabase Database Webhooks listening to `INSERT` events on `submissions`. Because the new form uses the `audits` table, the webhook will break/not fire.
3. **Payload Differences**: The new `audits` schema provides richer data (`biggest_problem`, `traffic_source`, `revenue_range`) compared to the legacy `message` field.

## Phase 1: Frontend Migration & Tracking
- [ ] In `src/components/WebsiteAuditForm.tsx`, import `trackClick` from `@/lib/analytics`.
- [ ] Add `trackClick('audit_submit')` directly within the `handleSubmit` success block.
- [ ] In `app/page.tsx`, remove the `<Contact />` component rendering and its import to leave only the `WebsiteAuditForm`.

## Phase 2: Webhook & Backend Sync (n8n)
- [ ] **Action Required**: Log into the Supabase Dashboard -> Database -> Webhooks.
- [ ] Update the existing webhook (or create a new one) to trigger on `INSERT` events for the `audits` table instead of the `submissions` table.
- [ ] Point the webhook to the matching n8n webhook URL.
- [ ] **n8n Workflow Update**: Update the n8n flow to map the new variables (e.g., `biggest_problem`, `revenue_range`, `traffic_source`) into the email body, replacing the old `message` variable mapping.

## Suggestions & Best Practices
1. **Soft Delete vs Drop**: Do not drop the `submissions` table or its webhook immediately. Keep it around for a month for historical backup before deprecating.
2. **Email Template**: Use the rich data from the `audits` table to create a more customized internal notification (e.g., "High-value lead over $50k revenue!").
3. **MavChat Webhook**: The chatbot (`MavChat.jsx`) currently hardcodes an n8n webhook URL (`https://goadlabs...`). We should ensure our Supabase webhook uses the correct environment URLs or dashboard settings securely.
