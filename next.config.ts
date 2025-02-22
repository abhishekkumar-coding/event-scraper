import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ["img.evbuc.com", "cdn.evbuc.com"], // Add allowed domains
  },
};

export default nextConfig;
