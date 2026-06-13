import Image from "next/image";
import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { CTAGroup } from "@/components/cta-group";
import { JsonLd } from "@/components/json-ld";
import { patrickPage, seoContent, siteConfig, testimonial } from "@/content/site-content";
import { publicBasePath } from "@/lib/public-base-path";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(seoContent.pages.patrick);

const portraitSrc = publicBasePath + patrickPage.portrait.src;

const patrickPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/patrick/#webpage`,
  name: patrickPage.title,
  url: `${SITE_URL}/patrick/`,
  description: patrickPage.intro,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/patrick/`,
    name: seoContent.personName,
    jobTitle: seoContent.personJobTitle,
    image: `${SITE_URL}${patrickPage.portrait.src}`,
    description: patrickPage.intro,
    worksFor: { "@id": SITE_URL },
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Patrick Hussey", path: "/patrick/" },
]);

export default function PatrickPage() {
  return (
    <>
      <JsonLd data={patrickPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* ── Unified header - name, intro, and portrait together ────────── */}
      <section className="page-intro page-intro--patrick">
        <div className="mx-auto max-w-7xl px-6 pb-8 md:px-10 lg:px-12">
          <div className="patrick-intro-grid grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_200px] md:gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
                {patrickPage.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-slate md:text-lg">
                {patrickPage.intro}
              </p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-slate">
                {patrickPage.portrait.caption}
              </p>
            </div>

            <div className="patrick-portrait-frame self-end md:self-center md:justify-self-start">
              <Image
                src={portraitSrc}
                alt={patrickPage.portrait.alt}
                width={520}
                height={520}
                sizes="(max-width: 768px) 180px, 240px"
                className="patrick-portrait-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections + testimonial ──────────────────────────────────────── */}
      <section className="patrick-detail-section">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <div className="border-t border-line">
              {patrickPage.sections.map((section) => (
                <AnimatedReveal
                  key={section.title}
                  className="border-b border-line py-6"
                >
                  <h2 className="font-serif text-3xl text-ink">{section.title}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate">
                    {section.body}
                  </p>
                </AnimatedReveal>
              ))}
            </div>

            <AnimatedReveal className="patrick-testimonial border-t border-line">
              <p className="patrick-testimonial__quote font-serif text-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="patrick-testimonial__attribution text-sm leading-6 text-slate">
                {testimonial.attribution}
              </p>
              <div className="patrick-testimonial__cta">
                <CTAGroup primary={siteConfig.primaryCta} tone="dark" />
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>
    </>
  );
}
