import Image from "next/image";
import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { CTAGroup } from "@/components/cta-group";
import { patrickPage, siteConfig, testimonial } from "@/content/site-content";
import { publicBasePath } from "@/lib/public-base-path";

export const metadata: Metadata = {
  title: "Patrick Hussey",
  description:
    "Patrick Hussey is an AI coach and fractional adviser. He works with individuals to build practical AI confidence, and with organisations to turn AI intent into real working practice.",
};

const portraitSrc = publicBasePath + patrickPage.portrait.src;

export default function PatrickPage() {
  return (
    <>
      {/* ── Unified header — name, intro, and portrait together ────────── */}
      <section className="page-intro">
        <div className="mx-auto max-w-7xl px-6 pb-8 md:px-10 lg:px-12">
          <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_200px] md:gap-14 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
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

            <div className="patrick-portrait-frame self-end md:self-center">
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
      <section className="section-divider">
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

            <AnimatedReveal className="border-t border-line pt-6">
              <p className="font-serif text-3xl leading-tight text-ink md:text-[2.1rem]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm leading-6 text-slate">
                {testimonial.attribution}
              </p>
              <div className="mt-10">
                <CTAGroup primary={siteConfig.primaryCta} tone="dark" />
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>
    </>
  );
}
