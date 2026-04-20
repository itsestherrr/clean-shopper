import type { ReactNode } from 'react'

/**
 * Button — see docs/component-spec/button.md for full spec.
 *
 * Three variants (primary / secondary / ghost) × three sizes (sm / md / lg).
 * `hero` opt-in adds the signature flat-offset shadow on hover only — reserved
 * for one big-moment action per surface.
 *
 * Decisions: B-01 through B-13 in docs/spec/decisions.html
 */
type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  /** Opt-in "big moment" treatment. Shadow appears on hover + button lifts. Max one per surface. Not supported on ghost. */
  hero?: boolean
  icon?: ReactNode
  iconPosition?: 'leading' | 'trailing'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
  'aria-label'?: string
}

// Rest colors per variant
const VARIANT_REST: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-amethyst text-cream',
  secondary: 'bg-paper text-amethyst border-2 border-amethyst',
  ghost: 'bg-transparent text-amethyst',
}

// Non-hero hover — darken fill to amethyst-110 (primary/secondary) or amethyst-20 (ghost)
const VARIANT_HOVER_NONHERO: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'hover:bg-amethyst-110',
  secondary: 'hover:bg-amethyst-110 hover:text-cream hover:border-amethyst-110',
  ghost: 'hover:bg-amethyst-20',
}

// Hero hover — shadow appears + translate lift. Fill does NOT change.
const VARIANT_HOVER_HERO: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'hover:shadow-flat-lime hover:-translate-x-[2px] hover:-translate-y-[2px]',
  secondary: 'hover:shadow-flat-amethyst hover:-translate-x-[2px] hover:-translate-y-[2px]',
  ghost: '', // ghost can never be hero
}

// Force rest colors back on press so hover color doesn't bleed through
const VARIANT_ACTIVE: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'active:bg-amethyst',
  secondary: 'active:bg-paper active:text-amethyst active:border-amethyst',
  ghost: 'active:bg-transparent active:text-amethyst',
}

const SIZE: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 text-small px-md py-xs',
  md: 'h-10 text-body px-lg py-sm',
  lg: 'h-12 text-h4 px-xl py-md',
}

const ICON_SIZE: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'text-[14px]',
  md: 'text-[16px]',
  lg: 'text-[20px]',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  hero = false,
  icon,
  iconPosition = 'leading',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  // Dev guard: ghost + hero is not a valid combination
  if (hero && variant === 'ghost' && import.meta.env?.DEV) {
    console.warn('[Button] `hero` prop is not supported on `variant="ghost"`. Ignoring hero.')
  }
  const heroActive = hero && variant !== 'ghost'

  const base = [
    'inline-flex items-center justify-center gap-sm',
    'rounded-full font-semibold',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-base ease-out-soft',
    'focus-visible:outline-2 focus-visible:outline-slate focus-visible:outline-offset-2',
    // Press — universal scale pop. Overrides hero's hover translate when active.
    'active:scale-[0.96]',
    // Disabled treatment
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0',
  ].join(' ')

  const variantClasses = [
    VARIANT_REST[variant],
    heroActive ? VARIANT_HOVER_HERO[variant] : VARIANT_HOVER_NONHERO[variant],
    VARIANT_ACTIVE[variant],
    heroActive ? 'active:shadow-none' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const loadingClasses = loading ? 'pointer-events-none opacity-70 cursor-wait' : ''
  const widthClass = fullWidth ? 'w-full' : ''

  const iconEl = loading ? (
    <span
      aria-hidden="true"
      className={`inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ${ICON_SIZE[size]}`}
    />
  ) : icon ? (
    <span aria-hidden="true" className={`inline-flex ${ICON_SIZE[size]}`}>
      {icon}
    </span>
  ) : null

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={[base, variantClasses, SIZE[size], loadingClasses, widthClass]
        .filter(Boolean)
        .join(' ')}
    >
      {iconPosition === 'leading' && iconEl}
      <span>{children}</span>
      {iconPosition === 'trailing' && !loading && iconEl}
    </button>
  )
}
