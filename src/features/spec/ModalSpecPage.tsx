import { useState } from 'react'
import Modal from '../../components/Modal'

type ModalSize = 'sm' | 'md' | 'lg'

function ModalDemo({ size, label }: { size: ModalSize; label: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-amethyst text-surface-card rounded-full text-body px-lg py-sm cursor-pointer border-none hover:bg-amethyst-110 transition-colors duration-fast ease-out-soft"
      >
        Open {label}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={`${label} Modal`} size={size}>
        <p className="text-body text-ink-secondary">
          This is a <code>{size}</code> modal. Press Escape or click the backdrop to close.
          Focus is trapped inside the dialog while open.
        </p>
      </Modal>
    </>
  )
}

export default function ModalSpecPage() {
  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-amethyst uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-ink-primary mb-sm">Modal</h1>
        <p className="text-body text-ink-secondary max-w-[640px]">
          Dialog overlay for focused tasks — confirming actions, viewing detail, or collecting
          input. Traps focus, locks body scroll, and dismisses on Escape or backdrop click.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg">
          <ModalDemo size="md" label="Default" />
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<Modal open={isOpen} onClose={handleClose} title="Confirm Action">
  <p>Are you sure you want to remove this product?</p>
</Modal>`}
        </pre>
      </section>

      {/* Sizes */}
      <section id="sizes" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Sizes</h2>
        <p className="text-body text-ink-secondary mb-lg max-w-[640px]">
          Three sizes. <code>sm</code> (400px) for confirmations and short messages.{' '}
          <code>md</code> (560px) is the default for most dialogs.{' '}
          <code>lg</code> (720px) for detail views with longer content.
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex gap-md flex-wrap">
            <ModalDemo size="sm" label="Small" />
            <ModalDemo size="md" label="Medium" />
            <ModalDemo size="lg" label="Large" />
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Accessibility</h2>
        <div className="space-y-lg max-w-[720px]">
          <div>
            <h3 className="text-h4 text-ink-primary mb-sm">Keyboard</h3>
            <dl className="space-y-xs">
              {[
                ['Escape', 'Closes the modal'],
                ['Tab', 'Cycles through focusable elements inside the panel'],
                ['Shift+Tab', 'Reverse cycle — wraps from first to last element'],
                ['Focus on open', 'First focusable element receives focus automatically'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-ink-tertiary">{k}</dt>
                  <dd className="text-body text-ink-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-h4 text-ink-primary mb-sm">Screen readers</h3>
            <dl className="space-y-xs">
              {[
                ['Role', 'role="dialog" with aria-modal="true"'],
                ['Label', 'aria-label set from title prop'],
                ['Backdrop', 'aria-hidden="true" — not announced'],
                ['Close button', 'aria-label="Close modal"'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-ink-tertiary">{k}</dt>
                  <dd className="text-body text-ink-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-h4 text-ink-primary mb-sm">Scroll</h3>
            <dl className="space-y-xs">
              {[
                ['Body lock', 'Body scroll is disabled while the modal is open'],
                ['Panel scroll', 'Panel scrolls internally at max-height 85vh'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-md">
                  <dt className="text-small text-ink-tertiary">{k}</dt>
                  <dd className="text-body text-ink-secondary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
