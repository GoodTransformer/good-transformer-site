"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation, siteConfig } from "@/content/site-content";

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass = "text-ink/65 hover:text-ink";

  return (
    <header
      className={classNames(
        "site-header relative z-50 text-ink",
        isHome && "site-header--home",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4 md:px-10 lg:px-12">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-70"
          >
            <Image
              src="/logos/gt-logo.png"
              alt=""
              aria-hidden="true"
              width={160}
              height={32}
              className="h-8 w-auto"
              style={{ filter: "brightness(0) opacity(0.82)" }}
            />
            {siteConfig.brand}
          </Link>

          <nav className="ml-6 hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    "text-sm transition-colors",
                    active ? "text-ink" : linkClass,
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href={siteConfig.personalCta.href}
          className={classNames(
            "hero-nav-cta ml-auto hidden items-center gap-3 lg:inline-flex",
          )}
        >
          Book a lesson
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-paper/40 transition lg:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-px w-5 bg-current" />
            <span className="h-px w-5 bg-current" />
          </div>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-ink/10 bg-paper/96 px-6 pb-6 lg:hidden">
          <nav className="flex flex-col gap-4 py-5" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm">
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.personalCta.href}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-[0.35rem] bg-ink px-4 py-2 text-sm font-medium text-paper"
            >
              Book a lesson →
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
