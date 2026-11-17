import { site } from "@/content/site";

export type DevtoPost = {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  cover_image: string | null;
  tag_list: string[] | string;
};

/**
 * Published dev.to posts. With DEVTO_API_KEY set, the authenticated endpoint is used:
 * it also lists posts that dev.to holds back from the public listing (same reason as the old Netlify function).
 * Results are cached and refreshed hourly.
 */
export async function getDevtoPosts(): Promise<DevtoPost[]> {
  const key = process.env.DEVTO_API_KEY;
  const url = key
    ? "https://dev.to/api/articles/me/published?per_page=30"
    : `https://dev.to/api/articles?username=${site.devto.username}&per_page=30`;
  try {
    const res = await fetch(url, {
      headers: key ? { "api-key": key } : undefined,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return (await res.json()) as DevtoPost[];
  } catch {
    return [];
  }
}
