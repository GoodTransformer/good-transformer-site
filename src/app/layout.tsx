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
