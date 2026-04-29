import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Good Transformer",
    short_name: "Good Transformer",
    description: "Personal AI lessons and practical business advisory",
    start_url: "/",
    display: "standalone",
    background_color: "#F1ECE4",
    theme_color: "#008C95",
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
