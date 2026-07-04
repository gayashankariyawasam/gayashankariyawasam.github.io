import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    // GitHub Pages caps Cache-Control at 10 minutes, so external stylesheets
    // barely cache anyway — inlining removes the render-blocking request.
    inlineCss: true,
  },
};

export default nextConfig;
