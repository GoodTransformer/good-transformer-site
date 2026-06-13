import type { Metadata } from "next";
import Link from "next/link";

import { FAQList } from "@/components/faq-list";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";
import { PostCard } from "@/components/insights/post-card";
import { JsonLd } from "@/components/json-ld";
import { newsletterPage, seoContent } from "@/content/site-content";
import { getAllPosts } from "@/lib/insights";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.newsletter);

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/newsletter/#webpage`,
  name: seoContent.pages.newsletter.title,
  url: `${SITE_URL}/newsletter/`,
  description: seoContent.pages.newsletter.description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Newsletter", path: "/newsletter/" },
]);

export default function NewsletterPage() {
  const recentPosts = getAllPosts()
    .filter((post) => post.type === "post")
    .slice(0, 3);

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Hero: value proposition on the left, the signup form near the top on the right. */}
      <section className="page-intro">
        <div className="mx-auto max-w-7xl px-6 pb-12 md:px-10 md:pb-16 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <div className="max-w-2xl">
              <p className="page-eyebrow text-brass">{newsletterPage.eyebrow}</p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
                {newsletterPage.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-slate md:text-lg">
                {newsletterPage.intro}
              </p>
            </div>
            <div className="lg:pt-1">
              <NewsletterSignup
                heading={newsletterPage.form.heading}
                body={newsletterPage.form.body}
                analyticsSection="newsletter_page"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="page-eyebrow text-brass">{newsletterPage.inside.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">
              {newsletterPage.inside.heading}
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {newsletterPage.inside.items.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <h3 className="font-serif text-xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent issues preview: live posts so the page never reads as a static template. */}
      {recentPosts.length > 0 ? (
        <section className="section-divider bg-warm-paper">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
            <div className="max-w-2xl">
              <p className="page-eyebrow text-brass">{newsletterPage.recent.eyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">
                {newsletterPage.recent.heading}
              </h2>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <p className="mt-10">
              <Link href="/insights" className="hero-nav-cta inline-flex items-center gap-3">
                Browse all Insights
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
              Before you subscribe.
            </h2>
          </div>
          <div className="mt-10">
            <FAQList items={newsletterPage.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
