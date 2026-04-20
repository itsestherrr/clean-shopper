/**
 * CategoryTag — category label. Same stone palette for every category.
 * Spec: docs/component-spec/badge.md · Decisions: BD-02, BD-05
 *
 * Shape: tight 4px (`rounded-tag`). Fill: stone-tint. Text: stone-deep. Non-interactive.
 */

import type { ReactNode } from 'react'

type Size = 'sm' | 'md'

interface CategoryTagProps {
  children: ReactNode
  size?: Size
}

const SIZE: Record<Size, string> = {
  sm: 'h-[18px] px-sm py-[1px] text-micro',
  md: 'h-[22px] px-sm py-xs text-label',
}

export default function CategoryTag({ children, size = 'md' }: CategoryTagProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-tag bg-stone-tint text-stone-deep',
        'font-extrabold uppercase tracking-[0.16em] whitespace-nowrap flex-shrink-0',
        SIZE[size],
      ].join(' ')}
    >
      {children}
    </span>
  )
}
