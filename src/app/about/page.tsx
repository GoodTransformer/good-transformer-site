import Link from "next/link";
import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { aboutPage, seoContent, siteConfig } from "@/content/site-content";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.about);

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about/#webpage`,
  name: aboutPage.title,
  url: `${SITE_URL}/about/`,
  description: aboutPage.intro,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": SITE_URL },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={aboutPage.title} body={aboutPage.intro} />

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-14">

            {/* Top-left: Where I come from */}
            <AnimatedReveal className="about-cell">
              <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
                {aboutPage.background.heading}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate md:text-lg">
                {aboutPage.background.body}
              </p>
            </AnimatedReveal>

            {/* Top-right: Where I think we are */}
            <AnimatedReveal className="about-cell">
              <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
                {aboutPage.ethics.heading}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate md:text-lg">
                {aboutPage.ethics.body}
              </p>
            </AnimatedReveal>

            {/* Bottom-left: Talks */}
            <AnimatedReveal className="about-cell border-t border-line pt-10">
              <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
                {aboutPage.talks.heading}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate md:text-lg">
                {aboutPage.talks.body}
              </p>
              <Link
                href={siteConfig.primaryCta.href}
                className="text-link mt-7 inline-flex text-sm text-ink"
              >
                Get in touch →
              </Link>
            </AnimatedReveal>

            {/* Bottom-right: Why Good Transformer? */}
            <AnimatedReveal className="about-cell border-t border-line pt-10">
              <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
                {aboutPage.name.heading}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate md:text-lg">
                {aboutPage.name.body}
              </p>
            </AnimatedReveal>

          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="section-divider bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-paper md:text-5xl">
              Start with whichever route fits.
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={siteConfig.personalCta.href} className="button-light">
                {siteConfig.personalCta.label}
              </Link>
              <Link href={siteConfig.businessCta.href} className="button-ghost-light">
                {siteConfig.businessCta.label}
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
