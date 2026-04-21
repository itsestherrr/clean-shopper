import { useEffect, useState } from 'react'
import { type Product, type ProductRow, type Rating, rowToProduct } from '../../lib/types'

const RATINGS: Rating[] = ['clean', 'caution', 'avoid']
import { supabase } from '../../lib/supabase'
import { useSavedProducts } from '../../lib/use-saved-products'
import ProductCard from '../../components/ProductCard'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'

export default function SearchPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { savedIds, toggle: toggleSave } = useSavedProducts()
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set())
  const [ratingFilter, setRatingFilter] = useState<Set<Rating>>(new Set())

  // Load all products once on mount
  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand, category, description, rating, ingredients, image_url')
        .order('name')

      if (error) {
        setError(error.message)
      } else {
        setAllProducts((data as ProductRow[] | null ?? []).map(rowToProduct))
      }
      setLoading(false)
    }

    loadProducts()
  }, [])

  // Filter client-side — fast enough for this catalog size
  const term = query.trim().toLowerCase()
  const displayed = allProducts.filter((p) => {
    if (term && !(
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    )) return false
    if (categoryFilter.size > 0 && !categoryFilter.has(p.category)) return false
    if (ratingFilter.size > 0 && !ratingFilter.has(p.rating)) return false
    return true
  })

  const categories = Array.from(new Set(allProducts.map((p) => p.category))).sort()
  const filtersActive = categoryFilter.size > 0 || ratingFilter.size > 0

  function toggleSetValue<T>(set: Set<T>, value: T): Set<T> {
    const next = new Set(set)
    next.has(value) ? next.delete(value) : next.add(value)
    return next
  }

  return (
    <div>
      <h1 className="text-h1 text-ink-primary mb-sm">Search Products</h1>
      <p className="text-body text-ink-secondary mb-xl">
        Search facial cleansers, moisturizers, body wash, and deodorant by name or brand.
      </p>

      {/* Search bar */}
      <div className="max-w-[600px] mb-2xl">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search products or brands…"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-body text-avoid mb-lg">Failed to load products: {error}</p>
      )}

      <div className="flex flex-col md:flex-row gap-xl">
        {/* Filter sidebar */}
        {!loading && !error && (
          <aside className="md:w-[220px] md:flex-shrink-0">
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-label uppercase text-ink-tertiary">Filters</h2>
              {filtersActive && (
                <button
                  type="button"
                  onClick={() => { setCategoryFilter(new Set()); setRatingFilter(new Set()) }}
                  className="text-small text-amethyst hover:text-amethyst-110 cursor-pointer bg-transparent border-none"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mb-lg">
              <h3 className="text-small text-ink-secondary font-medium mb-sm">Category</h3>
              <div className="flex flex-col gap-xs">
                {categories.map((c) => (
                  <label key={c} className="flex items-center gap-sm cursor-pointer py-xs">
                    <input
                      type="checkbox"
                      checked={categoryFilter.has(c)}
                      onChange={() => setCategoryFilter((prev) => toggleSetValue(prev, c))}
                      className="accent-amethyst"
                    />
                    <span className="text-body text-ink-primary">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-small text-ink-secondary font-medium mb-sm">Rating</h3>
              <div className="flex flex-col gap-xs">
                {RATINGS.map((r) => (
                  <label key={r} className="flex items-center gap-sm cursor-pointer py-xs">
                    <input
                      type="checkbox"
                      checked={ratingFilter.has(r)}
                      onChange={() => setRatingFilter((prev) => toggleSetValue(prev, r))}
                      className="accent-amethyst"
                    />
                    <span className="text-body text-ink-primary capitalize">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCard key={i} loading id="" name="" brand="" rating="clean" category="" />
              ))}
            </div>
          )}

          {/* Result count — only when filtering is active */}
          {!loading && !error && (term || filtersActive) && (
            <p className="text-small text-ink-tertiary mb-lg">
              {displayed.length} {displayed.length === 1 ? 'result' : 'results'}
              {term && <> for &ldquo;{query.trim()}&rdquo;</>}
            </p>
          )}

          {/* Product grid */}
          {!loading && !error && displayed.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {displayed.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  rating={product.rating}
                  category={product.category}
                  imageUrl={product.imageUrl}
                  saved={savedIds.has(product.id)}
                  onSaveToggle={() => toggleSave(product.id)}
                />
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && !error && (term || filtersActive) && displayed.length === 0 && (
            <EmptyState
              icon="🔍"
              title="No products found"
              description={term ? `No results for "${query.trim()}". Try a different keyword or adjust filters.` : 'No products match the selected filters.'}
            />
          )}
        </div>
      </div>
    </div>
  )
}
