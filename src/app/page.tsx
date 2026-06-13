import Link from "next/link";

import { AnimatedReveal } from "@/components/animated-reveal";
import { ArtefactDeck } from "@/components/artefact-deck";
import { ClientLogoStrip } from "@/components/client-logo-strip";
import { FAQList } from "@/components/faq-list";
import { HomeHero } from "@/components/home-hero";
import { JsonLd } from "@/components/json-ld";
import {
  homePage,
  lessonOffers,
  offers,
  proofSignals,
  siteConfig,
  testimonial,
} from "@/content/site-content";
import { publicBasePath } from "@/lib/public-base-path";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homePage.faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  name: "Good Transformer",
  url: SITE_URL,
  description: homePage.hero.support,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/patrick/` },
  primaryImageOfPage: OG_IMAGE,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageJsonLd} />
      <JsonLd data={faqJsonLd} />

      <HomeHero
        title={homePage.hero.title}
        descriptor={homePage.hero.descriptor}
        support={homePage.hero.support}
        routes={homePage.hero.routes}
        signals={homePage.hero.signals}
      />

      <section className="section-divider bg-soft-blue">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
            <AnimatedReveal className="lg:pt-[3.55rem]">
              <h2 className="max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
                {homePage.role.heading}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate md:text-lg">
                {homePage.role.support}
              </p>
            </AnimatedReveal>

            <AnimatedReveal className="grid gap-8 md:grid-cols-2">
              {lessonOffers.map((offer) => (
                <article key={offer.name} className="offer-panel">
                  <p className="page-eyebrow">{offer.label}</p>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-4xl">
                    {offer.name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate">
                    {offer.purpose}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-slate">
                    {offer.points.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={offer.href} className="text-link mt-7 inline-flex text-sm text-ink">
                    {offer.label === "For leaders" ? "Book a 1-to-1 discovery call" : "Book a business discovery call"}
                  </Link>
                </article>
              ))}
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <section className="section-divider roadmap-section">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              Understand AI without losing weeks to figuring it out.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
              You don’t have time to learn AI from scratch. A coach does it with you, building the practical AI skills to use today, plus the strategic view to lead your business with AI.
            </p>
          </AnimatedReveal>

          <AnimatedReveal className="mt-12 grid gap-5 md:grid-cols-5">
            {["Learn", "Explore", "Practice", "Adopt", "Scale"].map((step, index) => (
              <div key={step} className="roadmap-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
                <p>
                  {[
                    "Build fluency and confidence.",
                    "Try ideas and tools safely.",
                    "Apply AI to real work.",
                    "Embed it in your habits.",
                    "Drive impact and growth.",
                  ][index]}
                </p>
              </div>
            ))}
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              In around 90 days, turn scattered AI into how your team works.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate md:text-lg">
              I join your team as a fractional AI adviser. The core is a 90-day build that turns scattered AI into real working practice. Start with a sprint, or stay on a retainer.
            </p>
          </AnimatedReveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {offers.map((offer) => (
              <AnimatedReveal key={offer.name} className="border-t border-line pt-5">
                <p className="page-eyebrow">{offer.duration}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">
                  {offer.name}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-7 text-slate">
                  {offer.purpose}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-slate">
                  {offer.outputs.map((item) => (
                    <li key={item} className="border-b border-line pb-3 last:border-b-0 last:pb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider bg-warm-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-[4.75rem] lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-start lg:gap-16 xl:gap-20">
            <AnimatedReveal className="max-w-lg">
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                {homePage.patrick.heading}
              </h2>
              <p className="mt-5 max-w-[29rem] text-base leading-7 text-slate md:text-lg">
                {homePage.patrick.body}
              </p>
              <Link href="/patrick" className="text-link mt-7 text-sm text-ink">
                More on Patrick
              </Link>
            </AnimatedReveal>

            <AnimatedReveal className="max-w-[42rem] lg:justify-self-end">
              <blockquote className="max-w-[34rem]">
                <p className="font-serif text-[clamp(2rem,4vw,3.35rem)] leading-[1.04] text-ink">
                  “{testimonial.quote}”
                </p>
                <footer className="mt-4 text-sm text-slate">
                  {testimonial.attribution}
                </footer>
              </blockquote>

              <div className="mt-8 max-w-[30rem]">
                <p className="page-eyebrow text-ink/54">{proofSignals.label}</p>
                <div className="mt-5">
                  <ClientLogoStrip
                    items={proofSignals.organisations}
                    assetBasePath={publicBasePath}
                  />
                </div>
              </div>
            </AnimatedReveal>
          </div>

          <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1.34fr)] lg:items-start lg:gap-14 xl:gap-20">
            <AnimatedReveal className="max-w-sm lg:pt-8">
              <p className="page-eyebrow">{homePage.patrick.frame.label}</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-[2.2rem]">
                {homePage.patrick.frame.heading}
              </h3>
              <p className="mt-5 max-w-[23rem] text-sm leading-7 text-slate md:text-base">
                {homePage.patrick.frame.body}
              </p>
            </AnimatedReveal>

            <AnimatedReveal>
              <ArtefactDeck items={proofSignals.artefacts} />
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              Questions that usually come up.
            </h2>
          </AnimatedReveal>
          <AnimatedReveal className="mt-12">
            <FAQList items={homePage.faqs} />
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-divider bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
          <AnimatedReveal className="max-w-4xl">
            <h2 className="font-serif text-4xl leading-tight text-paper md:text-6xl">
              {homePage.finalCta.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-paper/74 md:text-lg">
              {homePage.finalCta.body}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
