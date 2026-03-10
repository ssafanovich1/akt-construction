/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1F2937',
          deep: '#111827',
          light: '#374151',
        },
        emerald: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        cream: {
          DEFAULT: '#F8F1E3',
          dark: '#EDE4D3',
        },
        warm: {
          gray: '#E5E7EB',
          dark: '#D1D5DB',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
