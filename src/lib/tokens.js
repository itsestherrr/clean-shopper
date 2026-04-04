/**
 * Clean Shopper — Design Tokens
 * Single source of truth for all design values in JavaScript.
 * Mirrors tailwind.config.js exactly — use these in dynamic styles,
 * animations, canvas rendering, or anywhere Tailwind classes can't reach.
 */

export const tokens = {

  // ── Colors ───────────────────────────────────────────────────────────────
  colors: {
    surface: {
      bg:      '#FAF7F2',
      card:    '#FFFFFF',
      muted:   '#F0ECE6',
      divider: '#EBE7E0',
    },
    primary: {
      DEFAULT: '#5A8384',
      dark:    '#4A7273',
      light:   '#DDEAEB',
    },
    clean: {
      DEFAULT: '#6A8362',
      bg:      '#DCE6D8',
      tint:    '#E6EDE2',
    },
    caution: {
      DEFAULT: '#B8943D',
      bg:      '#F0E4C8',
      tint:    '#F5EDD8',
    },
    avoid: {
      DEFAULT: '#9A6A6A',
      bg:      '#ECDCDC',
      tint:    '#F2E6E6',
    },
    text: {
      primary:     '#1D1D1D',
      secondary:   '#6B6B6B',
      tertiary:    '#9B9B9B',
      placeholder: '#B5B0A8',
    },
    accent: {
      lavender: '#7A6A8A',
      taupe:    '#8A7060',
      moss:     '#6A8362',
      slate:    '#5A6A7A',
    },
  },

  // ── Typography ───────────────────────────────────────────────────────────
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, sans-serif",
    },
    fontSize: {
      display: '36px',
      h1:      '28px',
      h2:      '22px',
      h3:      '16px',
      h4:      '14px',
      body:    '14px',
      small:   '12px',
      label:   '11px',
      micro:   '10px',
    },
    fontWeight: {
      display: '700',
      h1:      '600',
      h2:      '600',
      h3:      '500',
      h4:      '500',
      body:    '400',
      small:   '400',
      label:   '500',
      micro:   '400',
    },
    lineHeight: {
      display: '1.1',
      h1:      '1.2',
      h2:      '1.25',
      h3:      '1.3',
      h4:      '1.35',
      body:    '1.65',
      small:   '1.5',
      label:   '1.4',
      micro:   '1.4',
    },
    letterSpacing: {
      display: '-0.03em',
      h1:      '-0.025em',
      h2:      '-0.02em',
      h3:      '-0.01em',
      h4:      '0em',
      body:    '0em',
      small:   '0em',
      label:   '0.06em',
      micro:   '0em',
    },
  },

  // ── Spacing ──────────────────────────────────────────────────────────────
  spacing: {
    xs:  '4px',
    sm:  '8px',
    md:  '16px',
    lg:  '24px',
    xl:  '32px',
    '2xl': '48px',
    '3xl': '64px',
  },

  // ── Border Radius ─────────────────────────────────────────────────────────
  borderRadius: {
    badge: '6px',
    card:  '16px',
    full:  '999px',
  },

  // ── Shadows ───────────────────────────────────────────────────────────────
  shadows: {
    none:  'none',
    hover: '0 4px 16px rgba(100,80,50,0.10)',
    modal: '0 8px 32px rgba(100,80,50,0.14)',
  },

  // ── Motion ───────────────────────────────────────────────────────────────
  motion: {
    duration: {
      fast:   '100ms',
      base:   '150ms',
      slow:   '250ms',
      slower: '350ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enter:   'cubic-bezier(0, 0, 0.2, 1)',
      exit:    'cubic-bezier(0.4, 0, 1, 1)',
    },
  },

  // ── Z-Index ───────────────────────────────────────────────────────────────
  zIndex: {
    base:     0,
    raised:   10,
    dropdown: 100,
    sticky:   200,
    overlay:  300,
    modal:    400,
    toast:    500,
  },

  // ── Breakpoints ───────────────────────────────────────────────────────────
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}

// ── Named exports for convenience ─────────────────────────────────────────
export const { colors, typography, spacing, borderRadius, shadows, motion, zIndex, breakpoints } = tokens
