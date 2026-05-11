/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Exo', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50:  '#EEF2FA',
          100: '#D6DEF0',
          200: '#A9B7DC',
          300: '#7B8FC6',
          400: '#4D67B0',
          500: '#2C4791',
          600: '#1E3370',
          700: '#162652',
          800: '#0F2543',
          900: '#0A1A33'
        },
        accent: {
          500: '#1E88E5',
          600: '#1A78CC'
        },
        sun: {
          400: '#FFC83A',
          500: '#F5B400',
          600: '#D9A000'
        },
        ink: {
          900: '#262B44',
          700: '#3D4366',
          500: '#5A6478',
          300: '#A0A8B9'
        },
        surface: {
          0:   '#FFFFFF',
          50:  '#F7F9FC',
          100: '#EEF1F7',
          200: '#E1E6F0'
        }
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,37,67,.06), 0 8px 24px -12px rgba(15,37,67,.15)',
        lift: '0 24px 48px -24px rgba(15,37,67,.35)',
        chip: '0 1px 0 rgba(15,37,67,.06), 0 4px 12px -6px rgba(15,37,67,.12)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      animation: {
        'fade-in': 'fadeIn .25s ease-out',
        'slide-up': 'slideUp .35s cubic-bezier(.2,.8,.2,1)',
        'scale-in': 'scaleIn .18s ease-out'
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(.96)' }, to: { opacity: 1, transform: 'scale(1)' } }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
