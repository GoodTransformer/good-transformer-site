/**
 * Browser-safe Insights helpers and types.
 *
 * This module must stay free of Node built-ins (fs/path) so it can be imported
 * by client components. The filesystem-backed reading/rendering lives in
 * `insights.ts`, which re-exports the types and formatters from here.
 */

export type PostType = "post" | "asset";
export type PostVoice = "brand" | "patrick";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string
  updated?: string;
  author: string;
  voice: PostVoice;
  type: PostType;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  /** Social / OG share card (title baked in). Used for og:image only, never
   *  rendered on-site. Set when a sibling social.jpg exists next to the cover. */
  social?: string;
  featured: boolean;
  readingMinutes: number;
  readingLabel: string; // e.g. "5 min read"
  // asset-only
  assetFile?: string;
  assetFormat?: string;
  assetCta?: string;
};

export type TagCount = {
  tag: string;
  count: number;
};

/** "13 June 2026": matches the site's en-GB voice. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Turn a tag slug into a readable label: "ai-adoption" -> "AI adoption". */
export function formatTag(tag: string): string {
  const spaced = tag.replace(/-/g, " ");
  return spaced.replace(/\bai\b/gi, "AI").replace(/^./, (c) => c.toUpperCase());
}
