import IconButton from './IconButton'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  autoFocus?: boolean
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  loading = false,
  disabled = false,
  autoFocus = false,
}: SearchInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className="relative flex items-center">

      {/* Left icon: spinner when loading, search icon otherwise. SI-03 is deferred;
          loudness lives on the results surface, not here. */}
      <div className="absolute left-md text-ink-tertiary pointer-events-none">
        {loading ? (
          <svg
            className="animate-spin w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={[
          'w-full bg-surface-card rounded-full',
          'pl-[44px] py-sm',
          value ? 'pr-[44px]' : 'pr-lg',
          'text-body text-ink-primary',
          'placeholder:text-ink-placeholder',
          'shadow-[inset_0_0_0_1.5px_var(--color-surface-divider)]',
          // SI-01: system focus-visible ring (2px amethyst outline + 2px offset)
          // matches Button, IconButton, ProductCard.
          'focus:outline-none',
          'focus-visible:outline-2 focus-visible:outline-amethyst focus-visible:outline-offset-2',
          'transition-shadow duration-fast ease-out-soft',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
      />

      {/* SI-02: Clear button is an IconButton (ghost, sm) — same primitive as Modal close,
          Toast dismiss, and other close/dismiss actions across the system. */}
      {value && !disabled && (
        <div className="absolute right-xs">
          <IconButton
            icon="×"
            onClick={() => onChange('')}
            variant="ghost"
            size="sm"
            ariaLabel="Clear search"
          />
        </div>
      )}
    </div>
  )
}
