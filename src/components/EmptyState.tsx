import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  /**
   * Pass an SVG glyph (stroke-style, 24px viewBox preferred). The wrapper
   * provides color (`text-ink-tertiary`), size (32px), and spacing — your
   * SVG only needs `currentColor` and a viewBox. Avoid emoji.
   */
  icon?: ReactNode
  action?: ReactNode
}

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div
      className={[
        // ES-01: framed surface card. Soft white bg, 1.5px divider, 16px radius.
        'bg-surface-card border-[1.5px] border-surface-divider rounded-card',
        'flex flex-col items-center justify-center text-center',
        'py-3xl px-lg',
      ].join(' ')}
    >
      {icon && (
        <div
          className={[
            'w-14 h-14 mb-md flex items-center justify-center',
            'text-ink-tertiary',
            // Force any nested SVG to render at 32px so consumers can drop in
            // a 24px viewBox glyph without sizing it themselves.
            '[&_svg]:w-8 [&_svg]:h-8',
          ].join(' ')}
        >
          {icon}
        </div>
      )}
      <h3 className="text-h3 text-ink-primary mb-xs">{title}</h3>
      {description && (
        <p className="text-body text-ink-secondary max-w-[320px]">{description}</p>
      )}
      {action && <div className="mt-lg">{action}</div>}
    </div>
  )
}
