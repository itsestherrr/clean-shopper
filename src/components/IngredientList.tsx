import { useState } from 'react'

type Rating = 'clean' | 'caution' | 'avoid'

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

const ratingDotClass: Record<Rating, string> = {
  clean: 'bg-clean-dot',
  caution: 'bg-caution-dot',
  avoid: 'bg-avoid-dot',
}

const ratingLabelClass: Record<Rating, string> = {
  clean: 'text-clean',
  caution: 'text-caution',
  avoid: 'text-avoid',
}

const ratingLabel: Record<Rating, string> = {
  clean: 'Clean',
  caution: 'Caution',
  avoid: 'Avoid',
}

const SKELETON_WIDTHS = ['w-full', 'w-[85%]', 'w-[90%]', 'w-[75%]']

export default function IngredientList({
  ingredients,
  maxItems,
  highlightAvoided = true,
  loading = false,
}: IngredientListProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

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

  function toggle(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <ul role="list" className="flex flex-col gap-xs list-none p-0 m-0">
      {visible.map((ingredient) => {
        const isOpen = expanded.has(ingredient.name)
        const showAvoidFlag = highlightAvoided && ingredient.isUserAvoided
        return (
          <li key={ingredient.name} className="list-none">
            <button
              type="button"
              onClick={() => toggle(ingredient.name)}
              aria-expanded={isOpen}
              className="
                w-full text-left cursor-pointer bg-surface-card
                border-[1.5px] border-surface-divider rounded-card
                px-lg py-md
                hover:border-amethyst-40 hover:bg-cream
                transition-colors duration-fast ease-out-soft
                focus-visible:outline-2 focus-visible:outline-amethyst focus-visible:outline-offset-2
              "
            >
              <div className="flex items-center gap-md">
                {/* Status column — fixed width so names align */}
                <span className="inline-flex items-center gap-sm w-[100px] flex-shrink-0">
                  <span className={`${ratingDotClass[ingredient.rating]} w-2.5 h-2.5 rounded-full inline-block flex-shrink-0`} />
                  <span className={`${ratingLabelClass[ingredient.rating]} text-label uppercase tracking-[0.14em] font-extrabold whitespace-nowrap`}>
                    {ratingLabel[ingredient.rating]}
                  </span>
                </span>

                {/* Name */}
                <span className="text-body font-bold text-ink-primary flex-1 min-w-0 truncate">
                  {ingredient.name}
                </span>

                {/* Personal-avoid pill */}
                {showAvoidFlag && (
                  // TODO(v4): migrate to PreferenceTag primitive when extracted.
                  <span
                    className="
                      inline-flex items-center
                      bg-avoid-tint text-avoid
                      h-[22px] px-sm
                      text-label font-extrabold uppercase tracking-[0.16em]
                      rounded-tag whitespace-nowrap flex-shrink-0
                    "
                  >
                    In your avoid list
                  </span>
                )}

                {/* Chevron */}
                <span
                  aria-hidden="true"
                  className={`text-ink-tertiary text-h4 flex-shrink-0 transition-transform duration-fast ease-out-soft ${
                    isOpen ? 'rotate-90' : ''
                  }`}
                >
                  ›
                </span>
              </div>

              {isOpen && (
                <div className="mt-md pt-md border-t border-dashed border-surface-divider md:pl-[114px]">
                  <p className="text-small text-ink-secondary leading-relaxed">
                    {ingredient.reason}
                  </p>
                </div>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
