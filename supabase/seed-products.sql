-- Create products table
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text not null,
  category    text not null,
  description text,
  subtitle    text,            -- short retail context: scent / size / variant
  claims      jsonb,           -- consumer-friendly bullet list (e.g. ["Cuts grease easily","Cruelty-free"])
  rating      text,            -- populated later by AI: 'clean' | 'caution' | 'avoid'
  ingredients jsonb,           -- populated later by AI analysis
  created_at  timestamptz default now()
);

-- Seed: 20 realistic clean household and personal care products
insert into public.products (name, brand, category, description, subtitle, claims) values

-- Personal Care
('Pure-Castile Liquid Soap',        'Dr. Bronner''s',        'Personal Care', 'Certified organic, biodegradable castile soap made with fair-trade coconut and hemp oils. Works as body wash, shampoo, and household cleaner.',
  'Peppermint · 32 fl oz',
  '["Works as body wash, shampoo, and household cleaner","Gentle on sensitive skin","Biodegradable formula","Cruelty-free and vegan"]'::jsonb),

('Natural Deodorant Stick',         'Schmidt''s',            'Personal Care', 'Magnesium-powered formula free from aluminum and baking soda. Long-lasting odor protection with simple, plant-derived ingredients.',
  'Bergamot + Lime · 3.25 oz',
  '["Aluminum-free","All-day odor protection","Plant-based and vegan","Gentler option for sensitive skin"]'::jsonb),

('Skin Food Original Ultra-Rich Cream', 'Weleda',            'Personal Care', 'Concentrated moisturizer made with pansy, viola, and chamomile extracts. No synthetic fragrances or preservatives.',
  'Multi-use cream · 2.5 oz',
  '["Deep hydration for very dry skin","Use anywhere — face, hands, elbows","No synthetic fragrance","A cult favorite for nearly a century"]'::jsonb),

('Shampoo Bar — Coconut + Argan',   'Ethique',               'Personal Care', 'Plastic-free, concentrated solid shampoo bar equivalent to three liquid bottles. Sulfate-free and biodegradable.',
  'Solid bar · 4 oz',
  '["Replaces three plastic bottles","Sulfate-free","Travel-friendly — no leaks","Plastic-free packaging"]'::jsonb),

('Every Man Jack Body Wash',        'Every Man Jack',        'Personal Care', 'Plant-derived body wash with no parabens, dyes, or phthalates. Lightly scented with natural sea salt and cedar.',
  'Sea Salt + Cedar · 16.9 fl oz',
  '["Cleans without drying","No parabens or phthalates","Lightly scented","Plant-derived formula"]'::jsonb),

-- Home Cleaning
('All-Purpose Concentrate',         'Branch Basics',         'Home Cleaning', 'One concentrate replaces every cleaner in your home. No fragrance, dyes, or harsh chemicals — dilute with water for different strengths.',
  'Refillable concentrate · 33 fl oz',
  '["One bottle replaces most household cleaners","Fragrance-free and dye-free","Safe around kids and pets","Refillable to cut plastic waste"]'::jsonb),

('Laundry Detergent — Free & Clear','Seventh Generation',    'Home Cleaning', 'Plant-based laundry detergent with zero dyes, synthetic fragrances, or optical brighteners. Effective in cold water.',
  'Free & Clear · 60 loads',
  '["Works in cold water","No dyes or synthetic fragrance","Hypoallergenic","Plant-based formula"]'::jsonb),

('All-Purpose Cleaner',             'Better Life',           'Home Cleaning', 'Plant-derived, cruelty-free spray made with purified water and coconut-based surfactants. Safe on most surfaces.',
  'Citrus Mint · 32 fl oz',
  '["Safe on most surfaces","No harsh chemicals","Cruelty-free","Plant-derived"]'::jsonb),

('Laundry Detergent Sheets',        'Earth Breeze',          'Home Cleaning', 'Dissolvable, zero-plastic laundry sheets that replace liquid or powder detergent. Fragrance-free option available.',
  'Fragrance-Free · 60 loads',
  '["Zero plastic packaging","Pre-measured — no mess","Works in any washer","Lightweight for travel"]'::jsonb),

