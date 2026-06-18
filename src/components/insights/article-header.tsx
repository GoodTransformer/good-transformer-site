import Image from "next/image";

import { formatDate, formatTag, type PostMeta } from "@/lib/insights-shared";

export function ArticleHeader({ post }: { post: PostMeta }) {
  return (
    <header className="mx-auto max-w-[44rem] px-6 md:px-8">
      {post.cover ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-line/10 bg-sand">
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
            className="object-cover"
          />
        </div>
      ) : null}

      <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${post.cover ? "mt-10" : ""}`}>
        {post.tags.map((tag) => (
          <span key={tag} className="page-eyebrow text-brass">
            {formatTag(tag)}
          </span>
        ))}
      </div>

      <h1 className="mt-5 font-serif text-[clamp(1.875rem,1.41rem+2.07vw,3rem)] font-semibold leading-[1.08] text-ink text-pretty">
        {post.title}
      </h1>

      <p className="mt-5 text-[clamp(1.0625rem,0.99rem+0.33vw,1.1875rem)] leading-[1.6] text-slate text-pretty">
        {post.description}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate">
        <span className="font-medium text-ink">{post.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingLabel}</span>
      </div>
    </header>
  );
}
