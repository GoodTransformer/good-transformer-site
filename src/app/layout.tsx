import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { AnalyticsEvents } from "@/components/analytics-events";
import { GoogleAnalytics } from "@/components/google-analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { seoContent, siteConfig } from "@/content/site-content";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: seoContent.siteName,
      url: SITE_URL,
      inLanguage: "en-GB",
      publisher: { "@id": SITE_URL },
    },
    {
      "@type": "ProfessionalService",
      "@id": SITE_URL,
      name: seoContent.siteName,
      description: seoContent.openGraphDescription,
      url: SITE_URL,
      logo: `${SITE_URL}/logos/gt-logo.png`,
      image: OG_IMAGE,
      founder: { "@type": "Person", name: seoContent.personName },
      founderLocation: {
        "@type": "Country",
        name: "United Kingdom",
      },
      areaServed: "GB",
      knowsAbout: ["Artificial Intelligence", "AI adoption", "AI coaching", "Machine learning"],
      offers: [
        {
          "@type": "Offer",
          name: "AI Lessons for Leaders",
          description:
            "One-to-one AI coaching for leaders, from first steps to sharper workflows.",
          url: `${SITE_URL}/services/ai-lessons-for-leaders/`,
        },
        {
          "@type": "Offer",
          name: "AI Advisory for Teams",
          description: seoContent.pages.teamAdvisory.description,
          url: `${SITE_URL}/services/ai-advisory-for-teams/`,
        },
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/patrick/`,
      name: seoContent.personName,
      jobTitle: seoContent.personJobTitle,
      url: `${SITE_URL}/patrick/`,
      worksFor: { "@id": SITE_URL },
      knowsAbout: ["Artificial Intelligence", "AI strategy", "AI adoption", "AI coaching"],
      sameAs: [],
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.offerName} | ${siteConfig.descriptor}`,
    template: `%s | ${siteConfig.offerName}`,
  },
  description: seoContent.defaultDescription,
  metadataBase: new URL(SITE_URL),
  applicationName: seoContent.siteName,
  authors: [{ name: seoContent.personName }],
  creator: seoContent.personName,
  publisher: seoContent.siteName,
  category: "AI coaching and advisory",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Good Transformer Insights" }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: seoContent.openGraphTitle,
    description: seoContent.openGraphDescription,
    url: SITE_URL,
    siteName: seoContent.siteName,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: seoContent.ogImageAlt,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoContent.openGraphTitle,
    description: seoContent.openGraphDescription,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <JsonLd data={jsonLd} />
        {/* Progressive-enhancement fallback: reveal animations start at opacity:0
            and are shown by JS (IntersectionObserver). Without JS, force them
            visible so body copy never renders blank. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".reveal,.reveal.is-visible,.reveal-stagger>*{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body className={`${sans.variable} ${serif.variable} site-frame`}>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <AnalyticsEvents />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
