import type { Config } from 'tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'
import typography from '@tailwindcss/typography'
import { gray } from 'tailwindcss/colors'

export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    fontFamily: {
      sans: ['"Inter Variable"', 'sans-serif'],

      // headings
      display: ['"Inter Variable", "sans-serif"'],
    },
    extend: {
      colors: {
        'primary': {
          DEFAULT: 'var(--primary-background)',
          hover: 'var(--primary-background-hover)',
          pressed: 'var(--primary-background-pressed)',
          disabled: 'var(--primary-background-disabled)',

          light: '#d4edfc',
          // This color is used for all text and icons
          fg: 'var(--fg)',
          // THis color is used for backgrounds
          bg: 'var(--bg)',

          text: 'var(--primary-text)',

          10: 'var(--primary-10)',
          20: 'var(--primary-20)',
          30: 'var(--primary-30)',
          40: 'var(--primary-40)',
          50: 'var(--primary-50)',
          60: 'var(--primary-60)',
          70: 'var(--primary-70)',
          80: 'var(--primary-80)',
          90: 'var(--primary-90)',
          100: 'var(--primary-100)',
          110: 'var(--primary-110)',
        },

        'primary-dark': {
          DEFAULT: 'var(--primary-background--dark)',
          hover: 'var(--primary-background-hover--dark)',
          pressed: 'var(--primary-background-pressed--dark)',
          disabled: 'var(--primary-background-disabled--dark)',
          text: 'var(--primary-text--dark)',
        },

        'secondary': {
          DEFAULT: 'var(--secondary-background)',
          hover: 'var(--secondary-background-hover)',
          pressed: 'var(--secondary-background-pressed)',
          disabled: 'var(--secondary-background-disabled)',
          text: 'var(--secondary-text)',
        },

        'secondary-dark': {
          DEFAULT: 'var(--secondary-background--dark)',
          hover: 'var(--secondary-background-hover--dark)',
          pressed: 'var(--secondary-background-pressed--dark)',
          disabled: 'var(--secondary-background-disabled--dark)',
          text: 'var(--secondary-text--dark)',
        },

        'tertiary': {
          DEFAULT: 'var(--tertiary-background)',
          hover: 'var(--tertiary-background-hover)',
          pressed: 'var(--tertiary-background-pressed)',
          text: 'var(--tertiary-text)',
        },

        'tertiary-dark': {
          DEFAULT: 'var(--tertiary-background--dark)',
          hover: 'var(--tertiary-background-hover--dark)',
          pressed: 'var(--tertiary-background-pressed--dark)',
          text: 'var(--tertiary-text--dark)',
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

          // OLD VALUES:
          DEFAULT: 'rgb(var(--light-1000))',
          lighter: 'rgb(var(--light-900))',
          icon: 'rgb(var(--light-700))',
        },

        // For text content on lighter bg
        'neutral-content': {
          DEFAULT: 'rgb(33, 37, 41)',
        },

        'fg': 'var(--text)',
        'fg-muted': gray['600'],

        'border': '#495057',

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

        'bg-lighter': 'rgb(var(--light-0))',
        'bg-darker': 'rgb(var(--light-200))',
        'bg-divider': 'rgb(var(--light-300))',
        'bg-base': '#f5f7fa',

        // primary: "rgb(var(--btn-pressed))",
        // tertiary: "#ffffff",

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
        // bydata spacing; corresponds to "spacing-*" design tokens
        // see: https://www.figma.com/design/KWszsqB7p1j75OXDDCtO4W/%5BLibrary%5D-Open-Data?node-id=0-1&m=dev&focus-id=136-6159
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
        'by': '.5rem',
        'by-button': '1.5rem',
        'by-modal': '2rem',
        'by-inside-modal': '1.5rem',
        'custom': '15px',
        'search': '100px',
      },

      fontSize: {
        'copy-lg': ['1rem', '1.625rem'],
        'copy-sm': ['0.9375rem', '1.5rem'],
        'copy-xs': ['0.75rem', '1rem'],
      },

      maxWidth: {
        // See: https://www.figma.com/design/KWszsqB7p1j75OXDDCtO4W/%5BLibrary%5D-Open-Data?node-id=0-1&m=dev&focus-id=459-9548
        // Usage example: "max-w-content-max"
        'content-max': '1280px',
      },
    },

    screens: {
      // bydata grids & breakpoints
      // Adopted from Bootstrap breakpoints
      // See: https://www.figma.com/design/KWszsqB7p1j75OXDDCtO4W/%5BLibrary%5D-Open-Data?node-id=0-1&m=dev&focus-id=459-9548
      // See: https://getbootstrap.com/docs/5.0/layout/breakpoints/
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',

      // Not specified in bydata, but thrown in anyways to match Bootstrap breakpoints for completion
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
