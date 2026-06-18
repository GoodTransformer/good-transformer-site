import type { Metadata } from "next";

import { seoContent, siteConfig } from "@/content/site-content";

import { OG_IMAGE_NEWSLETTER_VERSION, OG_IMAGE_VERSION } from "./og-version";

export const SITE_URL = seoContent.siteUrl;
// The ?v= hash changes whenever the image is regenerated, so social platforms
// refetch the new card instead of serving a stale cached copy. See og-version.ts.
export const OG_IMAGE = `${SITE_URL}/og-image.png?v=${OG_IMAGE_VERSION}`;
// Newsletter-specific card ("Get the digest") used by /newsletter/.
export const OG_IMAGE_NEWSLETTER = `${SITE_URL}/og-newsletter.png?v=${OG_IMAGE_NEWSLETTER_VERSION}`;

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** Absolute or root-relative image to use for OG/Twitter cards. Falls back to OG_IMAGE. */
  image?: string;
  /** Alt text for the OG/Twitter image. Falls back to the global ogImageAlt. */
  imageAlt?: string;
  /** OpenGraph type. Use "article" for Insights posts. */
  ogType?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image,
  imageAlt,
  ogType = "website",
}: PageMetadataOptions): Metadata {
  const url = path ? absoluteUrl(path) : SITE_URL;
  const imageUrl = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : OG_IMAGE;
  const imageAltText = imageAlt ?? seoContent.ogImageAlt;

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
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAltText,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" || !path ? seoContent.openGraphTitle : `${title} | ${siteConfig.offerName}`,
      description,
      images: [imageUrl],
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
