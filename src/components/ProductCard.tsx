import type { KeyboardEvent } from 'react'
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
  size = 'default',
  variant = 'default',
  selected = false,
  onSelectChange,
  disabled = false,
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

  const isCompact = size === 'compact'
  const isSelectable = variant === 'selectable'
  const isInteractive = !disabled && (isSelectable ? !!onSelectChange : !!onClick)

  const handleClick = () => {
    if (isSelectable) {
      onSelectChange?.(!selected)
    } else {
      onClick?.()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={[
        'bg-surface-card rounded-card transition-shadow duration-base ease-default',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        'motion-reduce:transition-none motion-reduce:active:scale-100',
        isCompact ? 'p-md' : 'p-lg',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:shadow-hover active:scale-[0.98]',
        isSelectable ? 'relative pl-[46px]' : '',
        isSelectable && selected ? 'border-2 border-primary' : '',
      ].filter(Boolean).join(' ')}
      onClick={isInteractive ? handleClick : undefined}
      role={isInteractive ? (isSelectable ? 'checkbox' : 'button') : undefined}
      aria-checked={isSelectable ? selected : undefined}
      aria-disabled={disabled || undefined}
      aria-label={isSelectable ? `Select ${name}` : undefined}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
    >
      {isSelectable && (
        <div
          className={`absolute top-[16px] left-[14px] w-5 h-5 rounded-[5px] border-2 flex items-center justify-center transition-colors ${
            selected ? 'bg-primary border-primary' : 'bg-surface-card border-surface-divider'
          }`}
          aria-hidden="true"
        >
          {selected && (
            <span className="text-surface-card text-[13px] font-bold leading-none">✓</span>
          )}
        </div>
      )}

      {/* Header */}
      <div className={`flex justify-between items-start gap-sm ${isCompact ? '' : 'mb-sm'}`}>
        <div>
          <h4 className="text-h4 text-text-primary">{name}</h4>
          <p className="text-small text-text-tertiary mt-xs">{brand}</p>
        </div>
        <RatingBadge rating={rating} />
      </div>

      {!isCompact && (
        <>
          {/* Description */}
          <p className="text-body text-text-secondary mb-md">{description}</p>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <Badge variant="neutral">{category}</Badge>
            {!isSelectable && (
              <div className="flex items-center gap-xs">
                {onSave && (
                  <IconButton
                    icon={saved ? '♥' : '♡'}
                    onClick={(e) => { e.stopPropagation(); if (!disabled) onSave() }}
                    variant="ghost"
                    active={saved}
                    ariaLabel={saved ? 'Remove from library' : 'Save to library'}
                  />
                )}
                {onAddToList && (
                  <IconButton
                    icon="＋"
                    onClick={(e) => { e.stopPropagation(); if (!disabled) onAddToList() }}
                    variant="ghost"
                    ariaLabel="Add to shopping list"
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
