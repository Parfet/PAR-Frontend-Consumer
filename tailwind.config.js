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
      'cusLightOrange': '#FFA753',
      'cusDarkRed': '#9C4A55',
      'cusRed': '#AC3B31',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
