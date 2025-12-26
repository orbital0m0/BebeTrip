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
          50: '#FFF5F5',
          100: '#FFE8E8',
          200: '#FFD1D1',
          300: '#FFB0B0',
          400: '#FF8A8A',
          500: '#FF6B6B',
          600: '#F05252',
          700: '#DC2626',
        },
        secondary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        accent: {
          100: '#FEF3C7',
          500: '#F59E0B',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B',
        },
        error: {
          DEFAULT: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}
