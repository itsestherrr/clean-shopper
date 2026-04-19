import type { Product } from '../types'

// Raw shape of a product from the Open Beauty Facts API
interface OBFProduct {
  code: string
  _id: string
  product_name?: string
  brands?: string
  image_front_url?: string
  image_front_small_url?: string
  categories_tags?: string[]
  ingredients_text?: string
}

interface OBFResponse {
  count: number
  page: number
  page_size: number
  products: OBFProduct[]
}

const BASE_URL = 'https://world.openbeautyfacts.org/cgi/search.pl'

// Only request the fields we actually use
const FIELDS = [
  'code',
  'product_name',
  'brands',
  'image_front_url',
  'image_front_small_url',
  'categories_tags',
  'ingredients_text',
].join(',')

// Map Open Beauty Facts category tags to our four app categories
function mapCategory(tags: string[] = []): string {
  const joined = tags.join(' ')
  if (/baby|infant|newborn/.test(joined)) return 'Baby Care'
  if (/dish|laundry|household|cleaning|detergent/.test(joined)) return 'Home Cleaning'
  if (/kitchen/.test(joined)) return 'Kitchen'
  return 'Personal Care'
}

// Clean up raw ingredients_text for use as a card description
function formatDescription(ingredientsText?: string): string {
  if (!ingredientsText) return 'No ingredient information available.'
  return ingredientsText
    .replace(/\*+/g, '')       // remove asterisk footnote markers
    .replace(/\r?\n/g, ' ')    // flatten line breaks
    .replace(/\s{2,}/g, ' ')   // collapse extra whitespace
    .trim()
    .slice(0, 180)
}

// Map a raw OBF product to our app's Product type
function mapToProduct(p: OBFProduct): Product | null {
  const name = p.product_name?.trim()
  if (!name) return null // skip products with no name — common in OBF

  // brands is a comma-separated string; take the first one
  const brand = p.brands?.split(',')[0].trim() || 'Unknown Brand'

  return {
    id: p.code || p._id,
    name,
    brand,
    category: mapCategory(p.categories_tags),
    description: formatDescription(p.ingredients_text),
    rating: 'clean',   // placeholder — AI analysis will set the real rating
    ingredients: [],   // placeholder — AI analysis will populate this
    // Prefer the 200px thumbnail for card grids; fall back to full image
    imageUrl: p.image_front_small_url || p.image_front_url || undefined,
  }
}

export async function searchOpenBeautyFacts(
  query: string,
  pageSize = 20,
): Promise<Product[]> {
  const params = new URLSearchParams({
    search_terms: query,
    json: '1',
    action: 'process',
    page_size: String(pageSize),
    fields: FIELDS,
  })

  const response = await fetch(`${BASE_URL}?${params}`)

  if (!response.ok) {
    throw new Error(`Open Beauty Facts API error: ${response.status}`)
  }

  const data: OBFResponse = await response.json()

  return data.products
    .map(mapToProduct)
    .filter((p): p is Product => p !== null)
}
