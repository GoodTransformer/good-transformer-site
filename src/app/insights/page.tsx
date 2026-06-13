import type { Metadata } from "next";

import { InsightsGrid } from "@/components/insights/insights-grid";
import { JsonLd } from "@/components/json-ld";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { PageIntro } from "@/components/page-intro";
import { insightsPage, seoContent } from "@/content/site-content";
import { getAllPosts, getAllTags } from "@/lib/insights";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.insights);

export default function InsightsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/insights/#webpage`,
    name: seoContent.pages.insights.title,
    url: `${SITE_URL}/insights/`,
    description: seoContent.pages.insights.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    hasPart: posts
      .filter((post) => post.type === "post")
      .map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${SITE_URL}/insights/${post.slug}/`,
        author: { "@type": "Organization", name: post.author },
      })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights/" },
  ]);

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={insightsPage.title} body={insightsPage.intro} />

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          {posts.length > 0 ? (
            <InsightsGrid posts={posts} tags={tags} />
          ) : (
            <p className="text-base leading-7 text-slate">
              The first Insights are on their way. Check back shortly.
            </p>
          )}
        </div>
      </section>

      <section className="section-divider bg-warm-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
