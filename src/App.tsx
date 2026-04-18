import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SpecLayout from './features/spec/SpecLayout'
import BadgeSpecPage from './features/spec/BadgeSpecPage'
import IconButtonSpecPage from './features/spec/IconButtonSpecPage'
import IngredientBarSpecPage from './features/spec/IngredientBarSpecPage'
import IngredientListSpecPage from './features/spec/IngredientListSpecPage'
import ModalSpecPage from './features/spec/ModalSpecPage'
import ProductCardSpecPage from './features/spec/ProductCardSpecPage'
import RatingBadgeSpecPage from './features/spec/RatingBadgeSpecPage'
import ToastSpecPage from './features/spec/ToastSpecPage'

function App() {
  return (
    <div className="bg-surface-bg min-h-screen">
      <NavBar activeTab="home" onNavigate={(tab) => console.log(tab)} />

      {/* Main content — offset for NavBar */}
      <main className="md:ml-[240px] pb-[72px] md:pb-0 p-2xl">
        <Routes>
          <Route path="/" element={<BrowsePage />} />
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
