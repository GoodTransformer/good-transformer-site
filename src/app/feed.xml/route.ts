import { getAllPosts } from "@/lib/insights";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { seoContent } from "@/content/site-content";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(iso: string) {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? "" : date.toUTCString();
}

export function GET() {
  // The feed syndicates written posts; assets are downloads without a page.
  const posts = getAllPosts().filter((post) => post.type === "post");
  const feedUrl = `${SITE_URL}/feed.xml`;
  const buildDate = posts[0] ? toRfc822(posts[0].date) : "";

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/insights/${post.slug}/`;
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");
      const enclosure = post.cover
        ? `<enclosure url="${escapeXml(absoluteUrl(post.cover))}" type="image/jpeg" />`
        : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <description>${escapeXml(post.description)}</description>
      ${categories}${enclosure}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(seoContent.siteName)} — Insights</title>
    <link>${SITE_URL}/insights/</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(seoContent.pages.insights.description)}</description>
    <language>en-GB</language>
    ${buildDate ? `<lastBuildDate>${buildDate}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
