type Rating = 'clean' | 'caution' | 'avoid'

interface IngredientBarProps {
  counts: Record<Rating, number>
}

const segments: { rating: Rating; label: string; bg: string; dot: string }[] = [
  { rating: 'clean', label: 'Clean', bg: 'bg-clean-bg', dot: 'bg-clean-dot' },
  { rating: 'caution', label: 'Caution', bg: 'bg-caution-bg', dot: 'bg-caution-dot' },
  { rating: 'avoid', label: 'Avoid', bg: 'bg-avoid-bg', dot: 'bg-avoid-dot' },
]

export default function IngredientBar({ counts }: IngredientBarProps) {
  const total = counts.clean + counts.caution + counts.avoid

  return (
    <div>
      <h3 className="text-h3 text-ink-primary mb-md">
        Ingredient Breakdown ({total})
      </h3>

      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-surface-muted">
        {segments.map(({ rating, bg }) => {
          const pct = total > 0 ? (counts[rating] / total) * 100 : 0
          if (pct === 0) return null
          return (
            <div
              key={rating}
              className={`${bg} transition-all duration-base ease-out-soft`}
              style={{ width: `${pct}%` }}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-lg mt-sm">
        {segments.map(({ rating, label, dot }) => (
          <div key={rating} className="flex items-center gap-xs">
            <span className={`${dot} w-2.5 h-2.5 rounded-full inline-block`} />
            <span className="text-small text-ink-secondary">
              {counts[rating]} {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
