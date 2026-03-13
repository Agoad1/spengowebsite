-- Migration: Update audits table (add status) and drop submissions table
-- Feature: Progressive Disclosure Website Audit Form & Admin Fix
-- Date: 2026-03-11

-- 1. Drop the legacy submissions table and its policies
drop table if exists public.submissions;

-- 2. Add the status column to the new audits table (default to 'new')
alter table public.audits
add column if not exists status text default 'new';
