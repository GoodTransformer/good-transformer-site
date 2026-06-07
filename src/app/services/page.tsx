import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedReveal } from "@/components/animated-reveal";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { lessonPricing, offers, seoContent, servicesPage } from "@/content/site-content";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.services);

const servicesPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/services/#webpage`,
  name: servicesPage.title,
  url: `${SITE_URL}/services/`,
  description: servicesPage.intro,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "OfferCatalog",
    name: "Good Transformer services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Lessons for Leaders",
          description: servicesPage.personalSection.intro,
          provider: { "@id": SITE_URL },
        },
      },
      ...offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.purpose,
          provider: { "@id": SITE_URL },
        },
      })),
    ],
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
]);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={servicesPage.title} body={servicesPage.intro} />

      {/* ── AI Lessons for Leaders ───────────────────────────────────────── */}
      <section className="section-divider bg-soft-blue">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              {servicesPage.personalSection.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate md:text-lg">
              {servicesPage.personalSection.intro}
            </p>
          </AnimatedReveal>

          <AnimatedReveal className="mt-10 grid gap-5 md:grid-cols-3">
            {lessonPricing.tiers.map((tier) => (
              <div key={tier.name} className="border-t border-line pt-5">
                <p className="page-eyebrow">{tier.duration}</p>
                <h3 className="mt-3 font-serif text-2xl leading-none text-ink">
                  {tier.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate">{tier.body}</p>
              </div>
            ))}
          </AnimatedReveal>

          <AnimatedReveal className="mt-8">
            <p className="text-sm leading-6 text-slate/70">{lessonPricing.delivery}</p>
            <Link
              href={servicesPage.personalSection.cta.href}
              className="text-link mt-6 inline-flex text-sm text-ink"
            >
              {servicesPage.personalSection.cta.label}
            </Link>
          </AnimatedReveal>
        </div>
      </section>

      {/* ── AI Advisory for Teams ────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              {servicesPage.businessSection.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate md:text-lg">
              {servicesPage.businessSection.intro}
            </p>
          </AnimatedReveal>

          <div className="mt-10 border-t border-line">
            {offers.map((offer) => (
              <AnimatedReveal
                key={offer.name}
                className="grid gap-6 border-b border-line py-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.9fr)_minmax(0,0.8fr)] lg:gap-10"
              >
                <div>
                  <p className="page-eyebrow">{offer.duration}</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">
                    {offer.name}
                  </h3>
                </div>

                <div>
                  <p className="text-base leading-7 text-slate">{offer.purpose}</p>
                  {offer.fit ? (
                    <p className="mt-4 text-sm leading-6 text-slate">{offer.fit}</p>
                  ) : null}
                </div>

                <div className="grid gap-5">
                  <ul className="space-y-3 text-sm leading-6 text-slate">
                    {offer.outputs.map((item) => (
                      <li
                        key={item}
                        className="border-b border-line pb-3 last:border-b-0 last:pb-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {offer.cadence ? (
                    <div className="text-sm leading-6 text-slate">
                      {offer.cadence.join(" / ")}
                    </div>
                  ) : null}
                </div>
              </AnimatedReveal>
            ))}
          </div>

          <AnimatedReveal className="mt-8 text-sm leading-6 text-slate">
            {servicesPage.close}
          </AnimatedReveal>
        </div>
      </section>

      {/* ── 90-day arc ───────────────────────────────────────────────────── */}
      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              A simple 90-day arc.
            </h2>
          </AnimatedReveal>

          <div className="mt-10 border-t border-line">
            {servicesPage.sampleArc.map((item) => (
              <AnimatedReveal
                key={item.phase}
                className="grid gap-4 border-b border-line py-6 lg:grid-cols-[180px_minmax(0,1fr)]"
              >
                <p className="page-eyebrow">{item.phase}</p>
                <p className="max-w-3xl text-base leading-7 text-slate">{item.body}</p>
              </AnimatedReveal>
            ))}
          </div>

          <AnimatedReveal className="mt-10">
            <Link
              href={servicesPage.businessSection.cta.href}
              className="text-link text-sm text-ink"
            >
              {servicesPage.businessSection.cta.label}
            </Link>
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
