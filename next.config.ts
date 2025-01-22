import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Add other domains here if needed
  },
  /* other config options here */
};
module.exports = {
  reactStrictMode: false, // Disables React Strict Mode to stop warnings in development
  swcMinify: true, // Enable SWC minification for production
};


export default nextConfig;

