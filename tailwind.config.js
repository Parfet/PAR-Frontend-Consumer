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
  important: true,
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'cusGreen': '#62DE81',
      'cusPink': '#F9BEBA',
      'cusLightYellow': '#FFF0A4',
      'cusRegularYellow': '#FFCA62',
      'cusYellow': '#FFD700',
      'cusDarkYellow': '#F4B740',
      'cusLightOrange': '#FFA753',
      'cusDarkRed': '#9C4A55',
      'cusRed': '#AC3B31',
      'cusBrown': '#AC5B31',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'cusYellow': '#FFD700',
      'cusLightOrange': '#FFA753',
      'cusDarkRed': '#9C4A55',
      'cusBrown': '#AC5B31',
    }),
    borderRadius: {
      '5': '5px',
      '25': '25px',
      '30': '30px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
