import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Old static-site URLs keep their search ranking and any shared links.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/patents.html", destination: "/dev/patents", permanent: true },
      { source: "/resume", destination: "/assets/ResumeRounak.pdf", permanent: false },
    ];
  },
  // Same security headers the Netlify site sent, plus a referrer policy.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
