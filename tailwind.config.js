/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B10015',
        primaryLight: '#FFBFBF',
        secondary: '#0066CC',
        secondaryLight: '#E1ECF6',
        lightAccent: '#F7D9D6',
        darkAccent: '#1A3A5E',
        neutralLight: '#F6F6F6',
        neutralDark: '#3C3C3C',
      },
    },
  },
  plugins: [],
}
