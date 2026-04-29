"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { navigation, siteConfig } from "@/content/site-content";

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
  backgroundImageSrc: string;
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

function PeopleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="7" r="3.5" />
      <path d="M1 21c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5" />
      <circle cx="17" cy="7" r="3" opacity="0.55" />
      <path d="M21 21c0-3.2-2.2-5.5-5.5-5.5" opacity="0.55" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M15.5 8.5 21 3M21 3h-4.5M21 3v4.5" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2 4 6v6c0 5.5 3.6 10.7 8 12 4.4-1.3 8-6.5 8-12V6L12 2z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const SIGNAL_ICONS = [PeopleIcon, TargetIcon, ShieldCheckIcon];

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

/* ─── component ──────────────────────────────────────────────────────────── */

export function HomeHero({
  title,
  descriptor,
  support,
  backgroundImageSrc,
  routes,
  signals,
}: HomeHeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const lightRoute = routes.find((r) => r.tone === "light") ?? routes[0];
  const darkRoute = routes.find((r) => r.tone === "dark") ?? routes[1];

  return (
    <section
      className="hero-stage-v2 relative overflow-hidden"
      aria-labelledby="home-hero-title"
    >
      {/* Background illustration — wrapper overflows hero bounds so scale-down animation never exposes background */}
      <div className="hero-illustration-wrap">
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          priority
          sizes="110vw"
          className="hero-illustration"
        />
      </div>

      {/* Left-panel gradient that bleeds the painting into the copy zone */}
      <div className="hero-paper-plane" aria-hidden="true" />

      {/* Subtle depth / vignette */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* ── Full-height flex column ──────────────────────────────────────── */}
      <div
        className="hero-composition relative z-[2] flex min-h-[100svh] flex-col px-6 md:px-10 lg:px-12"
        style={{ alignItems: "flex-start" }}
      >
        {/* ── Navigation ────────────────────────────────────────────────── */}
        <div className="flex w-full items-center gap-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-70"
          >
            <img src="/logos/gt-logo.png" alt="" aria-hidden="true" className="h-8 w-auto" style={{filter: 'brightness(0) opacity(0.82)'}} />
            {siteConfig.brand}
          </Link>

          <nav
            className="ml-6 hidden items-center gap-7 lg:flex"
            aria-label="Primary navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink/65 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-paper/40 backdrop-blur-sm transition lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
            </div>
          </button>
        </div>

        {/* Mobile drop-down */}
        {menuOpen && (
          <div className="w-full border-t border-ink/10 bg-paper/90 px-2 pb-5 pt-4 backdrop-blur-md lg:hidden">
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={siteConfig.primaryCta.href}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-[0.35rem] bg-ink px-4 py-2 text-sm font-medium text-paper"
                onClick={() => setMenuOpen(false)}
              >
                {siteConfig.primaryCta.label} →
              </Link>
            </nav>
          </div>
        )}

        {/* ── Spacer — desktop only, pushes copy into lower half ──────────── */}
        <div className="hidden lg:block lg:flex-1" aria-hidden="true" />

        {/* ── Hero copy ─────────────────────────────────────────────────── */}
        <div className="hero-v2-copy" style={{ width: "100%" }}>

          {/* Heading */}
          <h1
            id="home-hero-title"
            className="font-serif text-[clamp(2.8rem,5.2vw,5.4rem)] leading-[1.0] tracking-[-0.018em] text-ink"
          >
            <HighlightedTitle title={title} />
          </h1>

          {/* Descriptor */}
          <p className="mt-5 max-w-[30rem] text-base leading-7 text-ink md:text-lg">
            {descriptor}
          </p>

          {/* Support paragraph */}
          <p className="mt-3 max-w-[30rem] text-sm leading-7 text-ink/65">
            {support}
          </p>

          {/* Route labels — "For individuals / For businesses" */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[lightRoute, darkRoute].map((route) => (
              <div
                key={route.href}
                className="flex items-center gap-2 text-sm text-ink/65"
              >
                <span className="text-ink/50">
                  {route.tone === "light" ? (
                    <PersonIcon size={15} />
                  ) : (
                    <BuildingIcon size={15} />
                  )}
                </span>
                {route.label}
              </div>
            ))}
          </div>

          {/* Route cards */}
          <div className="mt-3 hero-route-cards">
            {[lightRoute, darkRoute].map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`hero-route-card hero-route-card--${route.tone}`}
              >
                <div className="hero-route-icon">
                  {route.tone === "light" ? <PersonIcon /> : <BuildingIcon />}
                </div>
                <div className="hero-route-title">
                  {route.title}
                  <span aria-hidden="true">→</span>
                </div>
                <p className="hero-route-body">{route.body}</p>
              </Link>
            ))}
          </div>

          {/* Signal strip */}
          <div className="hero-signal-strip mt-3 flex">
            {signals.map((signal, i) => {
              const Icon = SIGNAL_ICONS[i];
              return (
                <div key={signal.title} className="hero-signal-item flex-1">
                  <div className="hero-signal-mark grid place-items-center">
                    {Icon && <Icon />}
                  </div>
                  <span className="font-medium">{signal.title}</span>
                  <p>{signal.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
