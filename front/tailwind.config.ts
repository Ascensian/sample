import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';
const config: Config = {
  content: [
    './page.tsx',
    './index.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/lib/**/*.js',
    './public/**/*.html',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'slide-in': 'slideInFromLeft 1s ease-out 0.2s',
        'slide-in-right': 'slideInFromRight 1.2s ease-out 0.3s',
        'slide-out': 'slideOutToLeft 1s ease-out 0.2s',
        'slide-out-right': 'slideOutToRight 1.2s ease-out 0.3s',
        'fade-in': 'fadeIn 1.5s ease-out 0.5s',
        'fade-out': 'fadeOut 1.5s ease-out 0.5s',
        'slide-in-up': 'slideInFromTop 1.1s ease-out 0.4s',
        'slide-out-up': 'slideOutToTop 1.1s ease-out 0.4s',
        'slide-in-down': 'slideInFromBottom 1s ease-out 0.3s',
        'slide-out-down': 'slideOutToBottom 1s ease-out 0.3s',
        'bounce-in': 'bounceIn 1s ease-out 0.5s',
        'bounce-out': 'bounceOut 1s ease-out 0.5s',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
