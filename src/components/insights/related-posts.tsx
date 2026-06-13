import Link from "next/link";

import { formatDate, formatTag, type PostMeta } from "@/lib/insights-shared";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-[44rem] px-6 md:px-8">
      <p className="page-eyebrow">Keep reading</p>
      <div className="mt-6 grid gap-8 border-t border-line/15 pt-8 sm:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug}>
            <p className="page-eyebrow">
              {post.tags[0] ? formatTag(post.tags[0]) : "Insight"}
              <span aria-hidden="true"> · </span>
              {post.readingLabel}
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-tight text-ink text-balance">
              <Link
                href={`/insights/${post.slug}/`}
                className="insight-card__title-link"
                data-analytics-event="insight_open"
                data-analytics-section="insights_related"
                data-analytics-label={post.title}
              >
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate text-pretty">{post.description}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate/70">
              {formatDate(post.date)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
