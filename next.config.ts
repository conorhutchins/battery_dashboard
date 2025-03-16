import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Explicitly disable Babel for Next.js
  compiler: {
    // This will be used when Turbopack is enabled
    // It configures SWC to handle the features you need
    styledComponents: false, // Enable if you use styled-components
    emotion: false, // Enable if you use emotion
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production',
  }
};

export default nextConfig;
