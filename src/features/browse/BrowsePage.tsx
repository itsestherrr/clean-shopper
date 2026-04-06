import { useState } from 'react'
import ProductCard from '../../components/ProductCard'

type Rating = 'clean' | 'caution' | 'avoid'

interface Product {
  id: string
  name: string
  brand: string
  rating: Rating
  category: string
  description: string
}

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Dr. Bronner's Pure Castile Soap",
    brand: "Dr. Bronner's",
    rating: 'clean',
    category: 'Personal Care',
    description: 'Organic, fair trade, no synthetic preservatives or detergents. EWG Verified.',
  },
  {
    id: '2',
    name: 'Ethique Solid Shampoo Bar',
    brand: 'Ethique',
    rating: 'clean',
    category: 'Personal Care',
    description: 'Zero-waste, palm oil free, pH balanced. All ingredients rated low-concern.',
  },
  {
    id: '3',
    name: "Mrs. Meyer's Clean Day Dish Soap",
    brand: "Mrs. Meyer's",
    rating: 'caution',
    category: 'Home Cleaning',
    description: 'Mostly plant-derived but contains methylisothiazolinone and undisclosed fragrance blend.',
  },
  {
    id: '4',
    name: 'Seventh Generation Disinfecting Wipes',
    brand: 'Seventh Generation',
    rating: 'caution',
    category: 'Home Cleaning',
    description: 'Thymol-based active ingredient, but includes synthetic fragrance and preservatives.',
  },
  {
    id: '5',
    name: 'Babyganics Bubble Bath',
    brand: 'Babyganics',
    rating: 'clean',
    category: 'Baby Care',
    description: 'Plant-derived, tear-free, no parabens, sulfates, or artificial fragrances.',
  },
  {
    id: '6',
    name: 'Johnson\'s Baby Lotion',
    brand: "Johnson's",
    rating: 'avoid',
    category: 'Baby Care',
    description: 'Contains mineral oil, fragrance blend with undisclosed components, and parabens.',
  },
]

export default function BrowsePage() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

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
            onClick={() => console.log('view details', product.id)}
          />
        ))}
      </div>
    </div>
  )
}
