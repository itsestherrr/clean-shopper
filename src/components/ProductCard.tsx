import RatingBadge from './RatingBadge'
import Badge from './Badge'
import IconButton from './IconButton'

type Rating = 'clean' | 'caution' | 'avoid'
type Size = 'default' | 'compact'
type Variant = 'default' | 'selectable'

interface ProductCardProps {
  name: string
  brand: string
  rating: Rating
  category: string
  description: string
  size?: Size
  variant?: Variant
  disabled?: boolean
  selected?: boolean
  onSelectChange?: (selected: boolean) => void
  onSave?: () => void
  onAddToList?: () => void
  saved?: boolean
  onClick?: () => void
  loading?: boolean
}

export default function ProductCard({
  name,
  brand,
  rating,
  category,
  description,
  onSave,
  onAddToList,
  saved = false,
  onClick,
  loading = false,
}: ProductCardProps) {
  if (loading) {
    return (
      <div className="bg-surface-muted rounded-card animate-pulse h-[180px]" />
    )
  }

  return (
    <div
      className="bg-surface-card rounded-card p-lg transition-shadow duration-base ease-default hover:shadow-hover cursor-pointer"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-sm mb-sm">
        <div>
          <h4 className="text-h4 text-text-primary">{name}</h4>
          <p className="text-small text-text-tertiary mt-xs">{brand}</p>
        </div>
        <RatingBadge rating={rating} />
      </div>

      {/* Description */}
      <p className="text-body text-text-secondary mb-md">{description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <Badge variant="neutral">{category}</Badge>
        <div className="flex items-center gap-xs">
          {onSave && (
            <IconButton
              icon={saved ? '♥' : '♡'}
              onClick={(e) => { e.stopPropagation(); onSave() }}
              variant="ghost"
              active={saved}
              ariaLabel={saved ? 'Remove from library' : 'Save to library'}
            />
          )}
          {onAddToList && (
            <IconButton
              icon="＋"
              onClick={(e) => { e.stopPropagation(); onAddToList() }}
              variant="ghost"
              ariaLabel="Add to shopping list"
            />
          )}
        </div>
      </div>
    </div>
  )
}
