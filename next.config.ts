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
      // The resume lives on Google Drive. The old PDF path keeps working for links shared before.
      { source: "/resume", destination: "https://drive.google.com/file/d/1WYF-PS1QWcyTARXp-tPBglW8T_qC_0KW/view?usp=drive_link", permanent: false },
      { source: "/assets/ResumeRounak.pdf", destination: "https://drive.google.com/file/d/1WYF-PS1QWcyTARXp-tPBglW8T_qC_0KW/view?usp=drive_link", permanent: false },
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
