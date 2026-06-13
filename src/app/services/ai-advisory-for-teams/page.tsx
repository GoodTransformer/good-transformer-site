import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedReveal } from "@/components/animated-reveal";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import {
  offers,
  operatingModel,
  seoContent,
  servicesPage,
  teamAdvisoryPage,
} from "@/content/site-content";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.teamAdvisory);

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/ai-advisory-for-teams/#service`,
  name: teamAdvisoryPage.title,
  description: teamAdvisoryPage.intro,
  provider: { "@id": SITE_URL },
  areaServed: "GB",
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
  { name: teamAdvisoryPage.title, path: "/services/ai-advisory-for-teams/" },
]);

export default function TeamAdvisoryPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={teamAdvisoryPage.title} body={teamAdvisoryPage.intro} />

      <section className="section-divider bg-soft-blue">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <div>
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                {teamAdvisoryPage.fit.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
                {teamAdvisoryPage.fit.intro}
              </p>
            </div>
            <ul className="grid gap-4 border-t border-line/10 pt-6 text-sm leading-6 text-slate md:grid-cols-2">
              {teamAdvisoryPage.fit.points.map((point) => (
                <li key={point} className="border-b border-line/10 pb-4">
                  {point}
                </li>
              ))}
            </ul>
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              {teamAdvisoryPage.operating.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
              {teamAdvisoryPage.operating.intro}
            </p>
          </AnimatedReveal>

          <AnimatedReveal className="mt-10 grid gap-6 md:grid-cols-3">
            {operatingModel.map((item) => (
              <div key={item.name} className="border-t border-line pt-5">
                <p className="page-eyebrow">{item.name}</p>
                <p className="mt-4 text-base leading-7 text-slate">{item.line}</p>
              </div>
            ))}
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-divider bg-warm-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              {teamAdvisoryPage.offerSection.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
              {teamAdvisoryPage.offerSection.intro}
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
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              {teamAdvisoryPage.arcSection.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
              {teamAdvisoryPage.arcSection.intro}
            </p>
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
        </div>
      </section>

      <section className="section-divider bg-soft-blue">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <AnimatedReveal>
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
              Start with the smallest credible next step.
            </h2>
          </AnimatedReveal>
          <AnimatedReveal className="flex flex-wrap gap-3">
            <Link
              href={teamAdvisoryPage.heroCta.href}
              className="hero-nav-cta inline-flex items-center gap-3"
              data-analytics-event="service_cta_click"
              data-analytics-section="team_advisory_final_cta"
              data-analytics-label={teamAdvisoryPage.heroCta.label}
            >
              {teamAdvisoryPage.heroCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            {teamAdvisoryPage.secondaryCta ? (
              <Link
                href={teamAdvisoryPage.secondaryCta.href}
                className="text-link inline-flex items-center text-sm text-ink"
                data-analytics-event="service_cta_click"
                data-analytics-section="team_advisory_final_cta"
                data-analytics-label={teamAdvisoryPage.secondaryCta.label}
              >
                {teamAdvisoryPage.secondaryCta.label}
              </Link>
            ) : null}
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
