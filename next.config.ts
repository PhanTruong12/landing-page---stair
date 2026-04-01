import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Xuất static HTML — deploy giống bản Vite (CDN, S3, Pages…) */
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
