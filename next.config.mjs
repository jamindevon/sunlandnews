/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.sunlandnews.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'admin.sunlandnews.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/calendars/:category.ics',
        destination: '/calendars/:category',
      },
      {
        source: '/cal/:token.ics',
        destination: '/cal/:token',
      },
    ];
  },
};

export default nextConfig;
