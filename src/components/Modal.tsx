import { useEffect, useRef, type ReactNode } from 'react'
import IconButton from './IconButton'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-[400px]',
  md: 'w-[560px]',
  lg: 'w-[720px]',
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return

    const panel = panelRef.current
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener('keydown', handleTab)
    return () => panel.removeEventListener('keydown', handleTab)
  }, [open])

  // Lock body scroll
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-backdrop z-overlay transition-opacity duration-slow ease-out-soft"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          fixed z-modal bg-surface-card rounded-[24px] shadow-modal
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          p-lg max-h-[85vh] overflow-y-auto
          max-w-[calc(100vw-48px)]
          ${sizeClasses[size]}
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center mb-md">
            <h2 className="text-h2 text-ink-primary">{title}</h2>
            <IconButton
              icon="×"
              onClick={() => onClose()}
              variant="ghost"
              ariaLabel="Close modal"
            />
          </div>
        )}

        {/* Body */}
        {children}
      </div>
    </>
  )
}
