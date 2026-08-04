/**
 * Give `next dev` its own build directory.
 *
 * `next build` wipes and rewrites .next with production output. If a dev
 * server is running at the time, its webpack runtime keeps pointing at dev
 * chunk ids that no longer exist, and every route then throws
 * "Cannot find module './<id>.js'" until the dev server is restarted.
 * Separate directories mean a build can never clobber a live dev server.
 *
 * NODE_ENV is set by Next itself: `next dev` -> development,
 * `next build`/`next start` -> production. Production stays on .next so
 * Vercel and `next start` find the output where they expect it.
 *
 * Note: distDir is always resolved relative to the project root — an
 * absolute path is rejected, so this cannot be moved outside OneDrive.
 */
const distDir = process.env.NODE_ENV === "development" ? ".next-dev" : ".next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir,
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
