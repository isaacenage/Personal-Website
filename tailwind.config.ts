import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  corePlugins: {
    // The site's layout still relies on the Bootstrap-based template CSS.
    // Tailwind's preflight reset would override it, so it stays disabled
    // until the template styles are fully migrated.
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
