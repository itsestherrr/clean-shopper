export type Rating = 'clean' | 'caution' | 'avoid'

export interface Ingredient {
  name: string
  rating: Rating
  reason: string
  isUserAvoided?: boolean
}

export interface Product {
  id: string
  name: string
  brand: string
  rating: Rating
  category: string
  description: string
  /** Short product-line context: e.g. "For Normal to Dry Skin · 12 fl oz" */
  subtitle?: string
  /** Brand or formulation claims, rendered as a checklist on PDP */
  claims?: string[]
  ingredients: Ingredient[]
  imageUrl?: string
}

// Shape of a raw row coming back from Supabase
export interface ProductRow {
  id: string
  name: string
  brand: string
  category: string
  description: string | null
  subtitle?: string | null
  claims?: string[] | null
  rating: Rating | null
  ingredients: Ingredient[] | null
  image_url: string | null
}

// Maps a raw Supabase row to the app's Product shape
export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    description: row.description ?? '',
    subtitle: row.subtitle ?? undefined,
    claims: row.claims ?? undefined,
    rating: row.rating ?? 'clean',
    ingredients: row.ingredients ?? [],
    imageUrl: row.image_url ?? undefined,
  }
}
