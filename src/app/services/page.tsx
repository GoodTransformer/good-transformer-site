import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedReveal } from "@/components/animated-reveal";
import { PageIntro } from "@/components/page-intro";
import { lessonPricing, offers, servicesPage } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Personal AI lessons for individuals and fractional advisory for teams. Three engagement tiers: AI Reality Check Sprint, 90-Day Adoption Build, and Fractional Retainer.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro title={servicesPage.title} body={servicesPage.intro} />

      {/* ── Personal AI lessons ──────────────────────────────────────────── */}
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
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif text-[2rem] leading-none text-ink">
                    {tier.price}
                  </span>
                  <span className="font-serif text-xl leading-none text-ink/50">/</span>
                  <span className="text-sm text-ink/60">{tier.name}</span>
                </div>
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

      {/* ── Business AI advisory ─────────────────────────────────────────── */}
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
