/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sustain-a-meal.willfp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  experimental: {
    // Fixes Clerk before PR is merged
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig;

