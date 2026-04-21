import { Outlet, NavLink } from 'react-router-dom'

const SPEC_PAGES = [
  { name: 'IconButton', path: '/spec/icon-button' },
  { name: 'IngredientBar', path: '/spec/ingredient-bar' },
  { name: 'IngredientList', path: '/spec/ingredient-list' },
  { name: 'Modal', path: '/spec/modal' },
  { name: 'ProductCard', path: '/spec/product-card' },
  { name: 'Toast', path: '/spec/toast' },
]

export default function SpecLayout() {
  return (
    <div className="flex gap-2xl max-w-[1200px]">
      <aside className="w-[180px] shrink-0 sticky top-2xl self-start hidden lg:block">
        <p className="text-label text-ink-tertiary uppercase mb-sm">Components</p>
        <nav className="flex flex-col gap-xs">
          {SPEC_PAGES.map((c) => (
            <NavLink
              key={c.path}
              to={c.path}
              className={({ isActive }) =>
                `text-small transition-colors ${
                  isActive
                    ? 'text-amethyst font-medium'
                    : 'text-ink-secondary hover:text-amethyst'
                }`
              }
            >
              {c.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
