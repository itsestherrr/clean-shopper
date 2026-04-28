import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import RequireAuth from './components/RequireAuth'
import BrowsePage from './features/browse/BrowsePage'
import HomePage from './features/home/HomePage'
import LibraryPage from './features/library/LibraryPage'
import SearchPage from './features/search/SearchPage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'
import { supabase } from './lib/supabase'
import { useSession } from './lib/use-session'
import ProductDetailPage from './features/product/ProductDetailPage'
import SpecLayout from './features/spec/SpecLayout'
import IconButtonSpecPage from './features/spec/IconButtonSpecPage'
import IngredientListSpecPage from './features/spec/IngredientListSpecPage'
import ModalSpecPage from './features/spec/ModalSpecPage'
import ProductCardSpecPage from './features/spec/ProductCardSpecPage'
import ToastSpecPage from './features/spec/ToastSpecPage'
import SearchInputSpecPage from './features/spec/SearchInputSpecPage'
import EmptyStateSpecPage from './features/spec/EmptyStateSpecPage'
import NavBarSpecPage from './features/spec/NavBarSpecPage'

const AUTH_ROUTES = ['/signin', '/signup']

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session } = useSession()

  const isAuthRoute = AUTH_ROUTES.includes(location.pathname)
  const showNavBar = !isAuthRoute && !!session

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/signin', { replace: true })
  }

  const userEmail = session?.user?.email ?? ''

  return (
    <div className="bg-surface-bg min-h-screen">
      {showNavBar && <NavBar user={{ email: userEmail }} onSignOut={handleSignOut} />}

      {/* Main content offset:
          desktop NavBar = 80px, mobile NavBar (header + search row) ≈ 136px. */}
      <main className={showNavBar ? 'pt-[136px] md:pt-[80px]' : ''}>
        <div className={showNavBar ? 'max-w-screen-xl mx-auto p-2xl' : ''}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
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
            <Route path="ingredient-list" element={<IngredientListSpecPage />} />
            <Route path="modal" element={<ModalSpecPage />} />
            <Route path="product-card" element={<ProductCardSpecPage />} />
            <Route path="toast" element={<ToastSpecPage />} />
            <Route path="search-input" element={<SearchInputSpecPage />} />
            <Route path="empty-state" element={<EmptyStateSpecPage />} />
            <Route path="navbar" element={<NavBarSpecPage />} />
          </Route>
        </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
