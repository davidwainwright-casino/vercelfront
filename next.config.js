/**@type {import('next').NextConfig}**/
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    //runtimeCaching,
  },
  images: {
    domains: [
      'wainwrighted.herokuapp.com',
      'win.radio.fm',
      'wainwright.cloud',
      'cdn.softswiss.net',
      'kohengroup.com',
    ],
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: false,
    },
  }),
});
