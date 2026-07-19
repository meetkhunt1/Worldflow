/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.spoiledchild.com" },
      { protocol: "https", hostname: "files.ilmakiage.com" },
      { protocol: "https", hostname: "prod-influencer-profile-images.ilmakiage.com" },
      { protocol: "https", hostname: "s3.amazonaws.com" },
    ],
  },
};
module.exports = nextConfig;
