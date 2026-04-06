import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'

function App() {
  return (
    <div className="bg-surface-bg min-h-screen">
      <NavBar activeTab="home" onNavigate={(tab) => console.log(tab)} />

      {/* Main content — offset for NavBar */}
      <main className="md:ml-[240px] pb-[72px] md:pb-0 p-2xl">
        <div className="space-y-xl max-w-[600px] mx-auto">
          <ProductCard
            name="Dr. Bronner's Pure Castile Soap"
            brand="Dr. Bronner's"
            rating="clean"
            category="Personal Care"
            description="Organic, fair trade, no synthetic preservatives or detergents."
            onSave={() => console.log('save')}
            onAddToList={() => console.log('add to list')}
            onClick={() => console.log('view details')}
          />

          {/* Loading state */}
          <ProductCard
            name=""
            brand=""
            rating="clean"
            category=""
            description=""
            loading
          />
        </div>
      </main>
    </div>
  )
}

export default App
