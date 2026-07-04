import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        surface: '#fdf8f6',
        'surface-dim': '#e0d3d0',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fbedea',
        'surface-container': '#f7e5e1',
        'surface-container-high': '#f2dbd6',
        'surface-container-highest': '#edd2cc',
        'on-surface': '#2c2422',
        'on-surface-variant': '#5c4a46',
        'inverse-surface': '#332b28',
        'inverse-on-surface': '#f5f0ec',
        outline: '#9e7e78',
        'outline-variant': '#e8c4bc',
        'surface-tint': '#b06b6b',
        primary: '#b06b6b',
        'on-primary': '#ffffff',
        'primary-container': '#f2b4b4',
        'on-primary-container': '#5c2626',
        'inverse-primary': '#f0b8b8',
        secondary: '#c48a7a',
        'on-secondary': '#ffffff',
        'secondary-container': '#ffddd4',
        'on-secondary-container': '#6e4238',
        tertiary: '#8b6f5c',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#f0d9c8',
        'on-tertiary-container': '#5e4434',
        'primary-fixed': '#f9cece',
        'primary-fixed-dim': '#e8a3a3',
        'secondary-fixed': '#ffe8e0',
        'secondary-fixed-dim': '#e8b4a5',
        'tertiary-fixed': '#f5e6da',
        'tertiary-fixed-dim': '#d4b89e',
        'error-container': '#ffdad6'
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-jakarta)', 'sans-serif']
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }]
      },
      maxWidth: {
        container: '1200px'
      },
      spacing: {
        'margin-mobile': '20px',
        'margin-desktop': '64px'
      }
    }
  },
  plugins: []
}

export default config
