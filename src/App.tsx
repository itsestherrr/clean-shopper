import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SpecLayout from './features/spec/SpecLayout'
import BadgeSpecPage from './features/spec/BadgeSpecPage'
import ProductCardSpecPage from './features/spec/ProductCardSpecPage'

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
            <Route path="product-card" element={<ProductCardSpecPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
