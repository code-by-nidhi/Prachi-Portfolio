-- Run once in your Supabase project: Dashboard → SQL Editor → New query → paste → Run.

-- All site content lives in a single JSON row (id = 1).
create table if not exists public.site_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Lock the table down: only the server (using the secret key) can read or write it.
alter table public.site_content enable row level security;

-- Public bucket for images and the resume PDF uploaded from the dashboard.
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;
