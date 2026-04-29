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
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (isHome) {
    return null;
  }

  const shellClass = isHome && !scrolled
    ? "bg-ink/10 text-paper backdrop-blur-[2px]"
    : "border-b border-line bg-paper/88 text-ink shadow-[0_10px_40px_rgba(12,18,24,0.06)] backdrop-blur-xl";
  const linkClass = isHome && !scrolled ? "text-paper/72 hover:text-paper" : "text-ink/68 hover:text-ink";
  const menuShellClass = isHome && !scrolled ? "border-white/10 bg-ink/92 text-paper" : "border-line bg-paper/96 text-ink";

  return (
    <header
      className={classNames(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,color,backdrop-filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        shellClass,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-4 md:px-10 lg:px-12">
        <div className="flex items-center gap-8 xl:gap-12">
          <Link
            href="/"
            className="flex items-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.18em] transition-[color,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
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

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    "text-sm transition-[color,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "text-current" : linkClass,
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href={siteConfig.primaryCta.href}
          className={classNames(
            "ml-auto hidden min-h-11 items-center gap-3 rounded-[0.35rem] bg-ink px-5 text-sm font-medium text-paper transition duration-500 hover:bg-ink/88 lg:inline-flex",
          )}
        >
          {siteConfig.primaryCta.label}
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/15 transition-[color,border-color,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden"
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
        <div className={classNames("border-t px-6 pb-6 lg:hidden", menuShellClass)}>
          <nav className="flex flex-col gap-4 py-5">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
