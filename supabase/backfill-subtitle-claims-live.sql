-- Backfill subtitle + claims for the 20 products currently in the live DB
-- (sourced via scripts/seed-ewg-products.js). Match by name to avoid id drift.
-- Safe to re-run: UPDATE is idempotent.

-- ── Moisturizer ────────────────────────────────────────────────────────────
update public.products set
  subtitle = 'Cocoa Butter · 6.8 fl oz',
  claims = '["Locks in moisture all day","Lightweight, non-greasy","Leaves skin glowing","Gentle on dry skin"]'::jsonb
where name = 'Vaseline, Intensive Care, Cocoa Radiant Body Gel Oil';

update public.products set
  subtitle = 'Fragrance-Free · 16 fl oz',
  claims = '["For dry, sensitive skin","Fragrance-free","Dermatologist recommended","Lightweight, fast-absorbing"]'::jsonb
where name = 'Cetaphil Moisturizing Lotion, Dry to Normal Sensitive Skin';

update public.products set
  subtitle = 'Fragrance-Free · 14 oz',
  claims = '["Use on body and face","Hydrates without heaviness","Fragrance-free","Won''t clog pores"]'::jsonb
where name = 'Gold Bond Pure Moisture Daily Body & Face Lotion';

update public.products set
  subtitle = 'Fragrance-Free · 18 fl oz',
  claims = '["24-hour hydration","Fragrance-free","Gentle for sensitive skin","Dermatologist recommended"]'::jsonb
where name = 'Aveeno Daily Moisturizing Lotion, Fragrance Free  (2019 formulation)';

-- ── Deodorant ──────────────────────────────────────────────────────────────
update public.products set
  subtitle = 'Unscented · 2.65 oz',
  claims = '["Aluminum-free","All-day odor protection","Unscented for sensitive skin","Cruelty-free"]'::jsonb
where name = 'Native Aluminum Free Deodorant, Unscented';

update public.products set
  subtitle = 'Unscented · 2.6 oz',
  claims = '["Aluminum-free","Made for women''s bodies","Plant-based formula","Gentle on sensitive skin"]'::jsonb
where name = 'Attn:Grace Natural Deodorant, Unscented ';

update public.products set
  subtitle = 'Coconut & Shea · 2.6 oz',
  claims = '["Aluminum-free","48-hour odor protection","Vitamin-rich for soft skin","Gentle for sensitive underarms"]'::jsonb
where name = 'Dove VitaminCare+ Aluminum Free Deodorant Stick for Women Coconut & Shea';

update public.products set
  subtitle = 'Unscented · 2.25 oz',
  claims = '["Aluminum-free","No artificial fragrance","Made with naturally derived ingredients","Cruelty-free"]'::jsonb
where name = 'Tom''s of Maine Deodorant, Unscented';

-- ── Facial Cleanser ────────────────────────────────────────────────────────
update public.products set
  subtitle = 'Rose · 4 fl oz',
  claims = '["Removes makeup gently","Nourishes while it cleanses","Plant-based formula","Good for dry skin"]'::jsonb
where name = 'Qet Botanicals Restoring Cleansing Oil with Rose';

update public.products set
  subtitle = 'Travel Size · 2 fl oz',
  claims = '["Gentle on sensitive skin","Won''t strip skin''s barrier","Travel-friendly size","Dermatologist recommended"]'::jsonb
where name = 'Cetaphil Gentle Face Wash Cleanser for Normal to Dry Skin - Travel Size';

update public.products set
  subtitle = 'Gel cleanser · 4 fl oz',
  claims = '["Supports skin''s microbiome","Gentle daily cleanse","Plant-powered formula","For all skin types"]'::jsonb
where name = 'Byra Purify Biotic Cleanser';

update public.products set
  subtitle = 'Travel Size · 1.69 fl oz',
  claims = '["Gentle for sensitive skin","Removes makeup and oil","Travel-friendly size","Dermatologist tested"]'::jsonb
where name = 'La Roche Posay Toleriane Purifying Facial Cleanser - Travel Size';

-- ── Facial Moisturizer ─────────────────────────────────────────────────────
update public.products set
  subtitle = 'For diabetic dry skin · 8 oz',
  claims = '["Designed for diabetic dry skin","Long-lasting hydration","Helps restore skin barrier","Fragrance-free"]'::jsonb
where name = 'CeraVe Diabetics'' Dry Skin Relief Moisturizing Cream (2020 formulation)';

update public.products set
  subtitle = 'SPF 30 · 1.7 fl oz',
  claims = '["Daily SPF 30 protection","Hydrates for 24 hours","Lightweight under makeup","Smooths fine lines"]'::jsonb
where name = 'Olay Regenerist Hyaluronic +Peptide 24 Hydrating Sunscren Moisturizer, SPF 30';

update public.products set
  subtitle = 'Sensitive Skin · 6.7 fl oz',
  claims = '["Gentle on sensitive skin","Removes makeup without stripping","Hydrates while it cleanses","Fragrance-free"]'::jsonb
where name = 'Neutrogena Hydro Boost Gentle Cleansing Lotion For Sensitive Skin (2020 formulation)';

update public.products set
  subtitle = 'SPF 30 · 2.5 fl oz',
  claims = '["Mineral SPF 30 protection","Gentle for sensitive skin","Helps restore skin barrier","Free of common irritants"]'::jsonb
where name = 'Vanicream Facial Moisturizer Mineral Sunscreen With Ceramides, SPF 30';

-- ── Body Wash ──────────────────────────────────────────────────────────────
update public.products set
  subtitle = 'Deep Moisture · 22 fl oz',
  claims = '["Moisturizes while you wash","Won''t dry out skin","Rich, creamy lather","Gentle daily formula"]'::jsonb
where name = 'Dove Deep Moisture Body Wash';

update public.products set
  subtitle = 'Newborn formula · 8 fl oz',
  claims = '["Tear-free","Safe for newborns","Gentle on delicate skin","Pediatrician recommended"]'::jsonb
where name = 'Aveeno Baby Healthy Start Nourishing Newborn Baby Body Wash';

update public.products set
  subtitle = 'Aloe + Chamomile · 20 fl oz',
  claims = '["Silky, hydrating lather","Soothes with aloe and chamomile","Leaves skin soft","Indulgent daily wash"]'::jsonb
where name = 'Olay Fearless Artist Series Silky Skin Body Wash with Aloe & Notes of Chamomile';

update public.products set
  subtitle = 'For very dry skin · 16.9 fl oz',
  claims = '["Heals very dry skin","Long-lasting moisture","Fragrance-free","Dermatologist recommended"]'::jsonb
where name = 'Eucerin Original Healing Rich Body Lotion for Dry Skin';
