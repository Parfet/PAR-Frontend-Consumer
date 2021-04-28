const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withOffline = require('next-offline')

const nextConfig = {
  future: {
    webpack5: true,
    strictPostcssConfiguration: true
  },
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ['www.parfet.in.th'],
  },
};

module.exports = withPlugins([
  [withOffline],
  [withPWA, {
    pwa: {
      dest: 'public'
    },
  }]
], nextConfig)

