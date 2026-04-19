-- Row Level Security policies for public.products
-- Apply in Supabase: SQL editor → paste → Run.
-- Safe to re-run: drops existing policies with the same names first.

-- Ensure RLS is on (idempotent).
alter table public.products enable row level security;

-- 1. Read: anyone, signed in or not, can select rows.
drop policy if exists "Products are readable by anyone" on public.products;
create policy "Products are readable by anyone"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- 2a. Write (add): only signed-in users can insert rows.
drop policy if exists "Signed-in users can insert products" on public.products;
create policy "Signed-in users can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

-- 2b. Write (edit): only signed-in users can update rows.
drop policy if exists "Signed-in users can update products" on public.products;
create policy "Signed-in users can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

-- Note: deletes are not covered here. With RLS enabled and no delete policy,
-- all deletes are blocked by default — which is the safer stance. Add a
-- separate delete policy later if you need one.
