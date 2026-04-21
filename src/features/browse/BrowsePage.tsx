import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabase'
import { useSavedProducts } from '../../lib/use-saved-products'
import { type Product, type ProductRow, rowToProduct } from '../../lib/types'

export default function BrowsePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { savedIds, toggle: toggleSave } = useSavedProducts()

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

  return (
    <div>
      <h1 className="text-h1 text-ink-primary mb-sm">Browse Products</h1>
      <p className="text-body text-ink-secondary mb-2xl">
        Explore facial cleansers, moisturizers, body wash, and deodorant rated by ingredient safety.
      </p>

      {loading && (
        <p className="text-body text-ink-secondary">Loading products…</p>
      )}

      {error && (
        <p className="text-body text-rating-avoid">Failed to load products: {error}</p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-body text-ink-secondary">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {products.map((product) => (
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
    </div>
  )
}
