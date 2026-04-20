import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge'
import CategoryTag from '../../components/CategoryTag'
import IngredientList from '../../components/IngredientList'
import IngredientBar from '../../components/IngredientBar'
import { supabase } from '../../lib/supabase'
import { useSavedProducts } from '../../lib/use-saved-products'
import { type Product, type ProductRow, rowToProduct } from '../../lib/types'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { savedIds, toggle: toggleSave } = useSavedProducts()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setNotFound(false)

    supabase
      .from('products')
      .select('id, name, brand, category, description, rating, ingredients, image_url')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setError(error.message)
        } else if (!data) {
          setNotFound(true)
        } else {
          setProduct(rowToProduct(data as ProductRow))
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-small text-ink-secondary hover:text-amethyst mb-lg cursor-pointer bg-transparent border-none p-0"
        >
          ← Back
        </button>
        <div className="animate-pulse">
          <div className="bg-surface-muted rounded-asym aspect-square max-w-[480px] mb-lg" />
          <div className="h-8 bg-surface-muted rounded w-2/3 mb-md" />
          <div className="h-4 bg-surface-muted rounded w-1/3" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-small text-ink-secondary hover:text-amethyst mb-lg cursor-pointer bg-transparent border-none p-0"
        >
          ← Back
        </button>
        <p className="text-body text-avoid">Failed to load product: {error}</p>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-small text-ink-secondary hover:text-amethyst mb-lg cursor-pointer bg-transparent border-none p-0"
        >
          ← Back
        </button>
        <h1 className="text-h1 text-ink-primary mb-sm">Product not found</h1>
        <p className="text-body text-ink-secondary">
          This product doesn&rsquo;t exist or has been removed.
        </p>
      </div>
    )
  }

  const isSaved = savedIds.has(product.id)
  const hasStructuredIngredients = product.ingredients.length > 0
  const rawIngredientNames = product.description
    ? product.description
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-small text-ink-secondary hover:text-amethyst mb-lg cursor-pointer bg-transparent border-none p-0"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,480px)_1fr] gap-2xl items-start">
        {/* Image */}
        <figure className="relative m-0">
          <div className="aspect-square rounded-asym overflow-hidden bg-surface-muted border-[1.5px] border-surface-divider">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        </figure>

        {/* Detail */}
        <div>
          <div className="flex items-start justify-between gap-md mb-md">
            <div className="min-w-0">
              <h1 className="text-h1 text-ink-primary mb-xs">{product.name}</h1>
              <p className="text-body text-ink-secondary">{product.brand}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSave(product.id)}
              aria-label={isSaved ? 'Remove from library' : 'Save to library'}
              aria-pressed={isSaved}
              className="shrink-0 w-10 h-10 rounded-full bg-surface-card border-[1.5px] border-surface-divider hover:border-amethyst flex items-center justify-center cursor-pointer transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? '#3F1F68' : 'none'} stroke="#3F1F68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-sm mb-lg">
            <StatusBadge tier={product.rating} />
            <CategoryTag>{product.category}</CategoryTag>
          </div>

          {hasStructuredIngredients ? (
            <>
              <IngredientBar
                counts={{
                  clean: product.ingredients.filter((i) => i.rating === 'clean').length,
                  caution: product.ingredients.filter((i) => i.rating === 'caution').length,
                  avoid: product.ingredients.filter((i) => i.rating === 'avoid').length,
                }}
              />
              <div className="mt-lg">
                <IngredientList ingredients={product.ingredients} />
              </div>
            </>
          ) : rawIngredientNames.length > 0 ? (
            <div>
              <p className="text-label uppercase text-ink-tertiary mb-md">Ingredients</p>
              <div className="flex flex-col">
                {rawIngredientNames.map((name, i) => (
                  <div
                    key={i}
                    className="py-sm border-b border-surface-divider last:border-none"
                  >
                    <span className="text-h4 text-ink-primary">{name}</span>
                  </div>
                ))}
              </div>
              <p className="text-small text-ink-tertiary mt-lg">
                Safety ratings coming once AI analysis is run.
              </p>
            </div>
          ) : (
            <p className="text-small text-ink-tertiary">
              No ingredient information available for this product.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
