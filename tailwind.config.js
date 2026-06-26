/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Parx Interiors brand palette — extracted from logo
        'parx-black':   '#0F0F0F',   // near-black — primary background
        'parx-charcoal':'#1A1A1A',   // charcoal — cards, sections
        'parx-red':     '#C8102E',   // crimson red — logo accent, CTAs
        'parx-red-dark':'#A00D24',   // deep red — hover states
        'parx-white':   '#FFFFFF',   // pure white — text on dark
        'parx-offwhite':'#F5F2EE',   // warm off-white — light sections
        'parx-gray':    '#8A8A8A',   // mid gray — secondary text
        'parx-border':  '#2A2A2A',   // dark border
        'parx-gold':    '#C9A96E',   // warm gold — premium accent
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'Georgia', 'serif'],
        'sans':    ['DM Sans', 'Helvetica', 'sans-serif'],
        'mono':    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero':   ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display':['clamp(2rem, 5vw, 4rem)',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
        'line-grow':  'lineGrow 1.2s ease forwards',
        'slide-right':'slideRight 0.6s ease forwards',
      },
      keyframes: {
        fadeUp:     { '0%': { opacity: 0, transform: 'translateY(30px)' }, '100%': { opacity: 1, transform: 'translateY(0)' }},
        fadeIn:     { '0%': { opacity: 0 }, '100%': { opacity: 1 }},
        lineGrow:   { '0%': { width: '0%' }, '100%': { width: '100%' }},
        slideRight: { '0%': { transform: 'translateX(-20px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 }},
      },
    },
  },
  plugins: [],
}
