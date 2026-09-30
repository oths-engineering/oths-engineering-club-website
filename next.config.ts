import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const nextConfig: NextConfig = {
  turbopack: { root },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  devIndicators: false,
  allowedDevOrigins: ["*.ngrok-free.app"],
};

export default nextConfig;
