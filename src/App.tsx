import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import RequireAuth from './components/RequireAuth'
import BrowsePage from './features/browse/BrowsePage'
import LibraryPage from './features/library/LibraryPage'
import SearchPage from './features/search/SearchPage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'
import { supabase } from './lib/supabase'
import { useSession } from './lib/use-session'
import ProductDetailPage from './features/product/ProductDetailPage'
import SpecLayout from './features/spec/SpecLayout'
import IconButtonSpecPage from './features/spec/IconButtonSpecPage'
import IngredientBarSpecPage from './features/spec/IngredientBarSpecPage'
import IngredientListSpecPage from './features/spec/IngredientListSpecPage'
import ModalSpecPage from './features/spec/ModalSpecPage'
import ProductCardSpecPage from './features/spec/ProductCardSpecPage'
import ToastSpecPage from './features/spec/ToastSpecPage'

const AUTH_ROUTES = ['/signin', '/signup']

const TAB_ROUTES: Record<string, string> = {
  home: '/search',
  library: '/library',
  list: '/list',
  preferences: '/preferences',
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session } = useSession()

  const activeTab =
    Object.entries(TAB_ROUTES).find(([, path]) => location.pathname.startsWith(path))?.[0] ?? 'home'

  const isAuthRoute = AUTH_ROUTES.includes(location.pathname)
  const showNavBar = !isAuthRoute && !!session

  function handleNavigate(tab: string) {
    const path = TAB_ROUTES[tab]
    if (path) navigate(path)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/signin', { replace: true })
  }

  const userEmail = session?.user?.email ?? ''

  return (
    <div className="bg-surface-bg min-h-screen">
      {showNavBar && (
        <NavBar
          activeTab={activeTab as 'home' | 'library' | 'list' | 'preferences'}
          onNavigate={handleNavigate}
          user={{ email: userEmail }}
          onSignOut={handleSignOut}
        />
      )}

      {/* Main content — offset for NavBar (no offset when NavBar is hidden) */}
      <main className={showNavBar ? 'md:pt-[64px] pb-[72px] md:pb-0' : ''}>
        <div className={showNavBar ? 'max-w-screen-xl mx-auto p-2xl' : ''}>
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <SearchPage />
              </RequireAuth>
            }
          />
          <Route
            path="/library"
            element={
              <RequireAuth>
                <LibraryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/browse"
            element={
              <RequireAuth>
                <BrowsePage />
              </RequireAuth>
            }
          />
          <Route
            path="/product/:id"
            element={
              <RequireAuth>
                <ProductDetailPage />
              </RequireAuth>
            }
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/spec" element={<SpecLayout />}>
            <Route index element={<Navigate to="/spec/product-card" replace />} />
            <Route path="icon-button" element={<IconButtonSpecPage />} />
            <Route path="ingredient-bar" element={<IngredientBarSpecPage />} />
            <Route path="ingredient-list" element={<IngredientListSpecPage />} />
            <Route path="modal" element={<ModalSpecPage />} />
            <Route path="product-card" element={<ProductCardSpecPage />} />
            <Route path="toast" element={<ToastSpecPage />} />
          </Route>
        </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
