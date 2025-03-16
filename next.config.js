/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Explicitly disable Babel for Next.js
  compiler: {
    // This will be used when Turbopack is enabled
    // It configures SWC to handle the features you need
    styledComponents: false, // Enable if you use styled-components
    emotion: false, // Enable if you use emotion
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Customize webpack for tailwind v4
  webpack: (config) => {
    return config;
  },
  // Add experimental features if needed
  experimental: {
    // Add any experimental features here
  }
};

module.exports = nextConfig; 