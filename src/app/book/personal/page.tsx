import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { JsonLd } from "@/components/json-ld";
import { PersonalBookingForm } from "@/components/booking-form";
import { PageIntro } from "@/components/page-intro";
import { bookingPage, lessonPricing, seoContent } from "@/content/site-content";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.bookPersonal);

function extractNumericPrice(value: string) {
  const match = value.match(/\d+/);
  return match?.[0];
}

const personalBookingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/book/personal/#service`,
  name: "Personal AI Lessons",
  serviceType: "One-to-one AI coaching",
  provider: { "@id": SITE_URL },
  url: `${SITE_URL}/book/personal/`,
  description: bookingPage.personal.intro,
  offers: lessonPricing.tiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    price: extractNumericPrice(tier.price),
    priceCurrency: "GBP",
    description: tier.body,
  })),
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Book a session", path: "/book/" },
  { name: "Book a personal AI lesson", path: "/book/personal/" },
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
              {lessonPricing.heading}
            </h2>
          </AnimatedReveal>

          <AnimatedReveal className="mt-8 grid gap-5 md:grid-cols-3">
            {lessonPricing.tiers.map((tier) => (
              <div key={tier.name} className="border-t border-line pt-5">
                <p className="page-eyebrow">{tier.duration}</p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif text-[2rem] leading-none text-ink">
                    {tier.price}
                  </span>
                  <span className="text-sm text-ink/60">{tier.name}</span>
                </div>
                <p className="mt-4 text-base leading-7 text-slate">{tier.body}</p>
              </div>
            ))}
          </AnimatedReveal>

          <AnimatedReveal className="mt-8">
            <p className="text-sm leading-6 text-slate/70">{lessonPricing.delivery}</p>
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
