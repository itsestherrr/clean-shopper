type Tab = 'home' | 'library' | 'list' | 'preferences'

interface NavBarProps {
  activeTab: Tab
  onNavigate: (tab: Tab) => void
  user: { email: string }
  onSignOut: () => void
}

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'library', label: 'Library', icon: '♡' },
  { key: 'list', label: 'Shopping List', icon: '☰' },
  { key: 'preferences', label: 'Preferences', icon: '⚙' },
]

export default function NavBar({ activeTab, onNavigate, user, onSignOut }: NavBarProps) {
  return (
    <>
      {/* Mobile: top account bar (non-fixed, sits above content) */}
      <div className="
        md:hidden
        bg-surface-card border-b border-surface-divider
        flex items-center justify-between
        px-md py-sm gap-md
      ">
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-label uppercase text-text-tertiary">Signed in as</span>
          <span className="text-small text-text-primary truncate">{user.email}</span>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="
            flex-shrink-0
            text-small text-primary hover:text-primary-dark
            cursor-pointer bg-transparent border-none
            transition-colors duration-fast ease-default
            focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
            px-sm py-xs rounded-full
          "
        >
          Sign out
        </button>
      </div>

      {/* Mobile: bottom tab bar */}
      <nav className="
        md:hidden fixed bottom-0 left-0 right-0 z-sticky
        bg-surface-card border-t border-surface-divider
        flex justify-around items-center
        px-sm py-xs pb-[env(safe-area-inset-bottom)]
      ">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onNavigate(tab.key)}
              className={`
                flex flex-col items-center gap-xs py-xs px-sm
                cursor-pointer border-none bg-transparent
                transition-colors duration-fast ease-default
                focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                ${isActive ? 'text-primary' : 'text-text-tertiary'}
              `}
            >
              <span className="text-[20px] leading-none">{tab.icon}</span>
              <span className="text-micro">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Desktop: top bar */}
      <nav className="
        hidden md:flex fixed top-0 left-0 right-0 h-[64px] z-sticky
        bg-surface-card border-b border-surface-divider
        items-center px-xl gap-xl
      ">
        <div className="text-h3 text-text-primary">Clean Shopper</div>

        <div className="flex items-center gap-xs flex-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onNavigate(tab.key)}
                className={`
                  flex items-center gap-sm px-md py-sm
                  rounded-card cursor-pointer border-none
                  transition-colors duration-fast ease-default
                  focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                  ${isActive
                    ? 'bg-primary-light text-primary font-medium'
                    : 'bg-transparent text-text-secondary hover:bg-surface-muted'
                  }
                `}
              >
                <span className="text-[18px] leading-none">{tab.icon}</span>
                <span className="text-body">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <a
          href="/spec"
          className="
            text-small text-text-tertiary hover:text-primary
            transition-colors duration-fast ease-default
          "
        >
          Component Spec
        </a>

        <div className="flex items-center gap-md pl-md border-l border-surface-divider">
          <div className="flex flex-col items-end">
            <span className="text-label uppercase text-text-tertiary leading-none">Signed in</span>
            <span className="text-small text-text-primary truncate max-w-[180px]">{user.email}</span>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="
              text-small text-text-secondary hover:text-primary
              cursor-pointer bg-transparent border-none
              transition-colors duration-fast ease-default
              focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
            "
          >
            Sign out
          </button>
        </div>
      </nav>
    </>
  )
}
