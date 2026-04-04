import ProductCard from './components/ProductCard'

function App() {
  return (
    <div className="bg-surface-bg min-h-screen p-2xl">
      <div className="space-y-xl max-w-[600px] mx-auto">
        <ProductCard
          name="Everyday Shea Body Wash — Lavender"
          brand="Alaffia"
          rating="clean"
          category="Body Care"
          description="All ingredients rated low-concern by EWG. Plant-based surfactants, no parabens, no synthetic fragrance."
        />
        <ProductCard
          name="Mrs. Meyer's Clean Day Dish Soap"
          brand="Mrs. Meyer's"
          rating="caution"
          category="Home Cleaning"
          description="Mostly plant-derived but contains methylisothiazolinone and fragrance blend with undisclosed components."
        />
        <ProductCard
          name="Febreze Air Effects — Original Scent"
          brand="Procter & Gamble"
          rating="avoid"
          category="Home Fragrance"
          description="Contains phthalates, synthetic musks, and multiple high-concern fragrance chemicals."
        />
      </div>
    </div>
  )
}

export default App
