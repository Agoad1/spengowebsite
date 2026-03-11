-- Migration: Create audits table
-- Feature: Progressive Disclosure Website Audit Form
-- Date: 2026-03-11

create table if not exists public.audits (
  id            uuid default gen_random_uuid() primary key,
  business_type text,
  biggest_problem text,
  traffic_source text,
  revenue_range text,
  name          text not null,
  email         text not null,
  website_url   text,
  created_at    timestamptz default now() not null
);

-- Index for querying by email (e.g. deduplication, admin lookup)
create index if not exists audits_email_idx on public.audits (email);

-- Index for chronological queries in admin dashboard
create index if not exists audits_created_at_idx on public.audits (created_at desc);

-- Enable Row Level Security
alter table public.audits enable row level security;

-- Allow anonymous inserts (form submissions from unauthenticated visitors)
create policy "Allow public insert" on public.audits
  for insert
  to anon
  with check (true);

-- Only authenticated users (admins) can read audit submissions
create policy "Allow authenticated read" on public.audits
  for select
  to authenticated
  using (true);
