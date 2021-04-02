const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withOffline = require('next-offline')

module.exports = withPlugins([
  [withOffline],
  [withPWA, {
    pwa: {
      dest: 'public'
    },
  }]
])
