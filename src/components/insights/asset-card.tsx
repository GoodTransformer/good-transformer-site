import { formatTag, type PostMeta } from "@/lib/insights-shared";

type AssetCardProps = {
  post: PostMeta;
};

/**
 * Downloadable asset (PDF, template, etc.). Visually distinct from a written
 * post: no cover-led layout, a clear "asset" eyebrow, and a download affordance.
 */
export function AssetCard({ post }: AssetCardProps) {
  const href = post.assetFile ?? "#";
  const primaryTag = post.tags[0];

  return (
    <article className="insight-card insight-card--asset flex h-full flex-col rounded-[1.1rem] border border-line/12 bg-sand/70 p-6">
      <p className="page-eyebrow text-brass">
        Asset
        {primaryTag ? (
          <>
            <span aria-hidden="true"> · </span>
            {formatTag(primaryTag)}
          </>
        ) : null}
      </p>

      <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">{post.title}</h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate">{post.description}</p>

      {post.assetFormat ? (
        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate/70">{post.assetFormat}</p>
      ) : null}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="text-link mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink"
        data-analytics-event="asset_download"
        data-analytics-section="insights_index"
        data-analytics-asset={post.title}
      >
        {post.assetCta ?? "Download"}
        <span aria-hidden="true">↓</span>
      </a>
    </article>
  );
}
