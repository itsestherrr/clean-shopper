import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import Modal from '../../components/Modal'
import IngredientList from '../../components/IngredientList'
import IngredientBar from '../../components/IngredientBar'
import RatingBadge from '../../components/RatingBadge'

type Rating = 'clean' | 'caution' | 'avoid'

interface Ingredient {
  name: string
  rating: Rating
  reason: string
  isUserAvoided?: boolean
}

interface Product {
  id: string
  name: string
  brand: string
  rating: Rating
  category: string
  description: string
  ingredients: Ingredient[]
}

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Dr. Bronner's Pure Castile Soap",
    brand: "Dr. Bronner's",
    rating: 'clean',
    category: 'Personal Care',
    description: 'Organic, fair trade, no synthetic preservatives or detergents. EWG Verified.',
    ingredients: [
      { name: 'Coconut Oil', rating: 'clean', reason: 'Gentle plant-based surfactant, no known hazards' },
      { name: 'Olive Oil', rating: 'clean', reason: 'Moisturizing base oil, EWG score 1' },
      { name: 'Hemp Seed Oil', rating: 'clean', reason: 'Nutrient-rich, non-comedogenic, low concern' },
      { name: 'Tocopherol', rating: 'clean', reason: 'Vitamin E, natural antioxidant preservative' },
    ],
  },
  {
    id: '2',
    name: 'Ethique Solid Shampoo Bar',
    brand: 'Ethique',
    rating: 'clean',
    category: 'Personal Care',
    description: 'Zero-waste, palm oil free, pH balanced. All ingredients rated low-concern.',
    ingredients: [
      { name: 'Sodium Cocoyl Isethionate', rating: 'clean', reason: 'Gentle coconut-derived surfactant, low irritation' },
      { name: 'Cocoa Butter', rating: 'clean', reason: 'Plant-based moisturizer, no known hazards' },
      { name: 'Peppermint Oil', rating: 'clean', reason: 'Natural essential oil, EWG score 1' },
    ],
  },
  {
    id: '3',
    name: "Mrs. Meyer's Clean Day Dish Soap",
    brand: "Mrs. Meyer's",
    rating: 'caution',
    category: 'Home Cleaning',
    description: 'Mostly plant-derived but contains methylisothiazolinone and undisclosed fragrance blend.',
    ingredients: [
      { name: 'Decyl Glucoside', rating: 'clean', reason: 'Plant-derived surfactant, very gentle' },
      { name: 'Methylisothiazolinone', rating: 'avoid', reason: 'Known skin sensitizer and allergen, EWG score 7', isUserAvoided: true },
      { name: 'Fragrance', rating: 'caution', reason: 'Undisclosed blend may contain phthalates or allergens' },
      { name: 'Glycerin', rating: 'clean', reason: 'Plant-derived humectant, no known hazards' },
    ],
  },
  {
    id: '4',
    name: 'Seventh Generation Disinfecting Wipes',
    brand: 'Seventh Generation',
    rating: 'caution',
    category: 'Home Cleaning',
    description: 'Thymol-based active ingredient, but includes synthetic fragrance and preservatives.',
    ingredients: [
      { name: 'Thymol', rating: 'clean', reason: 'Thyme-derived antimicrobial, naturally sourced' },
      { name: 'Alkyl Polyglucoside', rating: 'clean', reason: 'Plant-based surfactant, biodegradable' },
      { name: 'Fragrance', rating: 'caution', reason: 'Synthetic blend, composition not fully disclosed' },
      { name: 'Phenoxyethanol', rating: 'caution', reason: 'Synthetic preservative, moderate concern at high concentrations' },
    ],
  },
  {
    id: '5',
    name: 'Babyganics Bubble Bath',
    brand: 'Babyganics',
    rating: 'clean',
    category: 'Baby Care',
    description: 'Plant-derived, tear-free, no parabens, sulfates, or artificial fragrances.',
    ingredients: [
      { name: 'Coco-Glucoside', rating: 'clean', reason: 'Gentle coconut-derived cleanser, safe for babies' },
      { name: 'Chamomile Extract', rating: 'clean', reason: 'Soothing botanical, no known hazards' },
      { name: 'Citric Acid', rating: 'clean', reason: 'Natural pH adjuster, food-grade ingredient' },
    ],
  },
  {
    id: '6',
    name: 'Johnson\'s Baby Lotion',
    brand: "Johnson's",
    rating: 'avoid',
    category: 'Baby Care',
    description: 'Contains mineral oil, fragrance blend with undisclosed components, and parabens.',
    ingredients: [
      { name: 'Mineral Oil', rating: 'caution', reason: 'Petroleum-derived, may contain impurities depending on refinement' },
      { name: 'Fragrance', rating: 'caution', reason: 'Undisclosed blend, potential allergens and endocrine disruptors' },
      { name: 'Propylparaben', rating: 'avoid', reason: 'Endocrine disruptor, EWG score 7', isUserAvoided: true },
      { name: 'Methylparaben', rating: 'avoid', reason: 'Preservative linked to hormone disruption, EWG score 4-7' },
      { name: 'Isopropyl Palmitate', rating: 'caution', reason: 'Can clog pores, moderate skin irritation concern' },
    ],
  },
]

export default function BrowsePage() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div>
      <h1 className="text-h1 text-text-primary mb-sm">Browse Products</h1>
      <p className="text-body text-text-secondary mb-2xl">
        Explore products and check their ingredient safety ratings.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {PLACEHOLDER_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            brand={product.brand}
            rating={product.rating}
            category={product.category}
            description={product.description}
            saved={savedIds.has(product.id)}
            onSave={() => toggleSave(product.id)}
            onAddToList={() => console.log('add to list', product.id)}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Product detail modal */}
      <Modal
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
      >
        {selectedProduct && (
          <div>
            <div className="flex items-center gap-sm mb-md">
              <span className="text-body text-text-secondary">{selectedProduct.brand}</span>
              <RatingBadge rating={selectedProduct.rating} />
            </div>
            <p className="text-body text-text-secondary mb-lg">{selectedProduct.description}</p>

            <IngredientBar
              counts={{
                clean: selectedProduct.ingredients.filter((i) => i.rating === 'clean').length,
                caution: selectedProduct.ingredients.filter((i) => i.rating === 'caution').length,
                avoid: selectedProduct.ingredients.filter((i) => i.rating === 'avoid').length,
              }}
            />
            <div className="mt-lg">
              <IngredientList ingredients={selectedProduct.ingredients} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
