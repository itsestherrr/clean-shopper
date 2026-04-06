type Rating = 'clean' | 'caution' | 'avoid'

interface RatingBadgeProps {
  rating: Rating
  size?: 'sm' | 'md'
}

const ratingStyles: Record<Rating, { label: string; bg: string; text: string }> = {
  clean: { label: 'Clean', bg: 'bg-clean-bg', text: 'text-clean' },
  caution: { label: 'Caution', bg: 'bg-caution-bg', text: 'text-caution' },
  avoid: { label: 'Avoid', bg: 'bg-avoid-bg', text: 'text-avoid' },
}

export default function RatingBadge({ rating, size = 'md' }: RatingBadgeProps) {
  const { label, bg, text } = ratingStyles[rating]
  const textSize = size === 'sm' ? 'text-micro' : 'text-label uppercase'

  return (
    <span
      className={`
        ${bg} ${text} ${textSize}
        rounded-badge px-sm py-xs
        inline-flex items-center gap-xs
        whitespace-nowrap flex-shrink-0
      `}
    >
      {label}
    </span>
  )
}
