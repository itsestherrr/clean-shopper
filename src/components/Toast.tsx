import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastProps {
  type: ToastType
  message: string
  duration?: number   // ms before auto-dismiss; 0 = manual only
  onDismiss?: () => void
}

const config: Record<ToastType, {
  bg: string; text: string
  iconBg: string; iconText: string
  icon: string
}> = {
  success: { bg: 'bg-clean-bg',     text: 'text-clean',        iconBg: 'bg-clean',        iconText: 'text-clean-bg',    icon: '✓' },
  info:    { bg: 'bg-primary-light', text: 'text-primary-dark', iconBg: 'bg-primary-dark', iconText: 'text-primary-light', icon: 'i' },
  warning: { bg: 'bg-caution-bg',   text: 'text-caution',      iconBg: 'bg-caution',      iconText: 'text-caution-bg',  icon: '!' },
  error:   { bg: 'bg-avoid-bg',     text: 'text-avoid',        iconBg: 'bg-avoid',        iconText: 'text-avoid-bg',    icon: '×' },
}

export default function Toast({ type, message, duration = 4000, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true)
  const { bg, text, iconBg, iconText, icon } = config[type]

  useEffect(() => {
    if (duration === 0) return
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    if (!visible) onDismiss?.()
  }, [visible])

  if (!visible) return null

  return (
    <div className={`${bg} ${text} rounded-card px-md py-sm flex items-center gap-sm shadow-hover w-[440px] max-w-[calc(100vw-48px)]`}>
      <span className={`${iconBg} ${iconText} w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold leading-none`}>
        {icon}
      </span>
      <span className="flex-1 text-body">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className={`${text} opacity-40 hover:opacity-70 text-md leading-none flex-shrink-0 bg-transparent border-none cursor-pointer p-xs`}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
