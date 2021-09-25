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
    domains: [
      'www.parfet.in.th', 
      'graph.facebook.com', 
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'maps.googleapis.com'
    ],
  },
};

module.exports = withPlugins([
  [withOffline],
  [withPWA, {
    pwa: {
      // disable: process.env.NODE_ENV === 'development',
      dest: 'public',
      register: true,
      scope: '/app',
      sw: 'service-worker.js',
    },
  }]
], nextConfig)