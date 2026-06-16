import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#13A8C7',
          light: '#1CC4E8',
          dark: '#0F8BA6',
        },
        secondary: {
          DEFAULT: '#1B4A5E',
          light: '#24627D',
          dark: '#123344',
        },
        surface: {
          DEFAULT: '#D2F6FB',
          dark: '#1A1A2E',
          deeper: '#0F0F1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.15)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.2)',
        glow: '0 0 20px rgba(19, 168, 199, 0.15)',
      },
    },
  },
  plugins: [],
}
