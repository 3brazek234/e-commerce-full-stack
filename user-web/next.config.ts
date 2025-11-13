import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tahaapi.runasp.net", pathname: "/Products/**" },
      { protocol: "https", hostname: "tahaapi.runasp.net", pathname: "/Icons/**" }, // لو عندك أيقونات
    ],
    // أو ببساطة ممكن:
    // domains: ["tahaapi.runasp.net"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tahaapi.runasp.net/api/:path*", // بروكسي للـ API
      },
    ];
  },
};

export default nextConfig;
