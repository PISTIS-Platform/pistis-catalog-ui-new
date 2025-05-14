import type { Config } from 'tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'
import typography from '@tailwindcss/typography'
/* import { gray } from 'tailwindcss/colors' */

export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', 'sans-serif'],
      display: ['var(--font-display)', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          disabled: 'var(--primary-disabled)',
          light: 'var(--primary-light)',
          text: 'var(--primary-text)',
        },

        'secondary': {
          DEFAULT: 'var(--secondary)',
          hover: 'var(--secondary-background-hover)',
          pressed: 'var(--secondary-background-pressed)',
          disabled: 'var(--secondary-background-disabled)',
          text: 'var(--secondary-text)',
        },

        'gray': {
          DEFAULT: 'var(--gray)',
          hover: 'var(--gray-hover)',
        },

        'black': {
          DEFAULT: 'var(--black)',
        },

        'surface': {
          DEFAULT: 'var(--surface)',
          text: 'var(--surface-text)',
          light: 'var(--surface-text-light)',
        },

        'header-bg': {
          DEFAULT: 'var(--header-bg)',
          text: 'var(--header-text)',
        },

       'footer-bg': {
          DEFAULT: 'var(--footer-bg)',
          text: 'var(--footer-text)',
        },

        'neutral': {
          0: 'var(--neutral-0)',
          5: 'var(--neutral-5)',
          10: 'var(--neutral-10)',
          20: 'var(--neutral-20)',
          30: 'var(--neutral-30)',
          60: 'var(--neutral-60)',
          80: 'var(--neutral-80)',
          90: 'var(--neutral-90)',
          100: 'var(--neutral-100)',
        },

        // For text content on lighter bg
        'neutral-content': {
          DEFAULT: 'rgb(33, 37, 41)',
        },

        // Map surface to 'light' color palette from KDW
        // Because surface is more finely grained than light,
        // try to map the surface colors to the nearest light color
        'surface-0': 'rgb(var(--light-100))',
        'surface-50': 'rgb(var(--light-200))',
        'surface-100': 'rgb(var(--light-200))',
        'surface-200': 'rgb(var(--light-300))',
        'surface-300': 'rgb(var(--light-400))',
        'surface-400': 'rgb(var(--light-500))',
        'surface-500': 'rgb(var(--light-700))',
        'surface-600': 'rgb(var(--light-700))',
        'surface-700': 'rgb(var(--light-800))',
        'surface-800': 'rgb(var(--light-900))',
        'surface-900': 'rgb(var(--light-900))',
        'surface-950': 'rgb(var(--light-1000))',

        'content': 'rgb(var(--light-1000))',
        'content-lighter': 'rgb(var(--light-900))',
        'content-icon': 'rgb(var(--light-700))',

        'btn-hover': 'rgb(var(--btn-hover))',
        'btn-regular': 'rgb(var(--btn-regular))',
        'btn-pressed': 'rgb(var(--btn-pressed))',

        'inline-text-hyperlink': 'rgb(var(--twinby-blue-80))',
        'inline-text-hyperlink-hover': 'rgb(var(--twinby-blue-100))',
        'inline-text-hyperlink-pressed': 'rgb(var(--twinby-blue-60))',
        'inline-text-hyperlink-visited': 'rgb(var(--twinby-blue-90))',
        'inline-text-hyperlink--dark': 'rgb(var(--twinby-blue-40))',
        'inline-text-hyperlink-hover--dark': 'rgb(var(--twinby-blue-30))',
        'inline-text-hyperlink-pressed--dark': 'rgb(var(--twinby-blue-60))',
        'inline-text-hyperlink-visited--dark': 'rgb(var(--twinby-blue-50))',
      },

      spacing: {
        // spacing; corresponds to "spacing-*" design tokens
        // Usage example: "px-by2"
        by1: '0.25rem',
        by2: '0.5rem',
        by3: '1rem',
        by4: '1.5rem',
        by5: '2rem',
        by6: '3rem',
        by7: '3.5rem',
        by8: '4rem',
        by9: '4.5rem',
        by10: '5rem',
        by11: '7.5rem',
        by12: '10rem',
      },

      borderRadius: {
        custom: 'var(--border-radius-custom)',
        search: 'var(--border-radius-search)',
      },

      fontSize: {
        'copy-lg': ['1rem', '1.625rem'],
        'copy-sm': ['0.9375rem', '1.5rem'],
        'copy-xs': ['0.75rem', '1rem'],
      },

      maxWidth: {
        // Usage example: "max-w-content-max"
        'content-max': '1280px',
      },
    },

    screens: {
      // Adopted from Bootstrap breakpoints
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
  },
  plugins: [
    typography,
    addDynamicIconSelectors({
      // 1.5rem = 24px = 2xl
      scale: 1.5,
    }),
  ],
} satisfies Config
