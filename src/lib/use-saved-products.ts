import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { useSession } from './use-session'

export function useSavedProducts() {
  const { session } = useSession()
  const userId = session?.user.id
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setSavedIds(new Set())
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    supabase
      .from('saved_products')
      .select('product_id')
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.error('Failed to load saved products:', error)
        } else if (data) {
          setSavedIds(new Set(data.map((r: { product_id: string }) => r.product_id)))
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [userId])

  async function toggle(productId: string) {
    if (!userId) return

    const isSaved = savedIds.has(productId)

    // Optimistic update
    setSavedIds((prev) => {
      const next = new Set(prev)
      isSaved ? next.delete(productId) : next.add(productId)
      return next
    })

    const { error } = isSaved
      ? await supabase
          .from('saved_products')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId)
      : await supabase
          .from('saved_products')
          .insert({ user_id: userId, product_id: productId })

    if (error) {
      console.error(`Failed to ${isSaved ? 'remove' : 'save'} product:`, JSON.stringify(error, null, 2))
      // Rollback
      setSavedIds((prev) => {
        const next = new Set(prev)
        isSaved ? next.add(productId) : next.delete(productId)
        return next
      })
    }
  }

  return { savedIds, toggle, loading }
}
