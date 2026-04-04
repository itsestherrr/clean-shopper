type Rating = 'clean' | 'caution' | 'avoid'

interface ProductCardProps {
  name: string
  brand: string
  rating: Rating
  category: string
  description: string
}

const ratingConfig: Record<Rating, { label: string; badge: string; text: string }> = {
  clean: {
    label: 'Clean',
    badge: 'bg-clean-bg',
    text: 'text-clean',
  },
  caution: {
    label: 'Caution',
    badge: 'bg-caution-bg',
    text: 'text-caution',
  },
  avoid: {
    label: 'Avoid',
    badge: 'bg-avoid-bg',
    text: 'text-avoid',
  },
}

export default function ProductCard({
  name,
  brand,
  rating,
  category,
  description,
}: ProductCardProps) {
  const { label, badge, text } = ratingConfig[rating]

  return (
    <div className="
      bg-surface-card
      rounded-card
      p-lg
      transition-shadow duration-base ease-default
      hover:shadow-hover
    ">
      {/* Header */}
      <div className="flex justify-between items-start gap-sm mb-sm">
        <div>
          <h4 className="text-h4 text-text-primary">{name}</h4>
          <p className="text-small text-text-tertiary mt-xs">{brand}</p>
        </div>

        {/* Rating badge */}
        <span className={`
          ${badge} ${text}
          text-label uppercase tracking-wide
          px-sm py-xs
          rounded-badge
          whitespace-nowrap
          flex-shrink-0
        `}>
          {label}
        </span>
      </div>

      {/* Description */}
      <p className="text-body text-text-secondary leading-relaxed mb-md">
        {description}
      </p>

      {/* Category tag */}
      <span className="
        bg-surface-muted
        text-text-tertiary
        text-label uppercase tracking-wide
        px-sm py-xs
        rounded-badge
      ">
        {category}
      </span>
    </div>
  )
}
