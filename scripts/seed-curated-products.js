/**
 * Seed curated products into Supabase.
 * Searches Open Beauty Facts for each target product, picks the best match
 * with a real image, and inserts it into the products table.
 *
 * Run with: node scripts/seed-curated-products.js
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://demgshpqpgtmlzwgclcm.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbWdzaHBxcGd0bWx6d2djbGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzI4NjksImV4cCI6MjA5MjEwODg2OX0.vfCMOsLphyphziaDcPhZXAdm_Z6n2M22fNjihilRXmQ'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const OBF_FIELDS = [
  'code',
  'product_name',
  'brands',
  'image_front_url',
  'image_front_small_url',
  'ingredients_text',
].join(',')

// 40 handpicked, recognizable products across all four categories.
// 'search' is the query sent to Open Beauty Facts.
// 'brand' and 'category' are used as-is in the database.
const TARGETS = [
  // ── Personal Care ─────────────────────────────────────────────────────────
  { search: 'Cetaphil Daily Facial Cleanser',         brand: 'Cetaphil',       category: 'Personal Care' },
  { search: 'Cetaphil Moisturizing Cream',            brand: 'Cetaphil',       category: 'Personal Care' },
  { search: 'CeraVe Moisturizing Cream',              brand: 'CeraVe',         category: 'Personal Care' },
  { search: 'CeraVe Hydrating Facial Cleanser',       brand: 'CeraVe',         category: 'Personal Care' },
  { search: 'Aveeno Daily Moisturizing Lotion',       brand: 'Aveeno',         category: 'Personal Care' },
  { search: 'Neutrogena Hydro Boost Water Gel',       brand: 'Neutrogena',     category: 'Personal Care' },
  { search: 'Dove Beauty Bar Original',               brand: 'Dove',           category: 'Personal Care' },
  { search: "Burt's Bees Beeswax Lip Balm",          brand: "Burt's Bees",    category: 'Personal Care' },
  { search: "Dr Bronner's Pure Castile Soap",         brand: "Dr. Bronner's",  category: 'Personal Care' },
  { search: 'Vanicream Moisturizing Cream',           brand: 'Vanicream',      category: 'Personal Care' },
  { search: 'Native Deodorant Coconut Vanilla',       brand: 'Native',         category: 'Personal Care' },
  { search: 'Nivea Soft Moisturizing Cream',          brand: 'Nivea',          category: 'Personal Care' },
  { search: 'Olay Regenerist Micro-Sculpting Cream',  brand: 'Olay',           category: 'Personal Care' },
  { search: 'Weleda Skin Food',                       brand: 'Weleda',         category: 'Personal Care' },
  { search: 'EltaMD UV Clear Sunscreen SPF 46',       brand: 'EltaMD',         category: 'Personal Care' },

  // ── Home Cleaning ─────────────────────────────────────────────────────────
  { search: 'Method All-Purpose Cleaner',             brand: 'Method',         category: 'Home Cleaning' },
  { search: 'Method Laundry Detergent',               brand: 'Method',         category: 'Home Cleaning' },
  { search: 'Seventh Generation Dish Soap',           brand: 'Seventh Generation', category: 'Home Cleaning' },
  { search: 'Seventh Generation Laundry Detergent',   brand: 'Seventh Generation', category: 'Home Cleaning' },
  { search: "Mrs Meyer's Clean Day Multi-Surface Spray", brand: "Mrs. Meyer's",  category: 'Home Cleaning' },
  { search: 'ECOS Laundry Detergent',                 brand: 'ECOS',           category: 'Home Cleaning' },
  { search: 'Tide Free and Gentle Laundry Detergent', brand: 'Tide',           category: 'Home Cleaning' },
  { search: 'Ecover Laundry Detergent',               brand: 'Ecover',         category: 'Home Cleaning' },
  { search: 'Attitude Natural Laundry Detergent',     brand: 'Attitude',       category: 'Home Cleaning' },
  { search: 'Biokleen Laundry Powder',                brand: 'Biokleen',       category: 'Home Cleaning' },

  // ── Baby Care ─────────────────────────────────────────────────────────────
  { search: 'Aveeno Baby Daily Moisture Lotion',      brand: 'Aveeno Baby',    category: 'Baby Care' },
  { search: 'CeraVe Baby Moisturizing Lotion',        brand: 'CeraVe',         category: 'Baby Care' },
  { search: "Burt's Bees Baby Lotion",                brand: "Burt's Bees Baby", category: 'Baby Care' },
  { search: 'Honest Company Baby Shampoo Wash',       brand: 'The Honest Company', category: 'Baby Care' },
  { search: 'Babyganics Shampoo Body Wash',           brand: 'Babyganics',     category: 'Baby Care' },
  { search: 'Earth Mama Organic Baby Lotion',         brand: 'Earth Mama',     category: 'Baby Care' },
  { search: 'Mustela Gentle Cleansing Gel Baby',      brand: 'Mustela',        category: 'Baby Care' },
  { search: "Johnson's Baby Lotion",                  brand: "Johnson's",      category: 'Baby Care' },

  // ── Kitchen ───────────────────────────────────────────────────────────────
  { search: 'Method Dish Soap Pink Grapefruit',       brand: 'Method',         category: 'Kitchen' },
  { search: 'Seventh Generation Dish Soap Free Clear',brand: 'Seventh Generation', category: 'Kitchen' },
  { search: 'Dawn Platinum Dish Soap',                brand: 'Dawn',           category: 'Kitchen' },
  { search: 'Palmolive Ultra Dish Soap',              brand: 'Palmolive',      category: 'Kitchen' },
  { search: "Mrs Meyer's Clean Day Dish Soap",        brand: "Mrs. Meyer's",   category: 'Kitchen' },
  { search: 'Ecover Dish Soap Lemon',                 brand: 'Ecover',         category: 'Kitchen' },
  { search: 'Puracy Natural Dish Soap',               brand: 'Puracy',         category: 'Kitchen' },
]

// ── Helpers ────────────────────────────────────────────────────────────────

async function fetchBestMatch(searchTerm) {
  const params = new URLSearchParams({
    search_terms: searchTerm,
    json: '1',
    action: 'process',
    page_size: '10',
    fields: OBF_FIELDS,
  })

  const res = await fetch(
    `https://world.openbeautyfacts.org/cgi/search.pl?${params}`
  )
  if (!res.ok) throw new Error(`OBF API error: ${res.status}`)

  const data = await res.json()

  // Prefer a result that has both a name and an image; fall back to name-only
  return (
    data.products?.find((p) => p.product_name?.trim() && p.image_front_url) ??
    data.products?.find((p) => p.product_name?.trim()) ??
    null
  )
}

function cleanIngredients(text) {
  if (!text) return null
  return text
    .replace(/\*+/g, '')
    .replace(/\r?\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, 300)
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🧹 Clearing existing products...')
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .gte('created_at', '2020-01-01')

  if (deleteError) {
    console.error('Could not clear products table:', deleteError.message)
    console.log(
      '\nFix: run  DELETE FROM products;  in the Supabase SQL editor, then re-run this script.'
    )
    process.exit(1)
  }

  console.log(`\n🌱 Seeding ${TARGETS.length} products...\n`)

  let success = 0
  let withImage = 0

  for (const target of TARGETS) {
    process.stdout.write(`  ${target.search}... `)

    let match = null
    try {
      match = await fetchBestMatch(target.search)
    } catch (err) {
      console.log(`⚠️  API error: ${err.message}`)
      await sleep(1000)
      continue
    }

    const row = {
      name: match?.product_name?.trim() ?? target.search,
      brand: target.brand,
      category: target.category,
      description: cleanIngredients(match?.ingredients_text),
      image_url: match?.image_front_url ?? null,
    }

    const { error } = await supabase.from('products').insert(row)

    if (error) {
      console.log(`✗  ${error.message}`)
    } else {
      const hasImg = !!row.image_url
      console.log(hasImg ? '✓  (image ✓)' : '✓  (no image)')
      success++
      if (hasImg) withImage++
    }

    // Be respectful of OBF rate limits
    await sleep(600)
  }

  console.log(`\n✅  Done — ${success}/${TARGETS.length} inserted, ${withImage} with images.\n`)
}

main()
