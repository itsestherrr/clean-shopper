-- Create products table
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text not null,
  category    text not null,
  description text,
  rating      text,           -- populated later by AI: 'clean' | 'caution' | 'avoid'
  ingredients jsonb,          -- populated later by AI analysis
  created_at  timestamptz default now()
);

-- Seed: 20 realistic clean household and personal care products
insert into public.products (name, brand, category, description) values

-- Personal Care
('Pure-Castile Liquid Soap',        'Dr. Bronner''s',        'Personal Care', 'Certified organic, biodegradable castile soap made with fair-trade coconut and hemp oils. Works as body wash, shampoo, and household cleaner.'),
('Natural Deodorant Stick',         'Schmidt''s',            'Personal Care', 'Magnesium-powered formula free from aluminum and baking soda. Long-lasting odor protection with simple, plant-derived ingredients.'),
('Skin Food Original Ultra-Rich Cream', 'Weleda',            'Personal Care', 'Concentrated moisturizer made with pansy, viola, and chamomile extracts. No synthetic fragrances or preservatives.'),
('Shampoo Bar — Coconut + Argan',   'Ethique',               'Personal Care', 'Plastic-free, concentrated solid shampoo bar equivalent to three liquid bottles. Sulfate-free and biodegradable.'),
('Every Man Jack Body Wash',        'Every Man Jack',        'Personal Care', 'Plant-derived body wash with no parabens, dyes, or phthalates. Lightly scented with natural sea salt and cedar.'),

-- Home Cleaning
('All-Purpose Concentrate',         'Branch Basics',         'Home Cleaning', 'One concentrate replaces every cleaner in your home. No fragrance, dyes, or harsh chemicals — dilute with water for different strengths.'),
('Laundry Detergent — Free & Clear','Seventh Generation',    'Home Cleaning', 'Plant-based laundry detergent with zero dyes, synthetic fragrances, or optical brighteners. Effective in cold water.'),
('All-Purpose Cleaner',             'Better Life',           'Home Cleaning', 'Plant-derived, cruelty-free spray made with purified water and coconut-based surfactants. Safe on most surfaces.'),
('Laundry Detergent Sheets',        'Earth Breeze',          'Home Cleaning', 'Dissolvable, zero-plastic laundry sheets that replace liquid or powder detergent. Fragrance-free option available.'),
('Oxygen Brightener Powder',        'Meliora',               'Home Cleaning', 'EWG-verified powder brightener made with sodium percarbonate. No chlorine bleach, synthetic fragrances, or fillers.'),

-- Baby Care
('Gentle Shampoo + Body Wash',      'Babyganics',            'Baby Care',     'Tear-free, fragrance-free 2-in-1 wash formulated without sulfates, parabens, or phthalates. Dermatologist tested.'),
('Organic Baby Lotion',             'Earth Mama',            'Baby Care',     'USDA-certified organic lotion with calendula and shea butter. Unscented and safe for newborns.'),
('Natural Baby Shampoo',            'Puracy',                'Baby Care',     'Hypoallergenic, plant-based shampoo free from sulfates and synthetic fragrances. Clinically tested for sensitive skin.'),
('Diaper Rash Cream',               'The Honest Company',    'Baby Care',     'Non-nano zinc oxide formula with calendula and sunflower oil. Free from parabens, talc, and synthetic fragrances.'),
('Fragrance-Free Baby Oil',         'Burt''s Bees Baby',     'Baby Care',     'Mineral oil-free blend of apricot kernel, lemon, and rosemary oils. Non-greasy and safe for sensitive newborn skin.'),

-- Kitchen
('Dish Soap — Pink Grapefruit',     'Method',                'Kitchen',       'Plant-based, biodegradable dish soap that cuts grease without harsh chemicals. Bottle made from 100% recycled ocean plastic.'),
('Kitchen Dish Soap Bar',           'Meliora',               'Kitchen',       'Zero-waste, concentrated coconut oil soap bar for hand-washing dishes. Plastic-free packaging, no synthetic fragrance.'),
('Fruit & Vegetable Wash',          'Fit Organic',           'Kitchen',       'USDA-certified organic produce wash that removes pesticide residue, wax, and surface impurities better than water alone.'),
('Dish Soap — Free & Clear',        'ECOS',                  'Kitchen',       'Plant-powered, phosphate-free dish soap with no dyes or synthetic fragrance. EPA Safer Choice certified.'),
('Counter + Dish Spray',            'Grove Co.',             'Kitchen',       'Refillable glass spray bottle with plant-derived cleaners. Removes grease and food residue on countertops and dishes without bleach.');
