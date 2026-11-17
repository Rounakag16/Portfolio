import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// OG images are rendered at build time, so the brand font can be read straight from node_modules.
async function fonts() {
  const dir = join(process.cwd(), "node_modules/@fontsource/poppins/files");
  const [medium, bold] = await Promise.all([
    readFile(join(dir, "poppins-latin-500-normal.woff")),
    readFile(join(dir, "poppins-latin-700-normal.woff")),
  ]);
  return [
    { name: "Poppins", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Poppins", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

export const ogSize = { width: 1200, height: 630 };

/** Link-preview card for WhatsApp, LinkedIn and X: a received DM answered by the site. */
export async function clientOg() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, padding: "70px 80px", background: "#fff7ed", color: "#1c1917", fontFamily: "Poppins" }}>
        <div style={{ display: "flex", alignSelf: "flex-start", background: "#ffffff", border: "2px solid #e7e5e4", borderRadius: "28px 28px 28px 6px", padding: "18px 28px", fontSize: 38, color: "#44403c" }}>
          menu send karo? open today??
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignSelf: "flex-end", background: "#f97316", borderRadius: "36px 36px 6px 36px", padding: "34px 44px", maxWidth: 900 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1 }}>Websites for Instagram businesses</div>
          <div style={{ fontSize: 32, marginTop: 14 }}>Menus, prices and orders in one link. Fewer DMs.</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>rounak.tech</div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}

export async function devOg() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "#1c1917", color: "#fff7ed", fontFamily: "Poppins" }}>
        <div style={{ fontSize: 34, color: "#14b8a6" }}>Open to full-time roles and internships</div>
        <div style={{ fontSize: 92, fontWeight: 700, marginTop: 18 }}>Rounak Agarwal</div>
        <div style={{ fontSize: 42, marginTop: 14, color: "#fed7aa" }}>Full-stack developer, MERN and AI</div>
        <div style={{ display: "flex", gap: 18, marginTop: 50, fontSize: 28 }}>
          <div style={{ display: "flex", background: "#f97316", color: "#1c1917", borderRadius: 999, padding: "10px 26px", fontWeight: 700 }}>rounak.tech/dev</div>
          <div style={{ display: "flex", border: "2px solid #57534e", borderRadius: 999, padding: "10px 26px" }}>VIT Vellore</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
