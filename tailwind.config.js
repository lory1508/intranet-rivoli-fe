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
        primary: '#B10015', //CTA primari + testo CTA secondari + hover link
        accent: '#d1323e', //CTA hover + alert
        accentDark: '#7A000E', //alert enfasi + separatori
        neutralDark: '#3C3C3C', //Testo principale
        medium: '#8A8A8A', //Testo secondario
        light: '#F2F2F2',
        sections: '#E0E0E0', //CTA secondari
        sectionsHover: '#D32B2F',
        secondary: '#0066CC',
        secondaryLight: '#E1ECF6',
        darkAccent: '#1A3A5E',
      },
      zIndex: {
        top: '9999',
      },
    },
  },
  safelist: [{ pattern: /bg-./ }, { pattern: /ring-/ }, { pattern: /text-/ }],
  plugins: [],
}