('Oxygen Brightener Powder',        'Meliora',               'Home Cleaning', 'EWG-verified powder brightener made with sodium percarbonate. No chlorine bleach, synthetic fragrances, or fillers.',
  'Unscented powder · 32 oz',
  '["Brightens whites and lifts stains","No chlorine bleach","Plastic-free packaging","EWG-verified"]'::jsonb),

-- Baby Care
('Gentle Shampoo + Body Wash',      'Babyganics',            'Baby Care',     'Tear-free, fragrance-free 2-in-1 wash formulated without sulfates, parabens, or phthalates. Dermatologist tested.',
  'Fragrance-Free · 16 fl oz',
  '["Tear-free","Dermatologist tested","No sulfates or parabens","Doubles as a bubble bath"]'::jsonb),

('Organic Baby Lotion',             'Earth Mama',            'Baby Care',     'USDA-certified organic lotion with calendula and shea butter. Unscented and safe for newborns.',
  'Unscented · 8 fl oz',
  '["Safe for newborns","USDA-certified organic","Soothes dry, sensitive skin","No synthetic fragrance"]'::jsonb),

('Natural Baby Shampoo',            'Puracy',                'Baby Care',     'Hypoallergenic, plant-based shampoo free from sulfates and synthetic fragrances. Clinically tested for sensitive skin.',
  'Sweet Almond · 16 fl oz',
  '["Hypoallergenic","Tear-free formula","Plant-based","Clinically tested for sensitive skin"]'::jsonb),

('Diaper Rash Cream',               'The Honest Company',    'Baby Care',     'Non-nano zinc oxide formula with calendula and sunflower oil. Free from parabens, talc, and synthetic fragrances.',
  'Fragrance-Free · 2.5 oz',
  '["Soothes irritation fast","Pediatrician tested","No parabens or talc","Safe for newborns"]'::jsonb),

('Fragrance-Free Baby Oil',         'Burt''s Bees Baby',     'Baby Care',     'Mineral oil-free blend of apricot kernel, lemon, and rosemary oils. Non-greasy and safe for sensitive newborn skin.',
  'Unscented · 4 fl oz',
  '["Locks in moisture after baths","No mineral oil","Safe for newborn skin","Plant-based blend"]'::jsonb),

-- Kitchen
('Dish Soap — Pink Grapefruit',     'Method',                'Kitchen',       'Plant-based, biodegradable dish soap that cuts grease without harsh chemicals. Bottle made from 100% recycled ocean plastic.',
  'Pink Grapefruit · 18 fl oz',
  '["Cuts grease easily","Biodegradable formula","Bottle made from recycled ocean plastic","Cruelty-free"]'::jsonb),

('Kitchen Dish Soap Bar',           'Meliora',               'Kitchen',       'Zero-waste, concentrated coconut oil soap bar for hand-washing dishes. Plastic-free packaging, no synthetic fragrance.',
  'Unscented bar · 9 oz',
  '["Plastic-free","Long-lasting concentrated bar","Plant-based","Compostable packaging"]'::jsonb),

('Fruit & Vegetable Wash',          'Fit Organic',           'Kitchen',       'USDA-certified organic produce wash that removes pesticide residue, wax, and surface impurities better than water alone.',
  'Spray · 12 fl oz',
  '["Removes pesticide residue and wax","USDA-certified organic","Rinse-free option","Safe for all produce"]'::jsonb),

('Dish Soap — Free & Clear',        'ECOS',                  'Kitchen',       'Plant-powered, phosphate-free dish soap with no dyes or synthetic fragrance. EPA Safer Choice certified.',
  'Free & Clear · 25 fl oz',
  '["No dyes or synthetic fragrance","Plant-powered","EPA Safer Choice certified","Greywater-safe"]'::jsonb),

('Counter + Dish Spray',            'Grove Co.',             'Kitchen',       'Refillable glass spray bottle with plant-derived cleaners. Removes grease and food residue on countertops and dishes without bleach.',
  'Lemon Eucalyptus · 16 fl oz',
  '["Refillable glass bottle","No bleach","Cuts food residue","Cruelty-free"]'::jsonb);
