/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
      },
      {
        source: "/fruit-api/:path*",
        destination: "https://www.fruityvice.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
