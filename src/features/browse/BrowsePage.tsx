import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import EmptyState from '../../components/EmptyState'
import { supabase } from '../../lib/supabase'
import { useSavedProducts } from '../../lib/use-saved-products'
import { type Product, type ProductRow, type Rating, rowToProduct } from '../../lib/types'

const RATINGS: Rating[] = ['clean', 'caution', 'avoid']

function toggleSetValue<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

export default function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { savedIds, toggle: toggleSave } = useSavedProducts()
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set())
  const [ratingFilter, setRatingFilter] = useState<Set<Rating>>(new Set())

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand, category, description, rating, ingredients, image_url')
        .order('created_at', { ascending: true })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setProducts((data as ProductRow[] | null ?? []).map(rowToProduct))
      setLoading(false)
    }

    loadProducts()
  }, [])

  const displayed = products.filter((p) => {
    if (categoryFilter.size > 0 && !categoryFilter.has(p.category)) return false
    if (ratingFilter.size > 0 && !ratingFilter.has(p.rating)) return false
    return true
  })

  const categories = Array.from(new Set(products.map((p) => p.category))).sort()
  const filtersActive = categoryFilter.size > 0 || ratingFilter.size > 0

  return (
    <div>
      <h1 className="text-h1 text-ink-primary mb-sm">Browse Products</h1>
      <p className="text-body text-ink-secondary mb-2xl">
        Explore facial cleansers, moisturizers, body wash, and deodorant rated by ingredient safety.
      </p>

      {error && (
        <p className="text-body text-avoid mb-lg">Failed to load products: {error}</p>
      )}

      <div className="flex flex-col md:flex-row gap-xl">
        {/* Filter sidebar — surface card. Sister sidebar lives on SearchPage; keep in sync. */}
        {!loading && !error && (
          <aside className="md:w-[240px] md:flex-shrink-0">
            <div className="bg-surface-card border-[1.5px] border-surface-divider rounded-card p-lg">
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
            </div>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCard key={i} loading id="" name="" brand="" rating="clean" category="" />
              ))}
            </div>
          )}

          {!loading && !error && filtersActive && (
            <p className="text-small text-ink-tertiary mb-lg">
              {displayed.length} {displayed.length === 1 ? 'result' : 'results'}
            </p>
          )}

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

          {!loading && !error && displayed.length === 0 && (
            <EmptyState
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="4" y="4" width="7" height="7" rx="1.5" />
                  <rect x="13" y="4" width="7" height="7" rx="1.5" />
                  <rect x="4" y="13" width="7" height="7" rx="1.5" />
                  <rect x="13" y="13" width="7" height="7" rx="1.5" />
                </svg>
              }
              title={filtersActive ? 'No products match these filters' : 'No products yet'}
              description={filtersActive ? 'Try removing a filter or two.' : 'The catalog is empty right now.'}
            />
          )}
        </div>
      </div>
    </div>
  )
}
