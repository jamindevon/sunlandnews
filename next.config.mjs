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
};

export default nextConfig;
