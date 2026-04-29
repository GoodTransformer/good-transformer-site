import type { Metadata } from "next";

import { seoContent, siteConfig } from "@/content/site-content";

export const SITE_URL = seoContent.siteUrl;
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = path ? absoluteUrl(path) : SITE_URL;

  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
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
      title: path === "/" || !path ? seoContent.openGraphTitle : `${title} | ${siteConfig.offerName}`,
      description,
      url,
      siteName: seoContent.siteName,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: seoContent.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" || !path ? seoContent.openGraphTitle : `${title} | ${siteConfig.offerName}`,
      description,
      images: [OG_IMAGE],
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{
    name: string;
    path: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
