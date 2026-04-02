import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Vercel: build chuẩn Next.js (`.next`). Không dùng `output: "export"` — tránh lỗi routes-manifest. */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
