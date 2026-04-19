import { useEffect, useState } from 'react'
import { type Product, type ProductRow, rowToProduct } from '../../lib/types'
import { supabase } from '../../lib/supabase'
import ProductCard from '../../components/ProductCard'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import Modal from '../../components/Modal'
import IngredientList from '../../components/IngredientList'
import IngredientBar from '../../components/IngredientBar'
import RatingBadge from '../../components/RatingBadge'

export default function SearchPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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
  const displayed = term
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      )
    : allProducts

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const hasStructuredIngredients = (selectedProduct?.ingredients.length ?? 0) > 0

  // Parse raw ingredient text into a display list when AI analysis isn't available yet
  const rawIngredientNames = selectedProduct?.description
    ? selectedProduct.description
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  return (
    <div>
      <h1 className="text-h1 text-text-primary mb-sm">Search Products</h1>
      <p className="text-body text-text-secondary mb-xl">
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

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCard key={i} loading name="" brand="" rating="clean" category="" description="" />
          ))}
        </div>
      )}

      {/* Result count — only when actively filtering */}
      {!loading && !error && term && (
        <p className="text-small text-text-tertiary mb-lg">
          {displayed.length} {displayed.length === 1 ? 'result' : 'results'} for &ldquo;{query.trim()}&rdquo;
        </p>
      )}

      {/* Product grid */}
      {!loading && !error && displayed.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {displayed.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              brand={product.brand}
              rating={product.rating}
              category={product.category}
              description={product.description}
              imageUrl={product.imageUrl}
              saved={savedIds.has(product.id)}
              onSave={() => toggleSave(product.id)}
              onAddToList={() => console.log('add to list', product.id)}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {/* No results — only shown when filtering returns nothing */}
      {!loading && !error && term && displayed.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No products found"
          description={`No results for "${query.trim()}". Try a different keyword or brand name.`}
        />
      )}

      {/* Product detail modal */}
      <Modal
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
      >
        {selectedProduct && (
          <div>
            <div className="flex items-center gap-sm mb-md">
              <span className="text-body text-text-secondary">{selectedProduct.brand}</span>
              <RatingBadge rating={selectedProduct.rating} />
            </div>

            {hasStructuredIngredients ? (
              <>
                <IngredientBar
                  counts={{
                    clean: selectedProduct.ingredients.filter((i) => i.rating === 'clean').length,
                    caution: selectedProduct.ingredients.filter((i) => i.rating === 'caution').length,
                    avoid: selectedProduct.ingredients.filter((i) => i.rating === 'avoid').length,
                  }}
                />
                <div className="mt-lg">
                  <IngredientList ingredients={selectedProduct.ingredients} />
                </div>
              </>
            ) : rawIngredientNames.length > 0 ? (
              <div>
                <p className="text-label uppercase text-text-tertiary mb-md">Ingredients</p>
                <div className="flex flex-col">
                  {rawIngredientNames.map((name, i) => (
                    <div
                      key={i}
                      className="py-sm border-b border-surface-divider last:border-none"
                    >
                      <span className="text-h4 text-text-primary">{name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-small text-text-tertiary mt-lg">
                  Safety ratings coming once AI analysis is run.
                </p>
              </div>
            ) : (
              <p className="text-small text-text-tertiary">
                No ingredient information available for this product.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
