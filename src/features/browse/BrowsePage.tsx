import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import Modal from '../../components/Modal'
import IngredientList from '../../components/IngredientList'
import IngredientBar from '../../components/IngredientBar'
import RatingBadge from '../../components/RatingBadge'
import { supabase } from '../../lib/supabase'

type Rating = 'clean' | 'caution' | 'avoid'

interface Ingredient {
  name: string
  rating: Rating
  reason: string
  isUserAvoided?: boolean
}

interface Product {
  id: string
  name: string
  brand: string
  rating: Rating
  category: string
  description: string
  ingredients: Ingredient[]
}

interface ProductRow {
  id: string
  name: string
  brand: string
  category: string
  description: string | null
  rating: Rating | null
  ingredients: Ingredient[] | null
}

export default function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand, category, description, rating, ingredients')
        .order('created_at', { ascending: true })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      const mapped: Product[] = (data as ProductRow[] | null ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        brand: row.brand,
        category: row.category,
        description: row.description ?? '',
        rating: row.rating ?? 'clean',
        ingredients: row.ingredients ?? [],
      }))

      setProducts(mapped)
      setLoading(false)
    }

    loadProducts()
  }, [])

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div>
      <h1 className="text-h1 text-text-primary mb-sm">Browse Products</h1>
      <p className="text-body text-text-secondary mb-2xl">
        Explore products and check their ingredient safety ratings.
      </p>

      {loading && (
        <p className="text-body text-text-secondary">Loading products…</p>
      )}

      {error && (
        <p className="text-body text-rating-avoid">Failed to load products: {error}</p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-body text-text-secondary">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            brand={product.brand}
            rating={product.rating}
            category={product.category}
            description={product.description}
            saved={savedIds.has(product.id)}
            onSave={() => toggleSave(product.id)}
            onAddToList={() => console.log('add to list', product.id)}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

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
            <p className="text-body text-text-secondary mb-lg">{selectedProduct.description}</p>

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
          </div>
        )}
      </Modal>
    </div>
  )
}
