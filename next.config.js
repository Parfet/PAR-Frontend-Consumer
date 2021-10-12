const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withOffline = require('next-offline')

const nextConfig = {
  future: {
    strictPostcssConfiguration: true
  },
  webpack5: true,
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: [
      'www.parfet.in.th', 
      'graph.facebook.com', 
      'storage.googleapis.com',
      'maps.gstatic.com',
      'maps.googleapis.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'pbs.twimg.com',
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