/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Soft Violet
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F472B6', // Soft Pink
          foreground: '#FFFFFF',
        },
        background: '#FFFBF5', // Warm Cream
        surface: '#FFFFFF', // Pure White
        accent: {
          DEFAULT: '#34D399', // Soft Mint
          foreground: '#FFFFFF',
        },
        text: {
          main: '#1E293B', // Slate 800
          muted: '#64748B', // Slate 500
        },
        border: '#E2E8F0', // Slate 200
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'], // Outfit is rounder/friendlier
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(139, 92, 246, 0.3)',
      }
    },
  },
  plugins: [],
}
