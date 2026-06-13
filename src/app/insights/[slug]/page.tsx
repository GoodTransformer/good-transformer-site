import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/insights/article-header";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { RelatedPosts } from "@/components/insights/related-posts";
import { JsonLd } from "@/components/json-ld";
import { seoContent, siteConfig } from "@/content/site-content";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/insights";
import { absoluteUrl, buildBreadcrumbJsonLd, buildPageMetadata, OG_IMAGE, SITE_URL } from "@/lib/seo";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  // Assets are downloads, not articles — only written posts get a page.
  return getAllPosts()
    .filter((post) => post.type === "post")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getPostBySlug(slug);
    return buildPageMetadata({
      title: meta.title,
      description: meta.description,
      path: `/insights/${meta.slug}/`,
      image: meta.cover,
      ogType: "article",
    });
  } catch {
    return buildPageMetadata({
      title: seoContent.pages.insights.title,
      description: seoContent.pages.insights.description,
      path: "/insights/",
    });
  }
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, html } = post;
  const related = getRelatedPosts(meta.slug, meta.tags);
  const url = `${SITE_URL}/insights/${meta.slug}/`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    image: meta.cover ? absoluteUrl(meta.cover) : OG_IMAGE,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: meta.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: seoContent.siteName,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/gt-logo.png` },
    },
    keywords: meta.tags.join(", "),
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights/" },
    { name: meta.title, path: `/insights/${meta.slug}/` },
  ]);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article className="py-12 md:py-16">
        <ArticleHeader post={meta} />

        <div
          className="insight-prose mx-auto mt-12 max-w-3xl px-6 md:px-10 lg:px-12"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mx-auto mt-16 max-w-3xl px-6 md:px-10 lg:px-12">
          <div className="rounded-[1.25rem] border border-line/12 bg-sand/70 p-7 md:p-9">
            <p className="page-eyebrow text-brass">Work with Good Transformer</p>
            <p className="mt-3 max-w-xl font-serif text-2xl leading-tight text-ink md:text-3xl">
              Want this kind of thinking applied to your team?
            </p>
            <Link
              href={siteConfig.primaryCta.href}
              className="hero-nav-cta mt-6 inline-flex items-center gap-3"
              data-analytics-event="insight_cta_click"
              data-analytics-section="insight_post"
              data-analytics-label={siteConfig.primaryCta.label}
            >
              {siteConfig.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>

      <section className="section-divider bg-warm-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <NewsletterSignup />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-divider">
          <div className="mx-auto max-w-7xl py-14 md:px-10 lg:px-12 lg:py-16">
            <RelatedPosts posts={related} />
          </div>
        </section>
      ) : null}
    </>
  );
}
