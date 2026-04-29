import Image from "next/image";
import Link from "next/link";

import { navigation, siteConfig } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="section-divider">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logos/gt-logo.png"
              alt=""
              aria-hidden="true"
              width={160}
              height={32}
              className="h-8 w-auto"
              style={{ filter: "brightness(0) opacity(0.72)" }}
            />
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink/72">
              {siteConfig.brand}
            </p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate">{siteConfig.descriptor}</p>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm text-ink/72">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
