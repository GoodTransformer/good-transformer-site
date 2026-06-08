import Link from "next/link";
import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { ServiceContactPrompt } from "@/components/service-contact-prompt";
import { bookingPage, seoContent, siteConfig } from "@/content/site-content";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.book);

const bookingPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/book/#webpage`,
  name: bookingPage.title,
  url: `${SITE_URL}/book/`,
  description: bookingPage.intro,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Book a session", path: "/book/" },
]);

export default function BookPage() {
  return (
    <>
      <JsonLd data={bookingPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={bookingPage.title} body={bookingPage.intro} />

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-2xl">
            <p className="text-base leading-7 text-slate md:text-lg">
              {bookingPage.body}
            </p>
            <ServiceContactPrompt className="mt-6" />
          </AnimatedReveal>

          <AnimatedReveal className="mt-10 grid gap-5 md:grid-cols-2">
            <Link href="/book/personal" className="booking-choice booking-choice--light">
              <span>For leaders</span>
              <strong>{siteConfig.personalCta.label}</strong>
              <small>{bookingPage.personal.routeSummary}</small>
            </Link>
            <Link href="/book/business" className="booking-choice booking-choice--dark">
              <span>For businesses</span>
              <strong>{siteConfig.businessCta.label}</strong>
              <small>{bookingPage.business.routeSummary}</small>
            </Link>
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
