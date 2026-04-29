import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { PersonalBookingForm } from "@/components/booking-form";
import { PageIntro } from "@/components/page-intro";
import { bookingPage, lessonPricing } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Book a Personal AI Lesson",
  description:
    "Book a one-to-one AI lesson with Patrick Hussey. Sessions from £75 — tailored to your tools, tasks, and confidence level. No experience needed.",
};

export default function PersonalBookPage() {
  return (
    <>
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
