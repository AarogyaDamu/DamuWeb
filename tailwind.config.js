/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F3',
        surface: '#FFFFFF',
        'surface-subtle': '#F0EEE9',
        'surface-warm': '#EAE7E0',
        'surface-dark': '#0F1012',
        'surface-dark-card': '#181A1E',
        'surface-dark-hover': '#1E2024',
        foreground: '#0F1012',
        'foreground-muted': '#5A5C63',
        'foreground-subtle': '#9A9CA5',
        accent: {
          DEFAULT: '#C8533A',
          hover: '#B84A32',
          light: '#FBF0ED',
          border: '#F0C9C0',
          muted: 'rgba(200, 83, 58, 0.12)',
        },
        sage: {
          DEFAULT: '#3E6B4E',
          light: '#EBF2ED',
          border: '#BDD0C4',
          muted: 'rgba(62, 107, 78, 0.12)',
        },
        border: 'rgba(15, 16, 18, 0.08)',
        'border-medium': 'rgba(15, 16, 18, 0.12)',
        'border-dark': 'rgba(255, 255, 255, 0.08)',
        'border-dark-medium': 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        'widest-2': '0.18em',
      },
      opacity: {
        // Non-standard / leading-zero opacity values used throughout the UI.
        // Tailwind's default opacity scale only covers multiples of 5 with no
        // leading zero, so these string keys are required for classes like
        // `border-white/08`, `bg-white/06`, `to-white/03`, and `border-foreground/12`
        // to actually emit CSS instead of silently rendering nothing.
        '03': '0.03',
        '05': '0.05',
        '06': '0.06',
        '08': '0.08',
        '12': '0.12',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'sm': '0 1px 4px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'lg': '0 12px 32px -4px rgba(0, 0, 0, 0.10), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'xl': '0 24px 48px -8px rgba(0, 0, 0, 0.14), 0 8px 20px -4px rgba(0, 0, 0, 0.06)',
        // Named elevation tokens used across cards, modals and sticky bars.
        // These were referenced ~80 times but never defined, so every element
        // using them rendered flat. Values sit on the same soft, warm elevation scale.
        'subtle': '0 1px 3px 0 rgba(15, 16, 18, 0.05), 0 1px 2px -1px rgba(15, 16, 18, 0.04)',
        'card': '0 4px 16px -4px rgba(15, 16, 18, 0.08), 0 2px 6px -2px rgba(15, 16, 18, 0.05)',
        'elevated': '0 16px 40px -8px rgba(15, 16, 18, 0.16), 0 6px 16px -4px rgba(15, 16, 18, 0.08)',
        'accent': '0 8px 28px -6px rgba(200, 83, 58, 0.28)',
        'glow-accent': '0 0 32px -6px rgba(200, 83, 58, 0.30)',
        'glow-sage': '0 0 32px -6px rgba(62, 107, 78, 0.25)',
        'inner-top': 'inset 0 1px 0 0 rgba(255,255,255,0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
