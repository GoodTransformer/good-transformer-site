import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { AnimatedReveal } from "@/components/animated-reveal";
import { ClientLogoStrip } from "@/components/client-logo-strip";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import {
  leaderLessonsPage,
  lessonFormats,
  proofSignals,
  seoContent,
  testimonial,
} from "@/content/site-content";
import { publicBasePath } from "@/lib/public-base-path";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.leaderLessons);

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/ai-lessons-for-leaders/#service`,
  name: leaderLessonsPage.title,
  description: leaderLessonsPage.intro,
  provider: { "@id": SITE_URL },
  areaServed: "GB",
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
  { name: leaderLessonsPage.title, path: "/services/ai-lessons-for-leaders/" },
]);

export default function LeaderLessonsPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <PageIntro title={leaderLessonsPage.title} body={leaderLessonsPage.intro} />

      <section className="section-divider bg-soft-blue">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:items-start">
            <div>
              <p className="page-eyebrow">{leaderLessonsPage.overview.label}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
                {leaderLessonsPage.overview.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
                {leaderLessonsPage.overview.body}
              </p>
              <ul className="mt-8 grid gap-4 border-t border-line/10 pt-6 text-sm leading-6 text-slate md:grid-cols-2">
                {leaderLessonsPage.overview.points.map((point) => (
                  <li key={point} className="border-b border-line/10 pb-4">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-y border-line/15 py-6">
              <p className="page-eyebrow">{leaderLessonsPage.overview.download.label}</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-ink">
                {leaderLessonsPage.overview.download.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate">
                {leaderLessonsPage.overview.download.body}
              </p>
              <Link
                href={leaderLessonsPage.overview.download.href}
                className="hero-nav-cta mt-6 inline-flex items-center gap-3"
                data-analytics-event="pdf_download"
                data-analytics-section="leader_lessons_featured_download"
                data-analytics-asset={leaderLessonsPage.overview.download.title}
              >
                Download overview PDF
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-divider bg-warm-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <p className="page-eyebrow">{leaderLessonsPage.sectorSection.label}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              {leaderLessonsPage.sectorSection.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
              {leaderLessonsPage.sectorSection.intro}
            </p>
          </AnimatedReveal>

          <div className="mt-10 grid gap-x-8 gap-y-7 border-t border-line/10 pt-7 md:grid-cols-2 lg:grid-cols-3">
            {leaderLessonsPage.sectorSection.items.map((item) => (
              <AnimatedReveal
                key={item.href}
                className="flex h-full flex-col border-b border-line/10 pb-7"
              >
                <p className="page-eyebrow">{item.label}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate">{item.body}</p>
                <Link
                  href={item.href}
                  className="text-link mt-auto inline-flex self-start pt-6 text-sm text-ink"
                  data-analytics-event="pdf_download"
                  data-analytics-section="leader_lessons_sector_download"
                  data-analytics-asset={item.title}
                >
                  Download PDF
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
              {leaderLessonsPage.lessonSection.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate md:text-lg">
              {leaderLessonsPage.lessonSection.intro}
            </p>
          </AnimatedReveal>

          <AnimatedReveal className="mt-10 grid gap-5 md:grid-cols-3">
            {lessonFormats.formats.map((format) => (
              <div key={format.name} className="border-t border-line pt-5">
                <p className="page-eyebrow">{format.duration}</p>
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

      <section className="section-divider bg-soft-blue">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="grid gap-10 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.04fr)] lg:items-stretch lg:gap-16">
            <div className="lesson-proof-column flex max-w-[31rem] flex-col lg:max-w-none lg:min-h-full">
              <div>
                <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                  {leaderLessonsPage.proof.heading}
                </h2>
                <p className="mt-5 max-w-[28rem] text-base leading-7 text-slate md:text-lg">
                  {leaderLessonsPage.proof.body}
                </p>
                <blockquote className="lesson-proof-testimonial mt-8 border-l border-brass pl-5">
                  <p className="text-[1.02rem] leading-7 text-ink/90">{testimonial.quote}</p>
                  <footer className="mt-3 text-sm text-slate">{testimonial.attribution}</footer>
                </blockquote>
              </div>

              <div className="lesson-proof-logo-block mt-10 border-t border-line/12 pt-8 lg:mt-auto">
                <p className="page-eyebrow mb-6">{proofSignals.label}</p>
                <ClientLogoStrip
                  items={proofSignals.organisations}
                  assetBasePath={publicBasePath}
                />
              </div>
            </div>

            <div className="lesson-proof-column max-w-[35rem] lg:max-w-none">
              <div className="lesson-proof-publications h-full border-t border-line/12 pt-8 lg:flex lg:min-h-full lg:flex-col">
                <p className="page-eyebrow">{leaderLessonsPage.proof.thoughtLeadership.heading}</p>
                <p className="mt-4 max-w-[31rem] text-sm leading-6 text-slate md:text-[1rem]">
                  {leaderLessonsPage.proof.thoughtLeadership.intro}
                </p>

                <div className="lesson-proof-publication-grid mt-7">
                  {leaderLessonsPage.proof.thoughtLeadership.articles.map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="lesson-proof-publication"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div
                        className="lesson-proof-publication__logo"
                        style={
                          {
                            "--publication-logo-max-width": `${article.logo.maxWidth}rem`,
                          } as CSSProperties
                        }
                      >
                        <Image
                          src={`${publicBasePath}${article.logo.src}`}
                          alt={article.publication}
                          width={article.logo.width}
                          height={article.logo.height}
                          className="lesson-proof-publication__logo-image"
                          unoptimized
                        />
                      </div>

                      <div className="lesson-proof-publication__body">
                        <div className="lesson-proof-publication__title-row">
                          <h3 className="font-serif text-[1.65rem] leading-[1.08] text-ink">
                            {article.title}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="lesson-proof-publication__arrow text-xl leading-none text-ink/68"
                          >
                            ↗
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate md:text-[1rem]">
                          {article.summary}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section className="section-divider">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <AnimatedReveal>
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
              Get a lesson shaped around your real work.
            </h2>
          </AnimatedReveal>
          <AnimatedReveal className="flex flex-wrap gap-3">
            <Link
              href={leaderLessonsPage.heroCta.href}
              className="hero-nav-cta inline-flex items-center gap-3"
              data-analytics-event="service_cta_click"
              data-analytics-section="leader_lessons_final_cta"
              data-analytics-label={leaderLessonsPage.heroCta.label}
            >
              {leaderLessonsPage.heroCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            {leaderLessonsPage.secondaryCta ? (
              <Link
                href={leaderLessonsPage.secondaryCta.href}
                className="text-link inline-flex items-center text-sm text-ink"
                data-analytics-event="service_cta_click"
                data-analytics-section="leader_lessons_final_cta"
                data-analytics-label={leaderLessonsPage.secondaryCta.label}
              >
                {leaderLessonsPage.secondaryCta.label}
              </Link>
            ) : null}
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
