module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './pages/*.tsx',
    './pages/**/*.tsx',
    './core/**/*.tsx',
    './features/**/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'cusGreen': '#62DE81',
      'cusPink': '#F9BEBA',
      'cusLightYellow': '#FFF0A4',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
