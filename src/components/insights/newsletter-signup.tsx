"use client";

import { useState, type FormEvent } from "react";

import { siteConfig } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";

function getSafeHttpUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

type Cadence = "weekly" | "daily";

const CADENCE_OPTIONS: { value: Cadence; label: string; description: string }[] = [
  {
    value: "weekly",
    label: "Weekly",
    description: "Every week: the week's new Insights plus the 5 biggest AI stories for leaders.",
  },
  {
    value: "daily",
    label: "Daily",
    description: "Each weekday: the day's new Insight plus the 3 biggest AI stories for leaders.",
  },
];

type NewsletterSignupProps = {
  heading?: string;
  body?: string;
  /** Analytics `section` for the newsletter_signup event. Lets the dedicated
   *  /newsletter page report a distinct conversion source from the inline forms. */
  analyticsSection?: string;
};

export function NewsletterSignup({
  heading = "Get new Insights by email",
  body = "Practical notes on using AI with judgement, and the AI news leaders actually need. No hype, no spam, unsubscribe anytime.",
  analyticsSection = "insights",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [cadence, setCadence] = useState<Cadence>("weekly");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  // Primary path: the subscribe Worker (adds the contact to a Resend topic +
  // segment). Public Cloudflare Worker URL; env var can override it.
  const subscribeEndpoint = getSafeHttpUrl(
    // `||` not `??`: the deploy passes this env as "" when the secret is unset,
    // and we still want the Worker default in that case.
    process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT ||
      "https://gt-newsletter-subscribe.misty-smoke-81e7.workers.dev",
  );
  // Fallback path: a Formspree form that just collects addresses.
  const formspreeEndpoint = getSafeHttpUrl(process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT ?? "");
  const fallbackEmail = process.env.NEXT_PUBLIC_BOOKING_BRIEF_EMAIL ?? "hello@goodtransformer.ai";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email) || status === "submitting") return;

    setStatus("submitting");

    const endpoint = subscribeEndpoint || formspreeEndpoint;

    // Nothing configured: fall back to an email draft so the field still works.
    if (!endpoint) {
      const href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(
        `Subscribe me to the ${cadence} Insights digest`,
      )}&body=${encodeURIComponent(
        `Please add ${email.trim()} to the ${cadence} Insights digest.`,
      )}`;
      window.location.assign(href);
      setStatus("done");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          cadence,
          source: siteConfig.offerName,
          formType: `Insights ${cadence} digest`,
          _subject: `New ${cadence} Insights subscriber`,
        }),
      });
      if (!response.ok) throw new Error("Subscribe failed.");
      trackEvent("newsletter_signup", { section: analyticsSection, label: cadence });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="insight-newsletter rounded-[1.5rem] border border-line/12 bg-sand/70 p-7 md:p-9">
      {status === "done" ? (
        <div className="max-w-xl">
          <p className="page-eyebrow text-brass">Subscribed</p>
          <p className="mt-4 font-serif text-2xl leading-tight text-ink">
            You&rsquo;re on the list for the {cadence} digest. It&rsquo;ll land in your inbox.
          </p>
        </div>
      ) : (
        <>
          <div className="max-w-2xl">
            <p className="page-eyebrow text-brass">Newsletter</p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-ink md:text-3xl">{heading}</h2>
            <p className="mt-3 text-sm leading-6 text-slate">{body}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
            <fieldset className="grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
              <legend className="sr-only">Choose how often you want the digest</legend>
              {CADENCE_OPTIONS.map((option) => {
                const selected = cadence === option.value;
                return (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-[0.9rem] border p-4 transition ${
                      selected
                        ? "border-ink bg-paper shadow-[0_10px_30px_rgba(4,31,37,0.06)]"
                        : "border-line/40 bg-paper/40 hover:border-brass/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cadence"
                      value={option.value}
                      checked={selected}
                      onChange={() => setCadence(option.value)}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-between">
                      <span className="font-medium text-ink">{option.label}</span>
                      <span
                        aria-hidden="true"
                        className={`grid h-4 w-4 place-items-center rounded-full border ${
                          selected ? "border-brass" : "border-line/50"
                        }`}
                      >
                        {selected ? <span className="h-2 w-2 rounded-full bg-brass" /> : null}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-sm leading-6 text-slate">
                      {option.description}
                    </span>
                  </label>
                );
              })}
            </fieldset>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@email.com"
                className="min-h-12 flex-1 rounded-[0.8rem] border border-line bg-paper px-4 text-base text-ink outline-none transition focus:border-brass"
              />
              <button
                type="submit"
                disabled={!isValidEmail(email) || status === "submitting"}
                className="inline-flex min-h-12 items-center justify-center rounded-[0.45rem] bg-ink px-6 text-sm font-medium text-paper transition enabled:hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/35"
              >
                {status === "submitting" ? "Subscribing…" : "Subscribe"}
              </button>
            </div>
          </form>
        </>
      )}

      {status === "error" ? (
        <p aria-live="polite" className="mt-4 text-sm leading-6 text-[rgb(136,63,42)]">
          That didn&rsquo;t go through. Please try again, or email {fallbackEmail}.
        </p>
      ) : null}
    </section>
  );
}
