"use client";

import Image from "next/image";
import Link from "next/link";

export type HeroRoute = {
  href: string;
  label: string;
  title: string;
  body: string;
  tone: string;
};

export type HeroSignal = {
  title: string;
  body: string;
};

type HomeHeroProps = {
  title: string;
  descriptor: string;
  support: string;
  routes: HeroRoute[];
  signals: HeroSignal[];
};

/* ─── SVG icons ───────────────────────────────────────────────────────────── */

function PersonIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

function BuildingIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="1" />
      <path d="M9 21V11h6v10" />
      <path d="M3 9h18" />
    </svg>
  );
}

function BranchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5v17" />
      <path d="M12 8.25H8.1" />
      <path d="M12 15.75H8.1" />
      <path d="M12 12h15.9" />
      <circle cx="12" cy="3.5" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="8.1" cy="8.25" r="1.15" />
      <circle cx="8.1" cy="15.75" r="1.15" />
      <circle cx="15.9" cy="12" r="1.15" />
      <circle cx="12" cy="20.5" r="1.15" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M15.5 8.5 21 3M21 3h-4.5M21 3v4.5" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 4 6v6c0 5.5 3.6 10.7 8 12 4.4-1.3 8-6.5 8-12V6L12 2z" />
      <path d="M12 8.2a3.6 3.6 0 1 0 3.6 3.6" />
      <path d="m13.8 9.5 1.65 1.65 2.8-2.8" />
    </svg>
  );
}

const SIGNAL_ICONS = [BranchIcon, TargetIcon, ShieldCheckIcon];

/* ─── Heading with "AI" highlighted in brass ─────────────────────────────── */
function HighlightedTitle({ title }: { title: string }) {
  const parts = title.split(/(\bAI\b)/);
  return (
    <>
      {parts.map((part, i) =>
        part === "AI" ? (
          <span key={i} className="text-brass italic">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function AIStackVisual() {
  return (
    <div className="ai-stack-visual" aria-hidden="true">
      <Image
        src="/hero/attention-flow-the-path-to-ai-mastery-web.webp"
        alt=""
        width={1254}
        height={1254}
        className="ai-stack-visual__image"
        sizes="(max-width: 1023px) 0px, (max-width: 1280px) 36rem, 44rem"
        priority
      />
    </div>
  );
}

/* ─── component ──────────────────────────────────────────────────────────── */

export function HomeHero({
  title,
  descriptor,
  support,
  routes,
  signals,
}: HomeHeroProps) {
  const lightRoute = routes.find((r) => r.tone === "light") ?? routes[0];
  const darkRoute = routes.find((r) => r.tone === "dark") ?? routes[1];

  return (
    <section
      className="home-hero hero-stage-v2 relative overflow-x-hidden"
      aria-labelledby="home-hero-title"
    >
      <div className="hero-paper-plane" aria-hidden="true" />

      {/* Subtle depth / vignette */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* ── Hero composition ─────────────────────────────────────────────── */}
      <div
        className="hero-composition relative z-[2] flex flex-col px-6 md:px-10 lg:px-12"
      >
        <div className="home-hero__layout">
          {/* ── Hero copy ─────────────────────────────────────────────────── */}
          <div className="home-hero__content hero-v2-copy">

            {/* Heading */}
            <h1
              id="home-hero-title"
              className="hero-title font-serif text-[clamp(2.8rem,5.2vw,5.4rem)] leading-[1.0]"
            >
              <HighlightedTitle title={title} />
            </h1>

            {/* Descriptor */}
            <p className="hero-copy hero-intro mt-5 max-w-[30rem] text-base leading-7 md:text-lg">
              {descriptor}
            </p>

            {/* Support paragraph */}
            <p className="hero-copy hero-support mt-3 max-w-[30rem] text-sm leading-7">
              {support}
            </p>

            {/* Route cards */}
            <div className="hero-cta-grid hero-route-cards">
              {[lightRoute, darkRoute].map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`hero-card hero-route-card hero-route-card--${route.tone} ${route.tone === "dark" ? "hero-business-card" : ""}`}
                >
                  <span className="hero-route-label">{route.label}</span>
                  <div className="hero-route-title">
                    <span className="hero-card-title hero-route-title__text">{route.title}</span>
                    <span className="hero-route-arrow" aria-hidden="true">→</span>
                  </div>
                  <p className="hero-card-body hero-route-body">{route.body}</p>
                  <div className="hero-route-icon">
                    {route.tone === "light" ? <PersonIcon /> : <BuildingIcon />}
                  </div>
                </Link>
              ))}
            </div>

            {/* Signal strip */}
            <div className="hero-proof-strip hero-signal-strip flex">
              {signals.map((signal, i) => {
                const Icon = SIGNAL_ICONS[i];
                return (
                  <div key={signal.title} className="hero-signal-item flex-1">
                    <div className="hero-signal-mark grid place-items-center">
                      {Icon && <Icon />}
                    </div>
                    <span className="font-medium">{signal.title}</span>
                    <p className="hero-proof-copy">{signal.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="home-hero__visual hero-asset-wrap hero-visual-wrap">
            <AIStackVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
