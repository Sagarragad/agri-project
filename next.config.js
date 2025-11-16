/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // For static export or if you want to optimize manually
    domains: [],
  },
  // Enable static export if needed
  // output: 'export',
}

module.exports = nextConfig

