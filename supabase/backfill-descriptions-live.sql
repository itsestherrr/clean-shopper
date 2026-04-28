-- Backfill descriptions for the 20 products currently in the live DB.
-- Consumer voice: plain language, no em dashes, no ingredient names,
-- no certifications jargon. 1-2 short sentences.
-- Safe to re-run.

-- ── Moisturizer ────────────────────────────────────────────────────────────
update public.products set
  description = 'A lightweight body oil gel that absorbs fast and leaves skin soft and glowing. Good for everyday dry skin without feeling heavy or sticky.'
where name = 'Vaseline, Intensive Care, Cocoa Radiant Body Gel Oil';

update public.products set
  description = 'A classic everyday lotion for dry, sensitive skin. Light enough for daily use and easy to layer under clothes or sunscreen.'
where name = 'Cetaphil Moisturizing Lotion, Dry to Normal Sensitive Skin';

update public.products set
  description = 'A no-fuss daily lotion for face and body. Hydrates without heaviness and works well for skin that gets oily or breaks out easily.'
where name = 'Gold Bond Pure Moisture Daily Body & Face Lotion';

update public.products set
  description = 'A daily body lotion that gives long-lasting hydration without any fragrance. A safe pick for sensitive or easily irritated skin.'
where name = 'Aveeno Daily Moisturizing Lotion, Fragrance Free  (2019 formulation)';

-- ── Deodorant ──────────────────────────────────────────────────────────────
update public.products set
  description = 'An aluminum-free deodorant that handles all-day odor without any added scent. A solid pick if you have sensitive underarms or just prefer no fragrance.'
where name = 'Native Aluminum Free Deodorant, Unscented';

update public.products set
  description = 'A plant-based, aluminum-free deodorant designed for women, with no added fragrance. Gentle enough for sensitive or recently shaved skin.'
where name = 'Attn:Grace Natural Deodorant, Unscented ';

update public.products set
  description = 'A creamy, aluminum-free deodorant that protects against odor while keeping underarms feeling soft. Lightly scented with coconut and shea.'
where name = 'Dove VitaminCare+ Aluminum Free Deodorant Stick for Women Coconut & Shea';

update public.products set
  description = 'An aluminum-free deodorant with no added fragrance, made with naturally derived ingredients. A simple option for sensitive skin.'
where name = 'Tom''s of Maine Deodorant, Unscented';

-- ── Facial Cleanser ────────────────────────────────────────────────────────
update public.products set
  description = 'A gentle cleansing oil that lifts off makeup and daily grime without drying out skin. Especially nice for dry or mature complexions.'
where name = 'Qet Botanicals Restoring Cleansing Oil with Rose';

update public.products set
  description = 'A soft, no-foam face wash that cleanses without stripping the skin. Travel-size and a reliable pick for sensitive skin.'
where name = 'Cetaphil Gentle Face Wash Cleanser for Normal to Dry Skin - Travel Size';

update public.products set
  description = 'A daily gel cleanser that leaves skin feeling balanced and comfortable, not tight. Works for most skin types.'
where name = 'Byra Purify Biotic Cleanser';

update public.products set
  description = 'A travel-friendly face wash that removes makeup and oil while staying gentle on sensitive skin. Easy to slip into a carry-on.'
where name = 'La Roche Posay Toleriane Purifying Facial Cleanser - Travel Size';

-- ── Facial Moisturizer ─────────────────────────────────────────────────────
update public.products set
  description = 'A rich daily cream made for very dry skin, including skin affected by diabetes. Long-lasting hydration that helps soften and protect.'
where name = 'CeraVe Diabetics'' Dry Skin Relief Moisturizing Cream (2020 formulation)';

update public.products set
  description = 'A daily face moisturizer with built-in SPF 30. Hydrates, smooths, and sits well under makeup for everyday use.'
where name = 'Olay Regenerist Hyaluronic +Peptide 24 Hydrating Sunscren Moisturizer, SPF 30';

update public.products set
  description = 'A gentle hydrating cleanser made for sensitive skin. Removes makeup and impurities while leaving skin feeling soft, not stripped.'
where name = 'Neutrogena Hydro Boost Gentle Cleansing Lotion For Sensitive Skin (2020 formulation)';

update public.products set
  description = 'A daily mineral sunscreen moisturizer for sensitive skin. Gives SPF 30 protection while keeping skin comfortable and hydrated.'
where name = 'Vanicream Facial Moisturizer Mineral Sunscreen With Ceramides, SPF 30';

-- ── Body Wash ──────────────────────────────────────────────────────────────
update public.products set
  description = 'A creamy body wash that cleans without leaving skin tight or dry. A daily-shower staple for most skin types.'
where name = 'Dove Deep Moisture Body Wash';

update public.products set
  description = 'A tear-free body wash made for newborns and infants. Gentle enough for delicate baby skin and an everyday bath.'
where name = 'Aveeno Baby Healthy Start Nourishing Newborn Baby Body Wash';

update public.products set
  description = 'A silky, lightly scented body wash with aloe and chamomile for a soothing daily shower. Leaves skin soft and smelling fresh.'
where name = 'Olay Fearless Artist Series Silky Skin Body Wash with Aloe & Notes of Chamomile';

update public.products set
  description = 'A rich body lotion built to repair very dry, rough skin. A good pick when basic moisturizers stop being enough.'
where name = 'Eucerin Original Healing Rich Body Lotion for Dry Skin';
