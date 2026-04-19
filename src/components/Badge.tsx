import type { ReactNode } from 'react'

type BadgeVariant = 'neutral' | 'clean' | 'caution' | 'avoid' | 'accent'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-surface-muted text-text-tertiary',
  clean: 'bg-clean-tint text-clean',
  caution: 'bg-caution-tint text-caution',
  avoid: 'bg-avoid-tint text-avoid',
  accent: 'bg-primary-light text-primary-dark',
}

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`
        ${variantStyles[variant]}
        inline-flex items-center rounded-badge
        px-sm py-xs text-label uppercase
      `}
    >
      {children}
    </span>
  )
}
