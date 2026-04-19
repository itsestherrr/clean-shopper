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

      {/* Left icon: spinner when loading, search icon otherwise */}
      <div className="absolute left-md text-text-tertiary pointer-events-none">
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
          'text-body text-text-primary',
          'placeholder:text-text-placeholder',
          'shadow-[inset_0_0_0_1.5px_var(--color-surface-divider)]',
          'focus:shadow-[inset_0_0_0_1.5px_var(--color-primary)]',
          'focus:outline-none',
          'transition-shadow duration-fast ease-default',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
      />

      {/* Clear button — only visible when there's a value */}
      {value && !disabled && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-md text-text-tertiary hover:text-text-secondary transition-colors duration-fast ease-default bg-transparent border-none cursor-pointer p-0 leading-none text-body"
        >
          ×
        </button>
      )}
    </div>
  )
}
