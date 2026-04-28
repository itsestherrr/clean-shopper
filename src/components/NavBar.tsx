import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import SearchInput from './SearchInput'

interface NavBarProps {
  user: { email: string }
  onSignOut: () => void
}

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z"
    />
  </svg>
)

function getInitials(email: string): string {
  if (!email) return '?'
  const local = email.split('@')[0]
  // Try to split on dot/dash/underscore: esther.oh -> EO
  const parts = local.split(/[._-]/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return local.slice(0, 2).toUpperCase()
}

export default function NavBar({ user, onSignOut }: NavBarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(urlQuery)

  // Keep input in sync with URL param (back/forward, programmatic nav)
  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  function handleSearchChange(value: string) {
    setQuery(value)
    // While on /search, mirror the input straight to the URL so results filter live.
    if (location.pathname === '/search') {
      const params = new URLSearchParams()
      if (value) params.set('q', value)
      navigate(
        { pathname: '/search', search: params.toString() ? `?${params.toString()}` : '' },
        { replace: true },
      )
    }
  }

  function handleSearchSubmit() {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    navigate({
      pathname: '/search',
      search: params.toString() ? `?${params.toString()}` : '',
    })
  }

  // Account dropdown
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!accountOpen) return
    function handleClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setAccountOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [accountOpen])

  // Close dropdown on route change
  useEffect(() => {
    setAccountOpen(false)
  }, [location.pathname])

  const initials = getInitials(user.email)

  const textLinkClass = ({ isActive: _ }: { isActive: boolean }) =>
    [
      'text-body text-surface-card',
      'hover:text-lime transition-colors duration-fast ease-out-soft',
      'focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 rounded-sm',
    ].join(' ')

  const utilityIconClass = [
    'w-10 h-10 rounded-full',
    'flex items-center justify-center',
    'text-surface-card hover:text-lime hover:bg-amethyst-90/40',
    'transition-colors duration-fast ease-out-soft',
    'focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2',
    '[&_svg]:w-5 [&_svg]:h-5',
  ].join(' ')

  const Brand = (
    <NavLink
      to="/home"
      className="text-h3 text-surface-card hover:text-lime transition-colors duration-fast ease-out-soft focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2 rounded-sm"
    >
      Clean Shopper
    </NavLink>
  )

  const FavoritesLink = (
    <NavLink to="/library" aria-label="Favorites" className={utilityIconClass}>
      <HeartIcon />
    </NavLink>
  )

  const AccountControl = (
    <div className="relative" ref={accountRef}>
      <button
        type="button"
        onClick={() => setAccountOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={accountOpen}
        aria-haspopup="menu"
        className="
          w-10 h-10 rounded-full
          bg-lime
          text-amethyst-110 text-small font-extrabold
          flex items-center justify-center
          cursor-pointer
          hover:bg-lime-tint transition-colors duration-fast ease-out-soft
          focus-visible:outline-2 focus-visible:outline-lime focus-visible:outline-offset-2
        "
      >
        {initials}
      </button>
      {accountOpen && (
        <div
          role="menu"
          className="
            absolute right-0 top-[44px] z-50
            min-w-[220px] bg-surface-card
            border-[1.5px] border-surface-divider rounded-card
            shadow-flat-amethyst
            py-sm
          "
        >
          <div className="px-md py-xs">
            <div className="text-label uppercase text-ink-tertiary">Signed in</div>
            <div className="text-small text-ink-primary truncate">{user.email}</div>
          </div>
          <div className="h-px bg-surface-divider my-xs" />
          <button
            type="button"
            role="menuitem"
            onClick={onSignOut}
            className="
              w-full text-left px-md py-sm
              text-body text-ink-secondary hover:bg-surface-muted hover:text-amethyst
              cursor-pointer bg-transparent border-none
              transition-colors duration-fast ease-out-soft
              focus-visible:outline-2 focus-visible:outline-amethyst focus-visible:outline-offset-[-2px]
            "
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )

  const search = (
    <SearchInput
      value={query}
      onChange={handleSearchChange}
      onSubmit={handleSearchSubmit}
      placeholder="Search products or brands…"
    />
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-amethyst-110 border-b-2 border-lime">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[auto_auto_1fr_auto] items-center gap-xl h-[80px] px-xl">
        {Brand}
        <nav className="flex items-center gap-lg">
          <NavLink to="/home" className={textLinkClass}>
            Home
          </NavLink>
          <NavLink to="/browse" className={textLinkClass}>
            Browse
          </NavLink>
        </nav>
        <div className="max-w-[560px] w-full justify-self-center">{search}</div>
        <div className="flex items-center gap-sm">
          {FavoritesLink}
          {AccountControl}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center px-md py-md gap-sm">
          {Brand}
          <div className="flex-1" />
          {FavoritesLink}
          {AccountControl}
        </div>
        <div className="px-md pb-md">{search}</div>
      </div>
    </header>
  )
}
