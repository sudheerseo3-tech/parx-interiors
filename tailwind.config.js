/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'parx-black':    '#1A1A1A',
        'parx-dark':     '#2A2A2A',
        'parx-red':      '#C8102E',
        'parx-red-dark': '#A00D24',
        'parx-white':    '#FFFFFF',
        'parx-cream':    '#F5F2EE',
        'parx-light':    '#F8F8F8',
        'parx-gray':     '#6B7280',
        'parx-gray-light':'#E5E7EB',
        'parx-border':   '#E5E7EB',
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'Georgia', 'serif'],
        'sans':    ['DM Sans', 'Helvetica', 'sans-serif'],
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
