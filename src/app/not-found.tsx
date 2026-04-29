import type { Metadata } from "next";
import Link from "next/link";
import { seoContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: seoContent.pages.notFound.title,
  description: seoContent.pages.notFound.description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="section-divider">
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 lg:px-12 lg:py-44">
        <p className="page-eyebrow text-brass">404</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-ink md:text-6xl">
          Page not found.
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-slate md:text-lg">
          This page doesn&apos;t exist or has moved. Head back to the home page
          or book a session directly.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="button-light">
            Go home
          </Link>
          <Link href="/book" className="text-link text-sm text-ink">
            Book a session →
          </Link>
        </div>
      </div>
    </section>
  );
}
