/**
 * StatusBadge — product safety rating. Always one of clean / caution / avoid.
 * Spec: docs/component-spec/badge.md · Decisions: BD-01, BD-02, BD-04
 *
 * Shape: pill. Fill: saturated `-bg` (not `-tint`). Non-interactive.
 */

type Tier = 'clean' | 'caution' | 'avoid'
type Size = 'sm' | 'md'

interface StatusBadgeProps {
  tier: Tier
  size?: Size
  showIcon?: boolean
}

const TIER: Record<Tier, { label: string; bg: string; text: string }> = {
  clean:   { label: 'Clean',   bg: 'bg-clean-bg',   text: 'text-clean' },
  caution: { label: 'Caution', bg: 'bg-caution-bg', text: 'text-caution' },
  avoid:   { label: 'Avoid',   bg: 'bg-avoid-bg',   text: 'text-avoid' },
}

const SIZE: Record<Size, { box: string; text: string; icon: number }> = {
  sm: { box: 'h-5 px-sm py-[2px] gap-[3px]', text: 'text-micro',              icon: 12 },
  md: { box: 'h-7 px-md py-xs gap-xs',        text: 'text-label uppercase',   icon: 14 },
}

function TierIcon({ tier, size }: { tier: Tier; size: number }) {
  const common = { width: size, height: size, viewBox: '0 0 16 16', fill: 'currentColor', 'aria-hidden': true as const }
  if (tier === 'clean') {
    // check-circle-fill
    return (
      <svg {...common}><path d="M8 0a8 8 0 108 8 8 8 0 00-8-8zm3.53 6.53l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L7 9.94l3.47-3.47a.75.75 0 011.06 1.06z"/></svg>
    )
  }
  if (tier === 'caution') {
    // warning-circle-fill
    return (
      <svg {...common}><path d="M8 0a8 8 0 108 8 8 8 0 00-8-8zm-.75 4.5a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0zM8 12a1 1 0 111-1 1 1 0 01-1 1z"/></svg>
    )
  }
  // x-circle-fill
  return (
    <svg {...common}><path d="M8 0a8 8 0 108 8 8 8 0 00-8-8zm2.78 9.72a.75.75 0 11-1.06 1.06L8 9.06l-1.72 1.72a.75.75 0 11-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 011.06-1.06L8 6.94l1.72-1.72a.75.75 0 011.06 1.06L9.06 8z"/></svg>
  )
}

export default function StatusBadge({ tier, size = 'md', showIcon = true }: StatusBadgeProps) {
  const t = TIER[tier]
  const s = SIZE[size]
  return (
    <span
      className={[
        'inline-flex items-center rounded-full whitespace-nowrap flex-shrink-0 font-extrabold tracking-[0.16em]',
        t.bg, t.text, s.box, s.text,
      ].join(' ')}
    >
      {showIcon && <TierIcon tier={tier} size={s.icon} />}
      <span>{t.label}</span>
    </span>
  )
}
