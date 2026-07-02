/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'parx-black':    '#1B1B1B',
        'parx-dark':     '#202020',
        'parx-red':      '#D63E73',
        'parx-red-dark': '#B8325F',
        'parx-white':    '#FFFFFF',
        'parx-cream':    '#FAF8F6',
        'parx-light':    '#F3F3F3',
        'parx-gray':     '#5C5C5C',
        'parx-gray-light':'#E6E6E6',
        'parx-border':   '#E6E6E6',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans':    ['Manrope', 'Helvetica', 'sans-serif'],
        'mono':    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(30px)' }, '100%': { opacity: 1, transform: 'translateY(0)' }},
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 }},
      },
    },
  },
  plugins: [],
}
