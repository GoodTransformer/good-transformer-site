"use client";

import { startTransition, useState, type FormEvent } from "react";

import { ServiceContactPrompt } from "@/components/service-contact-prompt";
import { bookingForm, siteConfig } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  workEmail: string;
  organisationSize: string;
  sector: string;
  currentState: string[];
  tools: string;
  outcome: string;
};

const defaultState: FormState = {
  workEmail: "",
  organisationSize: "",
  sector: "",
  currentState: [],
  tools: "",
  outcome: "",
};

type DeliveryMode = "endpoint" | "email" | "manual";

function getSafeHttpUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

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

function buildCalUrl(baseUrl: string, params: { name?: string; email?: string }) {
  if (!baseUrl) return baseUrl;
  const qs = new URLSearchParams();
  if (params.name) qs.set("name", params.name);
  if (params.email) qs.set("email", params.email);
  const query = qs.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

function getMailtoHref(email: string, subject: string, body: string) {
  const trimmed = email.trim();

  if (!isValidEmail(trimmed)) {
    return "";
  }

  const search = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${trimmed}?${search.toString()}`;
}

const MIN_SUBMIT_DELAY_MS = 1500;

export function BookingForm() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("manual");
  const [startedAt] = useState(() => Date.now());
  const [trapField, setTrapField] = useState("");
  const calendarUrl = getSafeHttpUrl(
    process.env.NEXT_PUBLIC_CLARITY_CALL_URL ?? "",
  );
  const briefEndpoint = getSafeHttpUrl(
    process.env.NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT ?? "",
  );

  const summary = [
    `Work email: ${form.workEmail.trim() || "Not provided"}`,
    `Organisation size: ${form.organisationSize || "Not provided"}`,
    `Sector: ${form.sector || "Not provided"}`,
    `What is happening now: ${
      form.currentState.length > 0 ? form.currentState.join("; ") : "Not provided"
    }`,
    `Tools in use: ${form.tools.trim() || "Not provided"}`,
    `90-day outcome: ${form.outcome.trim() || "Not provided"}`,
  ].join("\n");
  const briefEmailHref = getMailtoHref(
    process.env.NEXT_PUBLIC_BOOKING_BRIEF_EMAIL ?? "",
    "Business discovery call intake",
    summary,
  );
  const autoRedirectsToCalendar = Boolean(briefEndpoint && calendarUrl);

  const canSubmit =
    isValidEmail(form.workEmail) &&
    Boolean(form.organisationSize) &&
    Boolean(form.sector) &&
    form.currentState.length > 0 &&
    Boolean(form.outcome.trim());

  function toggleState(value: string) {
    setForm((current) => {
      const currentState = current.currentState.includes(value)
        ? current.currentState.filter((item) => item !== value)
        : [...current.currentState, value];

      return { ...current, currentState };
    });
  }

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    if (trapField.trim()) {
      return;
    }

    if (Date.now() - startedAt < MIN_SUBMIT_DELAY_MS) {
      setSubmitError("Please take a moment to review your brief, then submit again.");
      return;
    }

    setSubmitError("");
    setCopied(false);
    setIsSubmitting(true);

    const briefPayload = {
      email: form.workEmail.trim(),
      source: siteConfig.offerName,
      formType: "Business discovery call",
      submittedAt: new Date().toISOString(),
      organisationSize: form.organisationSize,
      sector: form.sector,
      currentState: form.currentState,
      tools: form.tools.trim(),
      outcome: form.outcome.trim(),
      summary,
      _subject: "New business discovery call brief",
      _gotcha: trapField,
    };

    try {
      let nextMode: DeliveryMode = "manual";

      if (briefEndpoint) {
        const response = await fetch(briefEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(briefPayload),
        });

        if (!response.ok) {
          throw new Error("Brief handoff failed.");
        }

        nextMode = "endpoint";
      } else if (briefEmailHref) {
        nextMode = "email";
        window.location.assign(briefEmailHref);
      }

      startTransition(() => {
        setDeliveryMode(nextMode);
        setSubmitted(true);
      });

      if (nextMode === "endpoint" && calendarUrl) {
        // href is the base calendar URL only — buildCalUrl appends the
        // visitor's email, which must not be sent to analytics.
        trackEvent("booking_start", {
          section: "book_business",
          label: "business",
          href: calendarUrl,
        });
        window.setTimeout(() => {
          window.location.assign(buildCalUrl(calendarUrl, { email: form.workEmail.trim() }));
        }, 120);
      }
    } catch {
      setSubmitError(
        "The brief could not be handed off from this page. Please try again or use the copy option below.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-line bg-paper/82 p-6 shadow-glow backdrop-blur md:p-8"
      >
        <div className="grid gap-8">
          <ServiceContactPrompt />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="business-website">Website</label>
            <input
              id="business-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={trapField}
              onChange={(event) => setTrapField(event.target.value)}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-3 text-sm text-ink md:col-span-2">
              <span className="font-medium">Work email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={form.workEmail}
                onChange={(event) => updateField("workEmail", event.target.value)}
                className="min-h-12 rounded-[1.25rem] border border-line bg-sand/80 px-4 text-base text-ink outline-none transition focus:border-copper"
                placeholder="name@organisation.com"
              />
            </label>

            <label className="grid gap-3 text-sm text-ink">
              <span className="font-medium">Organisation size</span>
              <select
                value={form.organisationSize}
                onChange={(event) => updateField("organisationSize", event.target.value)}
                className="min-h-12 rounded-[1.25rem] border border-line bg-sand/80 px-4 text-base text-ink outline-none transition focus:border-copper"
              >
                <option value="">Select one</option>
                {bookingForm.orgSizes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3 text-sm text-ink">
              <span className="font-medium">Sector</span>
              <select
                value={form.sector}
                onChange={(event) => updateField("sector", event.target.value)}
                className="min-h-12 rounded-[1.25rem] border border-line bg-sand/80 px-4 text-base text-ink outline-none transition focus:border-copper"
              >
                <option value="">Select one</option>
                {bookingForm.sectors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="grid gap-8">
            <legend className="text-sm font-medium text-ink">What is happening now?</legend>
            <div className="mt-4 grid gap-3">
              {bookingForm.currentState.map((item) => {
                const checked = form.currentState.includes(item);

                return (
                  <label
                    key={item}
                    className="flex cursor-pointer items-start gap-3 border-b border-line pb-3 text-sm leading-6 text-slate"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleState(item)}
                      className="mt-1 h-4 w-4 rounded border-line text-copper focus:ring-copper"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className="grid gap-3 text-sm text-ink">
            <span className="font-medium">Tools currently in use</span>
            <textarea
              rows={4}
              value={form.tools}
              onChange={(event) => updateField("tools", event.target.value)}
              className="rounded-[1.5rem] border border-line bg-sand/80 px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-copper"
              placeholder="For example: ChatGPT, Microsoft Copilot, Claude, Gemini, mixed personal accounts, or internal tools."
            />
          </label>

          <label className="grid gap-3 text-sm text-ink">
            <span className="font-medium">What would success look like in 90 days?</span>
            <textarea
              rows={4}
              value={form.outcome}
              onChange={(event) => updateField("outcome", event.target.value)}
              className="rounded-[1.5rem] border border-line bg-sand/80 px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-copper"
              placeholder="Describe the change you want in plain language."
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="inline-flex min-h-12 items-center justify-center rounded-[0.45rem] bg-ink px-6 text-sm font-medium text-paper transition enabled:hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/35"
            >
              {isSubmitting
                ? autoRedirectsToCalendar
                  ? "Saving brief..."
                  : "Preparing brief..."
                : autoRedirectsToCalendar
                  ? "Save brief and continue"
                  : "Continue"}
            </button>
            <p className="text-sm text-slate">
              {autoRedirectsToCalendar
                ? "We will take you straight to booking once the brief is saved."
                : `${siteConfig.primaryCta.label} follows this short brief.`}
            </p>
          </div>
          {submitError ? (
            <p aria-live="polite" className="text-sm leading-6 text-[rgb(136,63,42)]">
              {submitError}
            </p>
          ) : null}
        </div>
      </form>

      <aside className="border-t border-line pt-5 lg:pt-0 lg:pl-2">
        {!submitted ? (
          <div className="max-w-sm">
            <p className="page-eyebrow">What happens next</p>
            <p className="mt-4 max-w-xs font-serif text-3xl leading-tight text-ink">
              Two minutes now makes the call sharper later.
            </p>
            <div className="mt-8 border-t border-line">
              {bookingForm.nextSteps.map((item) => (
                <p key={item} className="border-b border-line py-4 text-sm leading-6 text-slate">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-sm">
            <p className="page-eyebrow">
              {deliveryMode === "endpoint"
                ? "Brief delivered"
                : deliveryMode === "email"
                  ? "Draft opened"
                  : "Brief ready"}
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-ink">
              {deliveryMode === "endpoint"
                ? "Your context is delivered. Continue to Outlook when you are ready."
                : deliveryMode === "email"
                  ? "Send the drafted note, then continue to scheduling."
                  : "Copy the brief, then continue to scheduling."}
            </p>
            <p className="mt-5 whitespace-pre-line text-sm leading-6 text-slate">
              {summary}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {deliveryMode !== "endpoint" ? (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-11 items-center justify-center rounded-[0.45rem] border border-line px-5 text-sm font-medium text-ink transition hover:bg-sand/80"
                >
                  {copied ? "Brief copied" : "Copy brief"}
                </button>
              ) : null}
              {deliveryMode === "email" && briefEmailHref ? (
                <a
                  href={briefEmailHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-[0.45rem] border border-line px-5 text-sm font-medium text-ink transition hover:bg-sand/80"
                >
                  Open draft email again
                </a>
              ) : null}
              {calendarUrl ? (
                <a
                  href={buildCalUrl(calendarUrl, { email: form.workEmail.trim() })}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  onClick={() =>
                    trackEvent("booking_start", {
                      section: "book_business",
                      label: "business",
                      href: calendarUrl,
                    })
                  }
                  className="inline-flex min-h-11 items-center justify-center rounded-[0.45rem] bg-copper px-5 text-sm font-medium text-paper transition hover:bg-copper/90"
                >
                  Continue to scheduling
                </a>
              ) : (
                <p className="text-sm leading-6 text-slate">
                  Add <code>{siteConfig.calendarEnvName}</code> to enable the
                  live scheduling handoff on this page.
                </p>
              )}
              {deliveryMode === "manual" ? (
                <p className="text-sm leading-6 text-slate">
                  Add <code>{siteConfig.briefEndpointEnvName}</code> for automatic
                  brief delivery, or <code>{siteConfig.briefEmailEnvName}</code> for an
                  email-draft fallback.
                </p>
              ) : null}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}


type PersonalFormState = {
  name: string;
  email: string;
  confidence: string;
  goal: string;
};

const personalDefaultState: PersonalFormState = {
  name: "",
  email: "",
  confidence: "",
  goal: "",
};

const confidenceLevels = [
  "Brand new to AI",
  "Tried it, but not confident",
  "Using it sometimes",
  "Already using it and want sharper workflows",
];

export function PersonalBookingForm() {
  const [form, setForm] = useState<PersonalFormState>(personalDefaultState);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("manual");
  const [startedAt] = useState(() => Date.now());
  const [trapField, setTrapField] = useState("");
  const calendarUrl = getSafeHttpUrl(
    process.env.NEXT_PUBLIC_PERSONAL_LESSON_URL ?? "",
  );
  const briefEndpoint = getSafeHttpUrl(
    process.env.NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT ?? "",
  );

  const summary = [
    "Name: " + (form.name.trim() || "Not provided"),
    "Email: " + (form.email.trim() || "Not provided"),
    "AI confidence: " + (form.confidence || "Not provided"),
    "Call goal: " + (form.goal.trim() || "Not provided"),
  ].join("\n");
  const briefEmailHref = getMailtoHref(
    process.env.NEXT_PUBLIC_BOOKING_BRIEF_EMAIL ?? "",
    "Discovery call intake",
    summary,
  );
  const autoRedirectsToCalendar = Boolean(briefEndpoint && calendarUrl);
  const canSubmit =
    Boolean(form.name.trim()) &&
    isValidEmail(form.email) &&
    Boolean(form.confidence) &&
    Boolean(form.goal.trim());

  function updateField<Key extends keyof PersonalFormState>(
    key: Key,
    value: PersonalFormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    if (trapField.trim()) {
      return;
    }

    if (Date.now() - startedAt < MIN_SUBMIT_DELAY_MS) {
      setSubmitError("Please take a moment to review your brief, then submit again.");
      return;
    }

    setSubmitError("");
    setCopied(false);
    setIsSubmitting(true);

    const briefPayload = {
      email: form.email.trim(),
      name: form.name.trim(),
      source: siteConfig.offerName,
      formType: "Discovery call",
      submittedAt: new Date().toISOString(),
      confidence: form.confidence,
      goal: form.goal.trim(),
      summary,
      _subject: "New discovery call brief",
      _gotcha: trapField,
    };

    try {
      let nextMode: DeliveryMode = "manual";

      if (briefEndpoint) {
        const response = await fetch(briefEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(briefPayload),
        });

        if (!response.ok) {
          throw new Error("Brief handoff failed.");
        }

        nextMode = "endpoint";
      } else if (briefEmailHref) {
        nextMode = "email";
        window.location.assign(briefEmailHref);
      }

      startTransition(() => {
        setDeliveryMode(nextMode);
        setSubmitted(true);
      });

      if (nextMode === "endpoint" && calendarUrl) {
        // href is the base calendar URL only — buildCalUrl appends the
        // visitor's name and email, which must not be sent to analytics.
        trackEvent("booking_start", {
          section: "book_personal",
          label: "personal",
          href: calendarUrl,
        });
        window.setTimeout(() => {
          window.location.assign(
            buildCalUrl(calendarUrl, { name: form.name.trim(), email: form.email.trim() }),
          );
        }, 120);
      }
    } catch {
      setSubmitError(
        "The brief could not be handed off from this page. Please try again or use the copy option below.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
      <form
        onSubmit={handleSubmit}
        className="rounded-[1.25rem] border border-line bg-paper/82 p-6 shadow-glow backdrop-blur md:p-8"
      >
        <div className="grid gap-8">
          <ServiceContactPrompt />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="personal-website">Website</label>
            <input
              id="personal-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={trapField}
              onChange={(event) => setTrapField(event.target.value)}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-3 text-sm text-ink">
              <span className="font-medium">Name</span>
              <input
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="min-h-12 rounded-[0.8rem] border border-line bg-sand/80 px-4 text-base text-ink outline-none transition focus:border-brass"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-3 text-sm text-ink">
              <span className="font-medium">Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="min-h-12 rounded-[0.8rem] border border-line bg-sand/80 px-4 text-base text-ink outline-none transition focus:border-brass"
                placeholder="name@email.com"
              />
            </label>
          </div>

          <label className="grid gap-3 text-sm text-ink">
            <span className="font-medium">Current AI confidence</span>
            <select
              value={form.confidence}
              onChange={(event) => updateField("confidence", event.target.value)}
              className="min-h-12 rounded-[0.8rem] border border-line bg-sand/80 px-4 text-base text-ink outline-none transition focus:border-brass"
            >
              <option value="">Select one</option>
              {confidenceLevels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-3 text-sm text-ink">
            <span className="font-medium">What do you want to get out of the call?</span>
            <textarea
              rows={4}
              required
              value={form.goal}
              onChange={(event) => updateField("goal", event.target.value)}
              className="rounded-[1rem] border border-line bg-sand/80 px-4 py-3 text-base leading-7 text-ink outline-none transition focus:border-brass"
              placeholder="For example: use ChatGPT for work, organise research, write better prompts, build a weekly workflow, or understand what AI can and cannot do."
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="inline-flex min-h-12 items-center justify-center rounded-[0.45rem] bg-ink px-6 text-sm font-medium text-paper transition enabled:hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/35"
            >
              {isSubmitting
                ? autoRedirectsToCalendar
                  ? "Saving brief..."
                  : "Preparing brief..."
                : autoRedirectsToCalendar
                  ? "Save brief and continue"
                  : "Continue"}
            </button>
            <p className="text-sm text-slate">
              {autoRedirectsToCalendar
                ? "We will take you straight to booking once the brief is saved."
                : "Booking follows this short discovery brief."}
            </p>
          </div>
          {submitError ? (
            <p aria-live="polite" className="text-sm leading-6 text-[rgb(136,63,42)]">
              {submitError}
            </p>
          ) : null}
        </div>
      </form>

      <aside className="border-t border-line pt-5 lg:pt-0 lg:pl-2">
        {!submitted ? (
          <div className="max-w-sm">
            <p className="page-eyebrow">What happens next</p>
            <p className="mt-4 max-w-xs font-serif text-3xl leading-tight text-ink">
              A little context makes the call immediately useful.
            </p>
            <div className="mt-8 border-t border-line">
              {["Share what you want help with.", "Patrick reviews what you want to cover.", "Continue to scheduling when you are ready."].map((item) => (
                <p key={item} className="border-b border-line py-4 text-sm leading-6 text-slate">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-sm">
            <p className="page-eyebrow">
              {deliveryMode === "endpoint"
                ? "Brief delivered"
                : deliveryMode === "email"
                  ? "Draft opened"
                  : "Brief ready"}
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-ink">
              {deliveryMode === "endpoint"
                ? "Your context is delivered. Continue to scheduling when you are ready."
                : deliveryMode === "email"
                  ? "Send the drafted note, then continue to scheduling."
                  : "Copy the brief, then continue to scheduling."}
            </p>
            <p className="mt-5 whitespace-pre-line text-sm leading-6 text-slate">
              {summary}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {deliveryMode !== "endpoint" ? (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-11 items-center justify-center rounded-[0.45rem] border border-line px-5 text-sm font-medium text-ink transition hover:bg-sand/80"
                >
                  {copied ? "Brief copied" : "Copy brief"}
                </button>
              ) : null}
              {calendarUrl ? (
                <a
                  href={buildCalUrl(calendarUrl, { name: form.name.trim(), email: form.email.trim() })}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  onClick={() =>
                    trackEvent("booking_start", {
                      section: "book_personal",
                      label: "personal",
                      href: calendarUrl,
                    })
                  }
                  className="inline-flex min-h-11 items-center justify-center rounded-[0.45rem] bg-brass px-5 text-sm font-medium text-paper transition hover:bg-brass/90"
                >
                  Continue to scheduling
                </a>
              ) : (
                <p className="text-sm leading-6 text-slate">
                  Add <code>{siteConfig.calendarEnvName}</code> to enable the live scheduling handoff on this page.
                </p>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
