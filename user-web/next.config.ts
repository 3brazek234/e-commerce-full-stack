import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tahaapi.runasp.net", pathname: "/Products/**" },
      { protocol: "https", hostname: "tahaapi.runasp.net", pathname: "/Icons/**" }, {
        protocol: "https",
        hostname: "res.cloudinary.com", // ده الدومين بتاع كلاوديناري
        pathname: "**", // يسمح بأي مسار جوه الدومين
      },
    ],
   
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
