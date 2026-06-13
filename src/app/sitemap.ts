import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/insights";

const BASE = "https://goodtransformer.ai";
const LAST_MODIFIED = "2026-06-13T00:00:00.000Z";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Assets are downloads without their own page; only written posts get a URL.
  const insights = getAllPosts().filter((post) => post.type === "post");
  const insightEntries: MetadataRoute.Sitemap = insights.map((post) => ({
    url: `${BASE}/insights/${post.slug}/`,
    lastModified: post.updated
      ? `${post.updated}T00:00:00.000Z`
      : post.date
        ? `${post.date}T00:00:00.000Z`
        : LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: `${BASE}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/services/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services/ai-lessons-for-leaders/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/services/ai-advisory-for-teams/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/insights/`,
      lastModified: insights[0]?.date ? `${insights[0].date}T00:00:00.000Z` : LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...insightEntries,
    {
      url: `${BASE}/newsletter/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE}/patrick/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/about/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/book/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/book/personal/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/book/business/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
