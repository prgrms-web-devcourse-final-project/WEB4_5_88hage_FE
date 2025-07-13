import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './assets/**/*.{css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;