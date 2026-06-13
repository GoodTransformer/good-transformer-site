import Image from "next/image";
import Link from "next/link";

import { formatDate, formatTag, type PostMeta } from "@/lib/insights-shared";

type PostCardProps = {
  post: PostMeta;
  variant?: "default" | "lead";
};

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const href = `/insights/${post.slug}/`;
  const isLead = variant === "lead";
  const primaryTag = post.tags[0];

  return (
    <article
      className={
        isLead
          ? "insight-card insight-card--lead grid gap-7 md:grid-cols-2 md:items-center"
          : "insight-card flex h-full flex-col"
      }
    >
      <Link
        href={href}
        className="group block focus:outline-none"
        data-analytics-event="insight_open"
        data-analytics-section="insights_index"
        data-analytics-label={post.title}
      >
        {post.cover ? (
          <div className="insight-card__media relative aspect-[16/9] overflow-hidden rounded-[1.1rem] border border-line/10 bg-sand">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? ""}
              fill
              priority={isLead}
              sizes={isLead ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : null}
      </Link>

      <div className={isLead ? "" : "mt-5 flex flex-1 flex-col"}>
        <p className="page-eyebrow">
          {primaryTag ? formatTag(primaryTag) : "Insight"}
          <span aria-hidden="true"> · </span>
          {post.readingLabel}
        </p>

        <h3
          className={
            isLead
              ? "mt-4 font-serif text-3xl leading-tight text-ink md:text-[2.6rem]"
              : "mt-3 font-serif text-2xl leading-tight text-ink"
          }
        >
          <Link
            href={href}
            className="insight-card__title-link"
            data-analytics-event="insight_open"
            data-analytics-section="insights_index"
            data-analytics-label={post.title}
          >
            {post.title}
          </Link>
        </h3>

        <p className={isLead ? "mt-4 max-w-xl text-base leading-7 text-slate md:text-lg" : "mt-3 text-sm leading-6 text-slate"}>
          {post.description}
        </p>

        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate/70">
          {formatDate(post.date)}
        </p>
      </div>
    </article>
  );
}
