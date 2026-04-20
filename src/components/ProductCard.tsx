/**
 * ProductCard — flagship product card.
 * Spec: docs/component-spec/product-card.md · Decisions: PC-01 through PC-11
 * Live: /spec/product-card
 *
 * Default variant: renders an <a href="/product/:id"> (native link — cmd-click / right-click work).
 * Selectable variant: renders a <button role="checkbox"> (comparison pickers).
 * Compact size: 56×56 thumb row variant.
 */

import type { KeyboardEvent, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import CategoryTag from './CategoryTag'

type Rating = 'clean' | 'caution' | 'avoid'
type Size = 'default' | 'compact'
type Variant = 'default' | 'selectable'

interface ProductCardProps {
  id: string
  name: string
  brand: string
  rating: Rating
  category: string
  imageUrl?: string
  size?: Size
  variant?: Variant
  disabled?: boolean
  selected?: boolean
  onSelectChange?: (selected: boolean) => void
  saved?: boolean
  onSaveToggle?: () => void
  loading?: boolean
}

export default function ProductCard({
  id,
  name,
  brand,
  rating,
  category,
  imageUrl,
  size = 'default',
  variant = 'default',
  disabled = false,
  selected = false,
  onSelectChange,
  saved = false,
  onSaveToggle,
  loading = false,
}: ProductCardProps) {
  if (loading) {
    if (size === 'compact') {
      return (
        <div className="flex items-center gap-sm p-sm rounded-[12px] border-[1.5px] border-surface-divider bg-surface-card">
          <div className="w-[56px] h-[56px] rounded-[8px] bg-surface-muted animate-pulse shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-[13px] w-2/3 bg-surface-muted rounded animate-pulse mb-xs" />
            <div className="h-[10px] w-1/3 bg-surface-muted rounded animate-pulse" />
          </div>
        </div>
      )
    }
    return (
      <div className="rounded-asym border-[1.5px] border-surface-divider bg-surface-card overflow-hidden">
        <div className="aspect-square bg-surface-muted animate-pulse" />
        <div className="p-lg">
          <div className="h-[16px] w-2/3 bg-surface-muted rounded animate-pulse mb-sm" />
          <div className="h-[12px] w-1/3 bg-surface-muted rounded animate-pulse" />
        </div>
      </div>
    )
  }

  const isCompact = size === 'compact'
  const isSelectable = variant === 'selectable'

  // ═══════════════ COMPACT ROW ═══════════════
  if (isCompact) {
    const compactInner = (
      <>
        <div className="w-[56px] h-[56px] rounded-[8px] bg-surface-muted overflow-hidden shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-ink-primary truncate">{name}</div>
          <div className="text-[10px] text-ink-tertiary truncate">{brand}</div>
        </div>
        <StatusBadge tier={rating} size="sm" />
      </>
    )

    const compactClasses = [
      'flex items-center gap-sm p-sm rounded-[12px] border-[1.5px] border-surface-divider bg-surface-card',
      'transition-colors duration-base ease-out-soft',
      disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-amethyst-5',
      'focus-visible:outline-2 focus-visible:outline-amethyst focus-visible:outline-offset-2',
    ].join(' ')

    if (isSelectable) {
      return (
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          aria-disabled={disabled || undefined}
          onClick={() => !disabled && onSelectChange?.(!selected)}
          className={`${compactClasses} text-left w-full ${selected ? 'border-amethyst' : ''}`}
          disabled={disabled}
        >
          {compactInner}
        </button>
      )
    }

    return (
      <Link
        to={`/product/${id}`}
        className={compactClasses}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
      >
        {compactInner}
      </Link>
    )
  }

  // ═══════════════ DEFAULT SIZE ═══════════════
  const imageBlock = (
    <figure className="relative m-0 aspect-square bg-surface-muted overflow-hidden" style={{ borderRadius: '22px 22px 0 0' }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      ) : null}
      {/* StatusBadge — top-left overlay */}
      <div className="absolute top-[10px] left-[10px]">
        <StatusBadge tier={rating} size="sm" />
      </div>
      {/* Heart — top-right overlay (default variant only, only when handler provided) */}
      {!isSelectable && onSaveToggle && (
        <button
          type="button"
          aria-label={saved ? 'Remove from library' : 'Save to library'}
          aria-pressed={saved}
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!disabled) onSaveToggle()
          }}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation()
            }
          }}
          className="absolute top-[10px] right-[10px] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-0 focus-visible:outline-2 focus-visible:outline-amethyst focus-visible:outline-offset-2"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={saved ? '#3F1F68' : 'none'}
            stroke="#3F1F68"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      )}
      {/* Selectable check indicator — top-right, replaces heart */}
      {isSelectable && (
        <div
          aria-hidden="true"
          className={[
            'absolute top-[10px] right-[10px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
            selected ? 'bg-amethyst border-amethyst' : 'bg-surface-card/85 border-amethyst',
          ].join(' ')}
          style={{ backdropFilter: selected ? undefined : 'blur(6px)' }}
        >
          {selected && (
            <span className="text-surface-card text-[13px] font-bold leading-none">✓</span>
          )}
        </div>
      )}
    </figure>
  )

  const bodyBlock = (
    <div className="p-lg">
      <h4 className="text-h4 text-ink-primary">{name}</h4>
      <p className="text-small text-ink-tertiary mt-xs">{brand}</p>
      <div className="mt-sm">
        <CategoryTag size="sm">{category}</CategoryTag>
      </div>
    </div>
  )

  // Shared visual shell — border, radius, hover, pressed all come from CSS.
  // Hover: border → amethyst + --shadow-flat-lime-sm (2.5px)
  // Pressed: translate(1px,1px) + --shadow-flat-lime-xs (1.5px) — PC-02 / B1+
  const shellClasses = [
    'block bg-surface-card rounded-asym overflow-hidden',
    'border-[1.5px] border-surface-divider',
    'transition-[border-color,box-shadow,transform] duration-base ease-out-soft',
    'focus-visible:outline-2 focus-visible:outline-amethyst focus-visible:outline-offset-2',
    disabled
      ? 'opacity-50 pointer-events-none'
      : 'hover:border-amethyst hover:shadow-flat-lime-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-flat-lime-xs active:border-amethyst',
    'motion-reduce:transition-none motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0',
    isSelectable && selected ? 'border-amethyst shadow-flat-lime-sm' : '',
  ].filter(Boolean).join(' ')

  if (isSelectable) {
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={selected}
        aria-disabled={disabled || undefined}
        onClick={() => !disabled && onSelectChange?.(!selected)}
        className={`${shellClasses} text-left w-full p-0`}
        disabled={disabled}
      >
        {imageBlock}
        {bodyBlock}
      </button>
    )
  }

  return (
    <Link
      to={`/product/${id}`}
      className={shellClasses}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
    >
      {imageBlock}
      {bodyBlock}
    </Link>
  )
}
