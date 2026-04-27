import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        surface: '#131929',
        'surface-raised': '#1C2540',
        border: '#2A3352',
        foreground: '#E8EAF0',
        muted: '#6B7490',
        accent: '#3D5AFE',
        success: '#00C853',
        danger: '#FF1744',
        warning: '#FFD600',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        display: ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(42 51 82 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        'radial-glow': 'radial-gradient(ellipse 60% 40% at 50% 0%, rgb(61 90 254 / 0.15), transparent)',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgb(61 90 254 / 0.12), transparent 70%)',
      },
      boxShadow: {
        card: '0 0 0 1px rgb(42 51 82 / 0.8), 0 4px 24px rgb(0 0 0 / 0.4)',
        'card-hover': '0 0 0 1px rgb(61 90 254 / 0.5), 0 8px 40px rgb(0 0 0 / 0.5)',
        glow: '0 0 20px rgb(61 90 254 / 0.3)',
        'glow-success': '0 0 12px rgb(0 200 83 / 0.4)',
        'glow-danger': '0 0 12px rgb(255 23 68 / 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
