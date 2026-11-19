import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { site } from "@/content/site";
import { RevealObserver } from "@/components/RevealObserver";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
