import type { ReactNode } from 'react'

interface IconButtonProps {
  icon: ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  variant?: 'default' | 'ghost'
  active?: boolean
  size?: 'sm' | 'md'
  ariaLabel: string
  disabled?: boolean
}

export default function IconButton({
  icon,
  onClick,
  variant = 'default',
  active = false,
  size = 'md',
  ariaLabel,
  disabled = false,
}: IconButtonProps) {
  const sizeClass = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'

  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-colors duration-fast ease-default cursor-pointer border-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2'

  const variantStyles = {
    default: active
      ? 'bg-primary-light text-primary'
      : 'bg-surface-muted text-text-secondary hover:bg-surface-divider',
    ghost: active
      ? 'bg-transparent text-primary'
      : 'bg-transparent text-text-tertiary hover:bg-surface-muted hover:text-text-secondary',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${sizeClass} ${variantStyles[variant]} ${disabledStyles}`}
    >
      {icon}
    </button>
  )
}
