import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // allow any image host
      },
      {
        protocol: 'https',
        hostname: '**', // allow any image host
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
