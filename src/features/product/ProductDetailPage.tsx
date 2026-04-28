import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import StatusBadge from '../../components/StatusBadge'
import CategoryTag from '../../components/CategoryTag'
import IngredientList from '../../components/IngredientList'
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
      .select('id, name, brand, category, description, subtitle, claims, rating, ingredients, image_url')
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

  const BackLink = (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="text-small text-ink-secondary hover:text-amethyst mb-lg cursor-pointer bg-transparent border-none p-0"
    >
      ← Back
    </button>
  )

  if (loading) {
    return (
      <div>
        {BackLink}
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
        {BackLink}
        <p className="text-body text-avoid">Failed to load product: {error}</p>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div>
        {BackLink}
        <h1 className="text-h1 text-ink-primary mb-sm">Product not found</h1>
        <p className="text-body text-ink-secondary">
          This product doesn&rsquo;t exist or has been removed.
        </p>
      </div>
    )
  }

  const isSaved = savedIds.has(product.id)
  const hasStructuredIngredients = product.ingredients.length > 0
  // Description is always prose lede now. Legacy comma-list fallback only kicks
  // in when description looks like a comma-separated ingredient dump (no spaces
  // after commas + no sentence punctuation) and there are no structured ingredients.
  const looksLikeIngredientList =
    !hasStructuredIngredients &&
    !!product.description &&
    product.description.includes(',') &&
    !/[.!?]/.test(product.description)
  const ledeText = looksLikeIngredientList ? '' : product.description
  const rawIngredientNames = looksLikeIngredientList
    ? product.description.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <div>
      {BackLink}

      {/* TOP — retail PDP feel: image left, fuller info column right */}
      <section className="grid grid-cols-1 md:grid-cols-[minmax(0,480px)_1fr] gap-2xl items-start mb-3xl">
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

        {/* Info */}
        <div>
          <p className="text-label uppercase tracking-[0.14em] text-amethyst-80 font-extrabold mb-xs">
            {product.brand}
          </p>
          <h1 className="text-h1 text-ink-primary mb-xs leading-tight">
            {product.name}
          </h1>
          {product.subtitle && (
            <p className="text-body text-ink-secondary mb-md">{product.subtitle}</p>
          )}

          <div className="flex items-center gap-sm mb-lg">
            <StatusBadge tier={product.rating} />
            <CategoryTag>{product.category}</CategoryTag>
          </div>

          {ledeText && (
            <p className="text-body text-ink-secondary leading-relaxed mb-lg max-w-[560px]">
              {ledeText}
            </p>
          )}

          {product.claims && product.claims.length > 0 && (
            <ul className="flex flex-col gap-sm mb-xl list-none p-0 max-w-[560px]">
              {product.claims.map((claim, i) => (
                <li key={i} className="flex items-start gap-sm text-body text-ink-secondary">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-caution-dot flex-shrink-0 mt-[2px]"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{claim}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-sm flex-wrap">
            <Button
              variant="primary"
              size="lg"
              onClick={() => toggleSave(product.id)}
              aria-label={isSaved ? 'Remove from library' : 'Save to library'}
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill={isSaved ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
            >
              {isSaved ? 'Saved to library' : 'Save to library'}
            </Button>
            <Button variant="secondary" size="lg" disabled>
              Compare
            </Button>
          </div>
        </div>
      </section>

      {/* INGREDIENTS — no surface wrapper, header + rows */}
      {hasStructuredIngredients ? (
        <section>
          <div className="flex items-baseline justify-between mb-md flex-wrap gap-sm">
            <h2 className="text-h2 text-ink-primary">Ingredients</h2>
            <span className="text-small text-ink-tertiary">
              {product.ingredients.length} total · click any row to learn more
            </span>
          </div>
          <IngredientList ingredients={product.ingredients} />
        </section>
      ) : rawIngredientNames.length > 0 ? (
        <section>
          <h2 className="text-h2 text-ink-primary mb-md">Ingredients</h2>
          <div className="flex flex-col">
            {rawIngredientNames.map((name, i) => (
              <div
                key={i}
                className="py-sm border-b border-surface-divider last:border-none"
              >
                <span className="text-body text-ink-primary">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-small text-ink-tertiary mt-lg">
            Safety ratings coming once AI analysis is run.
          </p>
        </section>
      ) : (
        <p className="text-small text-ink-tertiary">
          No ingredient information available for this product.
        </p>
      )}
    </div>
  )
}
