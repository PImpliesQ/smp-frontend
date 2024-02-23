import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/panel/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
      keyframes: {
        animatedGradient: {
          '0%': {backgroundPosition: '0% 50%'},
          '50%': {backgroundPosition: '100% 50%'},
          '100%': {backgroundPosition: '0% 50%'},
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedGradient 6s ease infinite alternate',
      },
    }
  },
  important: true,
  corePlugins: {
    preflight: false,
  }
};

export default config
