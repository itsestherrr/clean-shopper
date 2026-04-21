import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-3xl px-lg">
      {icon && (
        <div className="text-ink-placeholder mb-md text-[48px] leading-none">{icon}</div>
      )}
      <h3 className="text-h3 text-ink-primary mb-xs">{title}</h3>
      {description && (
        <p className="text-body text-ink-secondary max-w-[320px]">{description}</p>
      )}
      {action && (
        <div className="mt-lg">{action}</div>
      )}
    </div>
  )
}
