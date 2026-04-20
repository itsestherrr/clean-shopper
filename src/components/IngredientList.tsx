type Rating = 'clean' | 'caution' | 'avoid'

const ratingDotColors: Record<Rating, string> = {
  clean: 'bg-clean-dot',
  caution: 'bg-caution-dot',
  avoid: 'bg-avoid-dot',
}

interface Ingredient {
  name: string
  rating: Rating
  reason: string
  isUserAvoided?: boolean
}

interface IngredientListProps {
  ingredients: Ingredient[]
  maxItems?: number
  highlightAvoided?: boolean
  loading?: boolean
}

const SKELETON_WIDTHS = ['w-full', 'w-[85%]', 'w-[90%]', 'w-[75%]']

export default function IngredientList({
  ingredients,
  maxItems,
  highlightAvoided = true,
  loading = false,
}: IngredientListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-xs">
        {SKELETON_WIDTHS.map((width, i) => (
          <div key={i} className={`${width} bg-surface-muted rounded-badge animate-pulse h-[20px]`} />
        ))}
      </div>
    )
  }

  const visible = maxItems ? ingredients.slice(0, maxItems) : ingredients

  return (
    <div>
      <h4 className="text-h4 text-text-primary mb-sm">Ingredients</h4>
      <div className="flex flex-col gap-xs">
        {visible.map((ingredient) => (
          <div
            key={ingredient.name}
            className="flex items-start gap-sm py-sm border-b border-surface-divider last:border-none"
          >
            <span className={`${ratingDotColors[ingredient.rating]} w-2.5 h-2.5 rounded-full inline-block mt-1 flex-shrink-0`} />
            <div className="flex-1">
              <div className="flex items-center gap-sm">
                <span className="text-h4 text-text-primary">{ingredient.name}</span>
                {highlightAvoided && ingredient.isUserAvoided && (
                  // TODO(v4): migrate to PreferenceTag when IngredientList cluster is refactored.
                  // This is a personal-preference flag, not a safety rating (StatusBadge) or
                  // category (CategoryTag). Inline markup preserves shape until PreferenceTag exists.
                  <span
                    className="inline-flex items-center rounded-tag bg-avoid-tint text-avoid h-[22px] px-sm py-xs text-label font-extrabold uppercase tracking-[0.16em] whitespace-nowrap flex-shrink-0"
                  >
                    In your avoid list
                  </span>
                )}
              </div>
              <p className="text-small text-text-secondary mt-xs">{ingredient.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
