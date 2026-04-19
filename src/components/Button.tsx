import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  fullWidth?: boolean
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-surface-card hover:bg-primary-dark',
  secondary:
    'bg-transparent text-primary shadow-[inset_0_0_0_1.5px_var(--color-primary)] hover:bg-primary-light',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-muted',
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'text-small px-md py-xs',
  md: 'text-body px-lg py-sm',
  lg: 'text-h4 px-xl py-md',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-sm rounded-full transition-colors duration-fast ease-default focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2'

  const stateClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : loading
      ? 'pointer-events-none opacity-70 cursor-wait'
      : 'cursor-pointer'

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${stateClasses} ${widthClass}`}
    >
      {loading ? (
        <span
          aria-hidden
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
        />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}
