/** @type {import('next').NextConfig} */

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  reactstrictmode: false,
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,

  // test
  // workboxPluginMode: 'GenerateSW',

  workboxOptions: {
    disableDevLogs: true,
    // exclude: [/\.map$/, /_redirects/],
  },
});

const nextConfig = {};

export default withPWA({
  nextConfig,
});
