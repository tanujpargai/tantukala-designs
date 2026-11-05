/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F0E6',
          50: '#FDFCF9',
          100: '#F5F0E6',
          200: '#ECE4D4',
          300: '#E0D4BE',
        },
        parchment: {
          DEFAULT: '#E9DFCB',
          light: '#F2ECDF',
          dark: '#D5C7AC',
        },
        indigo: {
          DEFAULT: '#24364A',
          deep: '#1A2938',
          dark: '#131D27',
          light: '#354E69',
          50: '#F0F4F8',
        },
        terracotta: {
          DEFAULT: '#B65C43',
          dark: '#964832',
          light: '#CE7861',
          50: '#FAF3F1',
        },
        turmeric: {
          DEFAULT: '#D5A449',
          dark: '#B38531',
          light: '#E6BA67',
          50: '#FAF6EE',
        },
        forest: {
          DEFAULT: '#435847',
          dark: '#2E3E31',
          light: '#5B7560',
          50: '#F2F5F2',
        },
        charcoal: {
          DEFAULT: '#24221F',
          dark: '#161513',
          muted: '#5A5650',
          light: '#8E8980',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        'widest-editorial': '0.22em',
        'subtle': '0.04em',
      },
      boxShadow: {
        'craft': '0 20px 40px -15px rgba(36, 54, 74, 0.08)',
        'craft-hover': '0 30px 60px -12px rgba(36, 54, 74, 0.14)',
        'elevated': '0 10px 30px rgba(36, 34, 31, 0.06)',
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
