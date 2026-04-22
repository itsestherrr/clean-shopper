import { useState } from 'react'
import SearchInput from '../../components/SearchInput'

export default function SearchInputSpecPage() {
  const [empty, setEmpty] = useState('')
  const [filled, setFilled] = useState('acure shampoo')
  const [loading, setLoading] = useState('sunscreen')

  return (
    <>
      <header className="mb-2xl">
        <p className="text-label text-amethyst uppercase mb-xs">Component spec</p>
        <h1 className="text-h1 text-ink-primary mb-sm">SearchInput</h1>
        <p className="text-body text-ink-secondary max-w-[640px]">
          Primary control on the Search screen. Pill-shaped text input with a left search icon,
          a right clear button (IconButton, ghost, sm) when the value is non-empty, and a
          spinner swap when <code>loading</code> is true.
        </p>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Overview</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl mb-lg">
          <div className="flex flex-col gap-md max-w-[560px]">
            <SearchInput
              value={empty}
              onChange={setEmpty}
              placeholder="Search shampoo, sunscreen…"
            />
          </div>
        </div>
        <pre className="bg-surface-card border border-surface-divider rounded-card p-md text-small overflow-x-auto">
{`<SearchInput value={query} onChange={setQuery} onSubmit={run} placeholder="Search shampoo, sunscreen…" />`}
        </pre>
      </section>

      {/* States */}
      <section id="states" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">States</h2>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="flex flex-col gap-lg max-w-[560px]">
            <div>
              <p className="text-label text-ink-tertiary uppercase mb-sm">Empty</p>
              <SearchInput value={empty} onChange={setEmpty} placeholder="Search shampoo, sunscreen…" />
            </div>
            <div>
              <p className="text-label text-ink-tertiary uppercase mb-sm">Filled (clear = IconButton ghost sm)</p>
              <SearchInput value={filled} onChange={setFilled} placeholder="Search shampoo, sunscreen…" />
            </div>
            <div>
              <p className="text-label text-ink-tertiary uppercase mb-sm">Loading</p>
              <SearchInput value={loading} onChange={setLoading} loading placeholder="Search shampoo, sunscreen…" />
            </div>
            <div>
              <p className="text-label text-ink-tertiary uppercase mb-sm">Disabled</p>
              <SearchInput value="" onChange={() => {}} disabled placeholder="Search shampoo, sunscreen…" />
            </div>
          </div>
        </div>
      </section>

      {/* Focus */}
      <section id="focus" className="mb-3xl">
        <h2 className="text-h2 text-ink-primary mb-md">Focus</h2>
        <p className="text-body text-ink-secondary mb-lg max-w-[640px]">
          Tab into the input below. Focus draws the system focus-visible ring — 2px amethyst
          outline at 2px offset — matching Button, IconButton, and ProductCard. Mouse click
          does not draw the ring (<code>:focus-visible</code> only fires on keyboard focus).
        </p>
        <div className="bg-surface-card border border-surface-divider rounded-card p-xl">
          <div className="max-w-[560px]">
            <SearchInput value={empty} onChange={setEmpty} placeholder="Tab here to see the focus ring" />
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
                ['Focus', 'Native input — Tab reaches it; focus-visible ring on keyboard focus only'],
                ['Submit', 'Enter fires onSubmit if provided'],
                ['Clear', 'Tab to the clear IconButton; Enter/Space activates'],
                ['Disabled', 'Not reachable via Tab; not editable'],
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
                ['Clear button', 'aria-label="Clear search" on the IconButton'],
                ['Label', 'Placeholder is not a label — consumers should provide a visible label above the input when appropriate'],
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
