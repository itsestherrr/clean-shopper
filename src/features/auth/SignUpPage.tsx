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
  'w-full bg-surface-card rounded-card px-md py-sm text-body text-text-primary placeholder:text-text-placeholder focus:outline-none transition-shadow duration-fast ease-default'
const INPUT_DEFAULT =
  'shadow-[inset_0_0_0_1.5px_var(--color-surface-divider)] focus:shadow-[inset_0_0_0_1.5px_var(--color-primary)]'
const INPUT_ERROR =
  'shadow-[inset_0_0_0_1.5px_var(--color-avoid)] focus:shadow-[inset_0_0_0_1.5px_var(--color-avoid)]'

function humanizeSignUpError(message: string): string {
  if (/already registered|already exists/i.test(message)) {
    return 'An account with this email already exists. Try signing in instead.'
  }
  if (/password/i.test(message) && /short|characters/i.test(message)) {
    return 'Password must be at least 6 characters.'
  }
  if (/rate limit|too many/i.test(message)) {
    return 'Too many attempts. Please wait a moment and try again.'
  }
  return message
}

export default function SignUpPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_REGEX.test(email)) next.email = 'Enter a valid email address.'

    if (!password) next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'

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
    setNotice(null)

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      return
    }

    setFieldErrors({})
    setSubmitting(true)

    const { data, error } = await supabase.auth.signUp({ email, password })

    setSubmitting(false)

    if (error) {
      setFormError(humanizeSignUpError(error.message))
      return
    }

    if (data.session) {
      navigate('/search')
    } else {
      setNotice('Check your email to confirm your account before signing in.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2xl">
      <div className="w-full max-w-[420px] bg-surface-card rounded-card p-2xl">
        <h1 className="text-h1 text-text-primary mb-sm">Create an account</h1>
        <p className="text-body text-text-secondary mb-xl">
          Sign up to save products and build your shopping list.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-md">
          <div>
            <label
              htmlFor="signup-email"
              className="block text-label uppercase text-text-tertiary mb-xs"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'signup-email-error' : undefined}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearFieldError('email')
              }}
              className={`${INPUT_BASE} ${fieldErrors.email ? INPUT_ERROR : INPUT_DEFAULT}`}
            />
            {fieldErrors.email && (
              <p id="signup-email-error" className="text-small text-avoid mt-xs">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-label uppercase text-text-tertiary mb-xs"
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'signup-password-error' : undefined}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                clearFieldError('password')
              }}
              className={`${INPUT_BASE} ${fieldErrors.password ? INPUT_ERROR : INPUT_DEFAULT}`}
            />
            {fieldErrors.password && (
              <p id="signup-password-error" className="text-small text-avoid mt-xs">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {formError && (
            <div role="alert" className="bg-avoid-bg rounded-card p-md">
              <p className="text-small text-avoid">{formError}</p>
            </div>
          )}
          {notice && (
            <div role="status" className="bg-clean-bg rounded-card p-md">
              <p className="text-small text-clean">{notice}</p>
            </div>
          )}

          <Button type="submit" fullWidth loading={submitting}>
            Sign up
          </Button>
        </form>

        <p className="text-small text-text-secondary text-center mt-lg">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
