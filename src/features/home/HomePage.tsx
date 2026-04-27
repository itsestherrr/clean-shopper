import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="text-h1 text-ink-primary mb-sm">Home</h1>
      <p className="text-body text-ink-secondary mb-2xl max-w-[640px]">
        Your landing page lives here. We&rsquo;ll build out recent activity, suggestions, and
        your saved-product highlights in a future phase.
      </p>

      <div className="bg-surface-card border-[1.5px] border-surface-divider rounded-card p-xl max-w-[640px]">
        <h2 className="text-h3 text-ink-primary mb-sm">Get started</h2>
        <p className="text-body text-ink-secondary mb-lg">
          Search the catalog from the bar above, or browse by category.
        </p>
        <div className="flex gap-sm">
          <Button variant="primary" size="md" onClick={() => navigate('/browse')}>
            Browse products
          </Button>
          <Button variant="ghost" size="md" onClick={() => navigate('/search')}>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
