import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'
import SpecLayout from './features/spec/SpecLayout'
import BadgeSpecPage from './features/spec/BadgeSpecPage'
import IconButtonSpecPage from './features/spec/IconButtonSpecPage'
import IngredientBarSpecPage from './features/spec/IngredientBarSpecPage'
import IngredientListSpecPage from './features/spec/IngredientListSpecPage'
import ModalSpecPage from './features/spec/ModalSpecPage'
import ProductCardSpecPage from './features/spec/ProductCardSpecPage'
import RatingBadgeSpecPage from './features/spec/RatingBadgeSpecPage'
import ToastSpecPage from './features/spec/ToastSpecPage'

const TAB_ROUTES: Record<string, string> = {
  home: '/search',
  library: '/library',
  list: '/list',
  preferences: '/preferences',
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const activeTab =
    Object.entries(TAB_ROUTES).find(([, path]) => location.pathname.startsWith(path))?.[0] ?? 'home'

  function handleNavigate(tab: string) {
    const path = TAB_ROUTES[tab]
    if (path) navigate(path)
  }

  return (
    <div className="bg-surface-bg min-h-screen">
      <NavBar activeTab={activeTab as 'home' | 'library' | 'list' | 'preferences'} onNavigate={handleNavigate} />

      {/* Main content — offset for NavBar */}
      <main className="md:ml-[240px] pb-[72px] md:pb-0 p-2xl">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/spec" element={<SpecLayout />}>
            <Route index element={<Navigate to="/spec/badge" replace />} />
            <Route path="badge" element={<BadgeSpecPage />} />
            <Route path="icon-button" element={<IconButtonSpecPage />} />
            <Route path="ingredient-bar" element={<IngredientBarSpecPage />} />
            <Route path="ingredient-list" element={<IngredientListSpecPage />} />
            <Route path="modal" element={<ModalSpecPage />} />
            <Route path="product-card" element={<ProductCardSpecPage />} />
            <Route path="rating-badge" element={<RatingBadgeSpecPage />} />
            <Route path="toast" element={<ToastSpecPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
