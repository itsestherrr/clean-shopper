/**
 * AccentBadge — editorial moments only ("Editor's pick", "Premium", "New").
 * Spec: docs/component-spec/badge.md · Decisions: BD-02
 *
 * Shape: asymmetric (16px 16px 8px 8px). Fill: lime. Text: amethyst.
 * Placement constraint: amethyst surfaces only. One per screen, max.
 */

import type { ReactNode } from 'react'

interface AccentBadgeProps {
  children: ReactNode
  icon?: ReactNode
}

export default function AccentBadge({ children, icon }: AccentBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-xs h-[22px] px-sm py-xs',
        'rounded-asym-sm bg-lime text-amethyst',
        'text-label font-extrabold uppercase tracking-[0.16em]',
        'whitespace-nowrap flex-shrink-0',
      ].join(' ')}
    >
      {icon && <span aria-hidden="true" className="inline-flex text-[14px]">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
