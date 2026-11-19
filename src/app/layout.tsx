import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { site } from "@/content/site";
import { RevealObserver } from "@/components/RevealObserver";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.shortName}` },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <RevealObserver />
        {/* Vercel Analytics only works on Vercel; on Netlify its script would 404 on every page. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
