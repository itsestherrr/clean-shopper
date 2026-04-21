import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Button from '../../components/Button'

type FieldErrors = {
  email?: string
  password?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INPUT_BASE =
  'w-full bg-surface-card rounded-card px-md py-sm text-body text-ink-primary placeholder:text-ink-placeholder focus:outline-none transition-shadow duration-fast ease-out-soft'
const INPUT_DEFAULT =
  'shadow-[inset_0_0_0_1.5px_var(--color-surface-divider)] focus:shadow-[inset_0_0_0_1.5px_var(--color-primary)]'
const INPUT_ERROR =
  'shadow-[inset_0_0_0_1.5px_var(--color-avoid)] focus:shadow-[inset_0_0_0_1.5px_var(--color-avoid)]'

function humanizeSignInError(message: string): string {
  if (/invalid login credentials/i.test(message)) {
    return 'Email or password is incorrect.'
  }
  if (/email not confirmed/i.test(message)) {
    return 'Please confirm your email before signing in. Check your inbox for the confirmation link.'
  }
  if (/rate limit|too many/i.test(message)) {
    return 'Too many attempts. Please wait a moment and try again.'
  }
  return message
}

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_REGEX.test(email)) next.email = 'Enter a valid email address.'

    if (!password) next.password = 'Password is required.'

    return next
  }

  function clearFieldError(field: keyof FieldErrors) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }

    setFieldErrors({})
    setSubmitting(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setSubmitting(false)

    if (error) {
      setFormError(humanizeSignInError(error.message))
      return
    }

    navigate('/search')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2xl">
      <div className="w-full max-w-[420px] bg-surface-card rounded-card p-2xl">
        <h1 className="text-h1 text-ink-primary mb-sm">Welcome back</h1>
        <p className="text-body text-ink-secondary mb-xl">
          Sign in to access your saved products and shopping list.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-md">
          <div>
            <label
              htmlFor="signin-email"
              className="block text-label uppercase text-ink-tertiary mb-xs"
            >
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'signin-email-error' : undefined}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearFieldError('email')
              }}
              className={`${INPUT_BASE} ${fieldErrors.email ? INPUT_ERROR : INPUT_DEFAULT}`}
            />
            {fieldErrors.email && (
              <p id="signin-email-error" className="text-small text-avoid mt-xs">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signin-password"
              className="block text-label uppercase text-ink-tertiary mb-xs"
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'signin-password-error' : undefined}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                clearFieldError('password')
              }}
              className={`${INPUT_BASE} ${fieldErrors.password ? INPUT_ERROR : INPUT_DEFAULT}`}
            />
            {fieldErrors.password && (
              <p id="signin-password-error" className="text-small text-avoid mt-xs">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {formError && (
            <div role="alert" className="bg-avoid-bg rounded-card p-md">
              <p className="text-small text-avoid">{formError}</p>
            </div>
          )}

          <Button type="submit" fullWidth loading={submitting}>
            Sign in
          </Button>
        </form>

        <p className="text-small text-ink-secondary text-center mt-lg">
          Don&rsquo;t have an account?{' '}
          <Link to="/signup" className="text-amethyst hover:text-amethyst-110">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
