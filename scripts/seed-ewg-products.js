/**
 * Seed 20 curated products from EWG Skin Deep into Supabase.
 * Fetches the EWG search page to find the best match, then fetches
 * the product detail page to get the ingredient list.
 *
 * Run with: node scripts/seed-ewg-products.js
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://demgshpqpgtmlzwgclcm.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbWdzaHBxcGd0bWx6d2djbGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzI4NjksImV4cCI6MjA5MjEwODg2OX0.vfCMOsLphyphziaDcPhZXAdm_Z6n2M22fNjihilRXmQ'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// 20 curated products across 5 cosmetics categories sourced from EWG Skin Deep.
// Use 'url' to go directly to a specific EWG product page (no search guessing).
// Use 'search' to find the best match via EWG search.
// 'brand' and 'category' are always stored as-is.
const TARGETS = [
  // ── Facial Cleanser (4) ────────────────────────────────────────────────────
  { search: 'Cetaphil gentle cleanser',           brand: 'Cetaphil',        category: 'Facial Cleanser' },
  { url: 'https://www.ewg.org/skindeep/products/966950-Codex_Labs_Antu_Refreshing_Gel_Cleanser_old_formulation/', brand: 'Codex Labs',    category: 'Facial Cleanser' },
  { url: 'https://www.ewg.org/skindeep/products/988335-Noorskin_Fresh_Start__Facial_Gel_Cleanser/',               brand: 'Noorskin',      category: 'Facial Cleanser' },
  { search: 'La Roche-Posay cleanser',            brand: 'La Roche-Posay',  category: 'Facial Cleanser' },

  // ── Facial Moisturizer (4) ─────────────────────────────────────────────────
  { search: 'CeraVe moisturizing cream',          brand: 'CeraVe',          category: 'Facial Moisturizer' },
  { search: 'Olay regenerist moisturizer',        brand: 'Olay',            category: 'Facial Moisturizer' },
  { search: 'Neutrogena hydro boost',             brand: 'Neutrogena',      category: 'Facial Moisturizer' },
  { search: 'Vanicream moisturizer',              brand: 'Vanicream',       category: 'Facial Moisturizer' },

  // ── Body Wash (4) ──────────────────────────────────────────────────────────
  { search: 'Dove deep moisture body wash',       brand: 'Dove',            category: 'Body Wash' },
  { search: 'Aveeno body wash',                   brand: 'Aveeno',          category: 'Body Wash' },
  { search: 'Olay body wash',                     brand: 'Olay',            category: 'Body Wash' },
  { search: 'Eucerin original healing',           brand: 'Eucerin',         category: 'Body Wash' },

  // ── Moisturizer (4) ────────────────────────────────────────────────────────
  { search: 'Aveeno daily moisturizing lotion',   brand: 'Aveeno',          category: 'Moisturizer' },
  { search: 'Vaseline intensive care',            brand: 'Vaseline',        category: 'Moisturizer' },
  { search: 'Cetaphil moisturizing lotion',       brand: 'Cetaphil',        category: 'Moisturizer' },
  { search: 'Gold Bond moisturizer',              brand: 'Gold Bond',       category: 'Moisturizer' },

  // ── Deodorant (4) ─────────────────────────────────────────────────────────
  { search: 'Native deodorant',                   brand: 'Native',          category: 'Deodorant' },
  { url: 'https://www.ewg.org/skindeep/products/884051-ATTITUDE_Super_Leaves_Deodorant__Pear__Amber/', brand: 'Attitude', category: 'Deodorant' },
  { search: 'Dove deodorant',                     brand: 'Dove',            category: 'Deodorant' },
  { search: 'Toms of Maine deodorant',            brand: "Tom's of Maine",  category: 'Deodorant' },
]

const EWG_SEARCH_BASE = 'https://www.ewg.org/skindeep/search/'
const EWG_BASE = 'https://www.ewg.org'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-US,en;q=0.9',
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// Decode HTML entities in product names (EWG returns &#39; &amp; etc.)
function decodeHtml(str) {
  if (!str) return str
  return str
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}

// Map EWG hazard level to our rating
function mapRating(hazardText) {
  if (!hazardText) return 'caution'
  if (hazardText.includes('LOW')) return 'clean'
  if (hazardText.includes('HIGH')) return 'avoid'
  return 'caution' // MODERATE
}

// ── Search page parsing ────────────────────────────────────────────────────

async function fetchSearchPage(searchTerm) {
  const url = `${EWG_SEARCH_BASE}?search=${encodeURIComponent(searchTerm)}`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`EWG search error: ${res.status}`)
  return res.text()
}

function parseSearchResults(html) {
  // Extract all product-tile blocks
  const tileRegex = /class="product-tile[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g
  const tiles = []
  let match

  // Simpler: extract all href+img pairs from tiles
  const hrefRegex = /href="(https?:\/\/www\.ewg\.org\/skindeep\/products\/[^"]+)"/g
  const imgRegex = /class="product-image"[^>]+src="([^"]+)"/g
  const hazardRegex = /(LOW|MODERATE|HIGH) HAZARD/g
  const altRegex = /class="product-image"[^>]+alt="([^"]+)"/g

  const hrefs = [...html.matchAll(hrefRegex)].map(m => m[1])
  const imgs = [...html.matchAll(imgRegex)].map(m => m[1])
  const hazards = [...html.matchAll(hazardRegex)].map(m => m[0])
  const alts = [...html.matchAll(altRegex)].map(m => m[1])

  // Return the first result that has both an image and a hazard rating
  for (let i = 0; i < hrefs.length; i++) {
    if (imgs[i] && hazards[i] && alts[i]) {
      return {
        productUrl: hrefs[i],
        imageUrl: imgs[i],
        name: alts[i],
        hazard: hazards[i],
      }
    }
  }

  // Fall back to first result with an image
  if (hrefs[0] && imgs[0]) {
    return {
      productUrl: hrefs[0],
      imageUrl: imgs[0],
      name: alts[0] || '',
      hazard: hazards[0] || 'MODERATE HAZARD',
    }
  }

  return null
}

// ── Product page parsing ───────────────────────────────────────────────────

async function fetchProductPage(productUrl) {
  const res = await fetch(productUrl, { headers: HEADERS })
  if (!res.ok) throw new Error(`EWG product error: ${res.status}`)
  return res.text()
}

// Parse name, image, and hazard directly from a product detail page
function parseProductPage(html) {
  const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/)
  const imgMatch = html.match(/class="product-image"[^>]+src="([^"]+)"/)
  const altMatch = html.match(/class="product-image"[^>]+alt="([^"]+)"/)
  const hazardMatch = html.match(/(LOW|MODERATE|HIGH) HAZARD/)
  return {
    name: decodeHtml(altMatch?.[1] || nameMatch?.[1]?.trim() || ''),
    imageUrl: imgMatch?.[1] || null,
    hazard: hazardMatch?.[0] || 'MODERATE HAZARD',
  }
}

function parseIngredients(html) {
  // EWG renders ingredients as ALL-CAPS names followed by "Data Availability:"
  // Pattern in the raw HTML: <span class="ingredient-name">WATER</span> or similar
  // From our inspection, the text looks like: \nWATER\nData Availability: Robust\n

  // Try to find structured ingredient spans first
  const spanRegex = /<[^>]*class="[^"]*ingredient[^"]*"[^>]*>([^<]+)<\/[^>]+>/gi
  const spanMatches = [...html.matchAll(spanRegex)].map(m => m[1].trim()).filter(Boolean)
  if (spanMatches.length > 3) return spanMatches

  // Fallback: parse ingredient names from the text pattern we observed
  // Ingredients appear as ALL-CAPS text followed by "Data Availability:"
  const textRegex = /\n([A-Z][A-Z0-9\s\/,\-().]+)\nData Availability:/g
  const textMatches = [...html.matchAll(textRegex)]
    .map(m => m[1].trim())
    .filter(name => name.length > 1 && name.length < 60)

  return textMatches
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
    console.log('\nFix: run  DELETE FROM products;  in the Supabase SQL editor, then re-run this script.')
    process.exit(1)
  }

  console.log(`\n🌱 Seeding ${TARGETS.length} products from EWG...\n`)

  let success = 0
  let withIngredients = 0

  for (const target of TARGETS) {
    const label = target.url ? target.url.split('/').filter(Boolean).pop() : target.search
    process.stdout.write(`  ${label}... `)

    let productUrl = target.url || null
    let searchResult = null

    // 1a. If a direct URL is provided, skip the search step
    if (target.url) {
      productUrl = target.url
    } else {
      // 1b. Otherwise search EWG to find the product URL
      try {
        const searchHtml = await fetchSearchPage(target.search)
        searchResult = parseSearchResults(searchHtml)
      } catch (err) {
        console.log(`⚠️  Search failed: ${err.message}`)
        await sleep(1000)
        continue
      }
      if (!searchResult) {
        console.log('⚠️  No match found')
        continue
      }
      productUrl = searchResult.productUrl
      await sleep(600)
    }

    // 2. Fetch product detail page for name, image, hazard, and ingredients
    let pageData = null
    let ingredients = []
    try {
      const productHtml = await fetchProductPage(productUrl)
      pageData = parseProductPage(productHtml)
      const names = parseIngredients(productHtml)
      ingredients = names.map(name => ({ name, rating: 'clean', reason: '' }))
    } catch (err) {
      console.log(`⚠️  Product page failed: ${err.message}`)
      await sleep(1000)
      continue
    }

    // For search-based targets, prefer search result image (thumbnail CDN URL)
    // For direct URL targets, use the image from the product page
    const imageUrl = target.url ? pageData.imageUrl : (searchResult?.imageUrl || pageData.imageUrl)
    const hazard = target.url ? pageData.hazard : (searchResult?.hazard || pageData.hazard)
    const name = target.url ? pageData.name : (decodeHtml(searchResult?.name) || pageData.name)

    const rating = mapRating(hazard)

    const row = {
      name: name || label,
      brand: target.brand,
      category: target.category,
      description: null,
      rating,
      ingredients: ingredients.length > 0 ? ingredients : [],
      image_url: imageUrl,
    }

    const { error } = await supabase.from('products').insert(row)

    if (error) {
      console.log(`✗  ${error.message}`)
    } else {
      const ingCount = ingredients.length
      console.log(`✓  ${rating} | ${ingCount} ingredients | image ✓`)
      success++
      if (ingCount > 0) withIngredients++
    }

    await sleep(600)
  }

  console.log(`\n✅  Done — ${success}/${TARGETS.length} inserted, ${withIngredients} with ingredients.\n`)
}

main()
