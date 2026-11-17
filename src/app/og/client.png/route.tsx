import { clientOg } from "@/lib/og";

// Share card for client pages, at a fixed URL so every page's metadata can point at it (see lib/seo.ts).
export const dynamic = "force-static";

export async function GET() {
  return clientOg();
}
