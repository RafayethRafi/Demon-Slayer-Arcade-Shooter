/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'demon-red': '#dc2626',
        'slayer-blue': '#2563eb',
        'zenitsu-yellow': '#fbbf24',
        'tanjiro-green': '#10b981', // Approximate checkerboard green
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.5))' },
          '50%': { opacity: '0.8', filter: 'brightness(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
