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
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
              const active = isActive(item.href);

              if (item.children?.length) {
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-haspopup="true"
                      className={classNames(
                        "inline-flex items-center py-2 text-sm transition-colors",
                        active ? "text-ink" : linkClass,
                      )}
                    >
                      {item.label}
                    </Link>
                    <div className="pointer-events-none absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                      <div className="border border-ink/10 bg-paper p-3 shadow-[0_18px_42px_rgba(4,31,37,0.12)]">
                        <Link
                          href={item.href}
                          className="block border-b border-line/10 px-3 py-3 text-sm text-ink transition-colors hover:text-brass"
                          data-analytics-event="nav_services_overview"
                          data-analytics-label={item.label}
                        >
                          All services
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={classNames(
                              "block border-b border-line/10 px-3 py-3 text-sm transition-colors last:border-b-0 hover:text-brass",
                              isActive(child.href) ? "text-ink" : "text-ink/70",
                            )}
                            data-analytics-event="nav_service_child"
                            data-analytics-label={child.label}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

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
          href={siteConfig.primaryCta.href}
          className={classNames(
            "hero-nav-cta ml-auto hidden items-center gap-3 lg:inline-flex",
          )}
        >
          {siteConfig.primaryCta.label}
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
              <div key={item.href} className="flex flex-col gap-3">
                <Link href={item.href} className="text-sm">
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="ml-4 flex flex-col gap-3 border-l border-ink/10 pl-4">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="text-sm text-ink/70">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Link
              href={siteConfig.primaryCta.href}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-[0.35rem] bg-ink px-4 py-2 text-sm font-medium text-paper"
            >
              {siteConfig.primaryCta.label} →
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
