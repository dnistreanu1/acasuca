import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
