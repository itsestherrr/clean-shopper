-- Row Level Security policies for public.saved_products
-- Apply in Supabase: SQL editor → paste → Run.
-- Each user can only see, add, and remove their own saved items.
-- Safe to re-run: drops existing policies with the same names first.

alter table public.saved_products enable row level security;

-- 1. Read: users can only see their own saved products.
drop policy if exists "Users can view their own saved products" on public.saved_products;
create policy "Users can view their own saved products"
  on public.saved_products
  for select
  to authenticated
  using (auth.uid() = user_id);

-- 2. Insert: users can only save products as themselves.
drop policy if exists "Users can save products for themselves" on public.saved_products;
create policy "Users can save products for themselves"
  on public.saved_products
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- 3. Delete: users can only remove their own saved products.
drop policy if exists "Users can remove their own saved products" on public.saved_products;
create policy "Users can remove their own saved products"
  on public.saved_products
  for delete
  to authenticated
  using (auth.uid() = user_id);
