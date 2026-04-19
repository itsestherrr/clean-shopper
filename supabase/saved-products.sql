-- saved_products: join table for "which user saved which product"
-- Apply in Supabase: SQL editor → paste → Run.

create table if not exists public.saved_products (
  user_id    uuid        not null references auth.users(id)   on delete cascade,
  product_id uuid        not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);
