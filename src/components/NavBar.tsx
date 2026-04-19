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

      {/* Desktop: sidebar */}
      <nav className="
        hidden md:flex fixed left-0 top-0 bottom-0 w-[240px] z-sticky
        bg-surface-card border-r border-surface-divider
        flex-col py-lg px-md
      ">
        <div className="text-h3 text-text-primary px-md mb-2xl">Clean Shopper</div>

        <div className="flex flex-col gap-xs flex-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onNavigate(tab.key)}
                className={`
                  flex items-center gap-md px-md py-sm
                  rounded-card cursor-pointer border-none
                  transition-colors duration-fast ease-default
                  focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
                  ${isActive
                    ? 'bg-primary-light text-primary font-medium'
                    : 'bg-transparent text-text-secondary hover:bg-surface-muted'
                  }
                `}
              >
                <span className="w-5 h-5 flex items-center justify-center text-[18px] leading-none">{tab.icon}</span>
                <span className="text-body">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <a
          href="/spec"
          className="
            flex items-center gap-md px-md py-sm
            text-small text-text-tertiary hover:text-primary
            transition-colors duration-fast ease-default
          "
        >
          <span className="w-5 h-5 flex items-center justify-center text-[18px] leading-none">◇</span>
          <span>Component Spec</span>
        </a>

        {/* Desktop user section */}
        <div className="mt-md pt-md border-t border-surface-divider px-md flex flex-col gap-xs">
          <span className="text-label uppercase text-text-tertiary">Signed in as</span>
          <span className="text-small text-text-primary truncate">{user.email}</span>
          <button
            type="button"
            onClick={onSignOut}
            className="
              text-small text-text-secondary hover:text-primary
              text-left mt-xs
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
