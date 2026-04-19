import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import Modal from '../../components/Modal'
import IngredientList from '../../components/IngredientList'
import IngredientBar from '../../components/IngredientBar'
import RatingBadge from '../../components/RatingBadge'
import EmptyState from '../../components/EmptyState'
import { supabase } from '../../lib/supabase'
import { useSavedProducts } from '../../lib/use-saved-products'
import { type Product, type ProductRow, rowToProduct } from '../../lib/types'

export default function LibraryPage() {
  const { savedIds, toggle: toggleSave, loading: savedLoading } = useSavedProducts()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (savedLoading) return

    if (savedIds.size === 0) {
      setProducts([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    supabase
      .from('products')
      .select('id, name, brand, category, description, rating, ingredients, image_url')
      .in('id', Array.from(savedIds))
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setError(error.message)
        } else {
          setProducts((data as ProductRow[] | null ?? []).map(rowToProduct))
          setError(null)
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [savedIds, savedLoading])

  const displayed = products.filter((p) => savedIds.has(p.id))

  return (
    <div>
      <h1 className="text-h1 text-text-primary mb-sm">Library</h1>
      <p className="text-body text-text-secondary mb-2xl">
        Products you&rsquo;ve saved for later.
      </p>

      {error && (
        <p className="text-body text-avoid mb-lg">Failed to load library: {error}</p>
      )}

      {(loading || savedLoading) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCard key={i} loading name="" brand="" rating="clean" category="" description="" />
          ))}
        </div>
      )}

      {!loading && !savedLoading && !error && displayed.length === 0 && (
        <EmptyState
          icon="♡"
          title="No saved products yet"
          description="Tap the heart on any product to save it here."
        />
      )}

      {!loading && !savedLoading && !error && displayed.length > 0 && (
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
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

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
            <p className="text-body text-text-secondary mb-lg">{selectedProduct.description}</p>

            {selectedProduct.ingredients.length > 0 && (
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
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
