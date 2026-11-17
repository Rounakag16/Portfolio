import { devOg, ogSize } from "@/lib/og";

export const alt = "Rounak Agarwal, full-stack developer (MERN and AI)";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return devOg();
}
