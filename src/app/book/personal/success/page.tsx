import type { Metadata } from "next";

import { AnimatedReveal } from "@/components/animated-reveal";
import { CTAGroup } from "@/components/cta-group";
import { PageIntro } from "@/components/page-intro";
import { bookingSuccessPage, seoContent } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  ...seoContent.pages.personalSuccess,
  noIndex: true,
});

export default function PersonalBookingSuccessPage() {
  const content = bookingSuccessPage.personal;

  return (
    <>
      <PageIntro title={content.title} body={content.intro} />

      <section className="section-divider bg-soft-blue">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12 lg:py-16">
          <AnimatedReveal className="max-w-3xl">
            <p className="page-eyebrow">Booked</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate md:text-lg">
              {content.body}
            </p>
          </AnimatedReveal>

          <AnimatedReveal className="mt-10 grid gap-5 md:grid-cols-3" stagger>
            {content.steps.map((step, index) => (
              <div key={step} className="border-t border-line pt-5">
                <p className="page-eyebrow">Step {index + 1}</p>
                <p className="mt-3 text-base leading-7 text-ink">{step}</p>
              </div>
            ))}
          </AnimatedReveal>

          <AnimatedReveal className="mt-10">
            <CTAGroup
              primary={content.primaryCta}
              secondary={content.secondaryCta}
              tone="dark"
              section="book_personal_success"
            />
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
