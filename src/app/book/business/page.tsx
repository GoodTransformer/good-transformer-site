import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { BookingForm } from "@/components/booking-form";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { bookingPage, offers, seoContent } from "@/content/site-content";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.bookBusiness);

const businessBookingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/book/business/#service`,
  name: "Business AI Advisory",
  serviceType: "Fractional AI advisory",
  provider: { "@id": SITE_URL },
  url: `${SITE_URL}/book/business/`,
  description: bookingPage.business.intro,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business advisory engagements",
    itemListElement: offers.map((offer) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: offer.name,
        description: offer.purpose,
      },
    })),
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Book a session", path: "/book/" },
  { name: "Book a business call", path: "/book/business/" },
]);

export default function BusinessBookPage() {
  return (
    <>
      <JsonLd data={businessBookingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={bookingPage.business.title} body={bookingPage.business.intro} />

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-2xl">
            <p className="text-base leading-7 text-slate md:text-lg">
              {bookingPage.business.body}
            </p>
          </AnimatedReveal>
          <AnimatedReveal className="mt-12">
            <BookingForm />
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
