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
  imageUrl?: string
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
  imageUrl,
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
        'bg-surface-card rounded-card overflow-hidden',
        'transition-shadow duration-base ease-default',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        'motion-reduce:transition-none motion-reduce:active:scale-100',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:shadow-hover active:scale-[0.98]',
        isSelectable && selected ? 'ring-2 ring-primary' : '',
      ].filter(Boolean).join(' ')}
      onClick={isInteractive ? handleClick : undefined}
      role={isInteractive ? (isSelectable ? 'checkbox' : 'button') : undefined}
      aria-checked={isSelectable ? selected : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
    >
      {/* Product image — default size only */}
      {!isCompact && (
        <div className="h-[160px] bg-surface-muted overflow-hidden relative">
          {/* Placeholder always underneath */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-text-placeholder"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M3 7.5h18M3 7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v13.5" />
            </svg>
          </div>
          {/* Image on top — hides on error, revealing placeholder */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
        </div>
      )}

      {/* Card content */}
      <div className={[
        isCompact ? 'p-md' : 'p-lg',
        isSelectable ? 'relative pl-[46px]' : '',
      ].filter(Boolean).join(' ')}>

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
        <div className={`flex justify-between items-start gap-sm ${isCompact ? '' : 'mb-md'}`}>
          <div>
            <h4 className="text-h4 text-text-primary">{name}</h4>
            <p className="text-small text-text-tertiary mt-xs">{brand}</p>
          </div>
          <RatingBadge rating={rating} />
        </div>

        {!isCompact && (
          <>
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
    </div>
  )
}
