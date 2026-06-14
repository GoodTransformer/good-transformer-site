import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import type { PostMeta, PostType, PostVoice, TagCount } from "./insights-shared";

export type { PostMeta, PostType, TagCount } from "./insights-shared";
export { formatDate, formatTag } from "./insights-shared";

/**
 * Insights content layer.
 *
 * Posts live as Markdown files in `content/insights/*.md`. Each file carries
 * frontmatter (see content/insights/CONTRACT.md) and a Markdown body. Everything
 * is read and rendered at build time, so there is no runtime cost in the
 * static export.
 *
 * This module is the single source of truth for the section: the index page,
 * the post pages, the RSS feed, the sitemap, and the validation script all read
 * through these helpers.
 */

const CONTENT_DIR = join(process.cwd(), "content", "insights");
// Posts are published under the brand, not a personal byline.
const DEFAULT_AUTHOR = "Good Transformer";

// Docs that live alongside the content but are not posts.
const IGNORED_FILES = new Set(["CONTRACT.md", "README.md"]);

function isMarkdownFile(filename: string) {
  return filename.endsWith(".md") && !filename.startsWith("_") && !IGNORED_FILES.has(filename);
}

/** Coerce a frontmatter date (YAML may parse it as a Date) to a YYYY-MM-DD string. */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim()) {
    return value.trim().slice(0, 10);
  }
  return "";
}

function toTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function readRaw(slug: string) {
  const fullPath = join(CONTENT_DIR, `${slug}.md`);
  const file = readFileSync(fullPath, "utf8");
  return matter(file);
}

function buildMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  const stats = readingTime(content);
  const type: PostType = data.type === "asset" ? "asset" : "post";
  const voice: PostVoice = data.voice === "patrick" ? "patrick" : "brand";

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: toIsoDate(data.date),
    updated: data.updated ? toIsoDate(data.updated) : undefined,
    author: String(data.author ?? DEFAULT_AUTHOR),
    voice,
    type,
    tags: toTags(data.tags),
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    featured: data.featured === true,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    readingLabel: `${Math.max(1, Math.round(stats.minutes))} min read`,
    assetFile: data.assetFile ? String(data.assetFile) : undefined,
    assetFormat: data.assetFormat ? String(data.assetFormat) : undefined,
    assetCta: data.assetCta ? String(data.assetCta) : undefined,
  };
}

/** Every published post + asset, newest first. Drafts are excluded. */
export function getAllPosts(): PostMeta[] {
  let filenames: string[];
  try {
    filenames = readdirSync(CONTENT_DIR);
  } catch {
    return [];
  }

  return filenames
    .filter(isMarkdownFile)
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const { data, content } = readRaw(slug);
      return { meta: buildMeta(slug, data, content), draft: data.draft === true };
    })
    .filter((entry) => !entry.draft)
    .map((entry) => entry.meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/**
 * Open external links in a new tab so readers never lose the Good Transformer
 * site. In-page heading anchors (#...) and internal links (/...) stay in the
 * same tab — they keep the reader on the site, so a new tab would only clutter.
 */
function rehypeExternalLinksNewTab() {
  return (tree: unknown) => {
    const visit = (node: any) => {
      if (
        node?.type === "element" &&
        node.tagName === "a" &&
        typeof node.properties?.href === "string" &&
        /^(https?:)?\/\//.test(node.properties.href)
      ) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
      }
      if (Array.isArray(node?.children)) {
        for (const child of node.children) visit(child);
      }
    };
    visit(tree);
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "wrap",
    properties: { className: "insight-prose__anchor" },
  })
  .use(rehypeExternalLinksNewTab)
  .use(rehypeStringify);

/** A single post with its body rendered to an HTML string. */
export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; html: string }> {
  const { data, content } = readRaw(slug);
  const meta = buildMeta(slug, data, content);
  const file = await processor.process(content);
  return { meta, html: String(file) };
}

export function getAllTags(): TagCount[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Up to `limit` posts that share a tag with the given post (excludes itself and assets). */
export function getRelatedPosts(slug: string, tags: string[], limit = 2): PostMeta[] {
  const tagSet = new Set(tags);
  return getAllPosts()
    .filter((post) => post.slug !== slug && post.type === "post")
    .map((post) => ({
      post,
      overlap: post.tags.filter((tag) => tagSet.has(tag)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((entry) => entry.post);
}
