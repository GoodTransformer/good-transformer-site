import type { Metadata } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site-content";

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

const SITE_URL = "https://goodtransformer.ai";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": SITE_URL,
      name: "Good Transformer",
      description:
        "Personal 1-to-1 AI lessons and fractional AI advisory for teams. Helping individuals build AI confidence and organisations turn AI intent into working practice.",
      url: SITE_URL,
      logo: `${SITE_URL}/logos/gt-logo.png`,
      image: OG_IMAGE,
      founder: { "@type": "Person", name: "Patrick Hussey" },
      areaServed: "GB",
      knowsAbout: ["Artificial Intelligence", "AI adoption", "AI coaching", "Machine learning"],
      offers: [
        {
          "@type": "Offer",
          name: "Personal AI Lessons",
          description:
            "One-to-one AI coaching sessions for individuals — beginners through to improvers.",
          url: `${SITE_URL}/book/personal/`,
          priceCurrency: "GBP",
          price: "75",
          priceSpecification: { "@type": "UnitPriceSpecification", price: "75", priceCurrency: "GBP" },
        },
        {
          "@type": "Offer",
          name: "Business AI Advisory",
          description:
            "Fractional AI advisory for teams — AI Reality Check Sprint, 90-Day Adoption Build, or ongoing Fractional Retainer.",
          url: `${SITE_URL}/book/business/`,
        },
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/patrick/`,
      name: "Patrick Hussey",
      jobTitle: "AI Coach and Fractional AI Adviser",
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
  description:
    "Personal 1-to-1 AI lessons and practical business advisory from Patrick Hussey at Good Transformer.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Good Transformer — Get confident with AI.",
    description:
      "Personal AI lessons for individuals and fractional advisory for teams. Patrick Hussey helps people and organisations get genuinely useful with AI.",
    url: SITE_URL,
    siteName: "Good Transformer",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Good Transformer — Get confident with AI. Personal AI lessons and practical business advisory.",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Good Transformer — Get confident with AI.",
    description:
      "Personal AI lessons for individuals and fractional advisory for teams. Patrick Hussey helps people and organisations get genuinely useful with AI.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sans.variable} ${serif.variable} site-frame`}>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
