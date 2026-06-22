import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { JsonLd } from "@/components/json-ld";
import { PersonalBookingForm } from "@/components/booking-form";
import { PageIntro } from "@/components/page-intro";
import { bookingPage, lessonFormats, seoContent } from "@/content/site-content";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.bookPersonal);

const personalBookingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/book/personal/#service`,
  name: "AI Lessons for Leaders",
  serviceType: "One-to-one AI coaching",
  provider: { "@id": SITE_URL },
  url: `${SITE_URL}/book/personal/`,
  description: bookingPage.personal.intro,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Personal AI lesson formats",
    itemListElement: lessonFormats.formats.map((format) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: format.name,
        description: format.body,
        provider: { "@id": SITE_URL },
      },
    })),
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Book a session", path: "/book/" },
  { name: "AI Lessons for Leaders", path: "/book/personal/" },
]);

export default function PersonalBookPage() {
  return (
    <>
      <JsonLd data={personalBookingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={bookingPage.personal.title} body={bookingPage.personal.intro} />

      {/* ── What you get ─────────────────────────────────────────────────── */}
      <section className="section-divider bg-soft-blue">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-2xl">
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
              {lessonFormats.heading}
            </h2>
          </AnimatedReveal>

          <AnimatedReveal className="mt-8 grid gap-5 md:grid-cols-3">
            {lessonFormats.formats.map((format) => (
              <div key={format.name} className="border-t border-line pt-5">
                <p className="page-eyebrow">{format.stage}</p>
                <h3 className="mt-3 font-serif text-[2rem] leading-tight text-ink">
                  {format.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate">{format.body}</p>
              </div>
            ))}
          </AnimatedReveal>

          <AnimatedReveal className="mt-8">
            <p className="text-sm leading-6 text-slate/70">{lessonFormats.delivery}</p>
          </AnimatedReveal>
        </div>
      </section>

      {/* ── Booking form ─────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-2xl">
            <p className="text-base leading-7 text-slate md:text-lg">
              {bookingPage.personal.body}
            </p>
          </AnimatedReveal>
          <AnimatedReveal className="mt-12">
            <PersonalBookingForm />
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
