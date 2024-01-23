/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/week:id',
        destination: '/week/:id',
      },
      {
        source: '/week:id/results',
        destination: '/week/:id/results',
      },
    ];
  },
};

module.exports = nextConfig;
