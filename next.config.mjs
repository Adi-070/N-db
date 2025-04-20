/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // or false, depending on whether this is a permanent redirect
      },
    ];
  },
};

export default nextConfig;
