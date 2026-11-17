import { clientOg, ogSize } from "@/lib/og";

export const alt = "Websites for Instagram businesses, by Rounak";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return clientOg();
}
