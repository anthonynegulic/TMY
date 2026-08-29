import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
        // `search` is deliberately unset: the image URLs we build carry
        // ?w=…&fit=max&auto=format, and pinning search to "" would reject them.
      },
    ],
  },
};

export default nextConfig;
