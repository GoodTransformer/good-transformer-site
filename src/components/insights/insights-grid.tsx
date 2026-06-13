"use client";

import { useMemo, useState } from "react";

import { AssetCard } from "@/components/insights/asset-card";
import { PostCard } from "@/components/insights/post-card";
import { formatTag, type PostMeta, type TagCount } from "@/lib/insights-shared";

type InsightsGridProps = {
  posts: PostMeta[];
  tags: TagCount[];
};

function Card({ post }: { post: PostMeta }) {
  return post.type === "asset" ? <AssetCard post={post} /> : <PostCard post={post} />;
}

export function InsightsGrid({ posts, tags }: InsightsGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const lead = useMemo(
    () => posts.find((post) => post.featured && post.type === "post") ?? null,
    [posts],
  );

  const visible = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [posts, activeTag]);

  // On the unfiltered view, the lead post is shown large and removed from the grid.
  const showLead = !activeTag && lead;
  const gridItems = showLead ? visible.filter((post) => post.slug !== lead!.slug) : visible;

  return (
    <div>
      {tags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter insights by topic">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`insight-chip ${activeTag === null ? "insight-chip--active" : ""}`}
          >
            All
          </button>
          {tags.map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`insight-chip ${activeTag === tag ? "insight-chip--active" : ""}`}
              data-analytics-event="insight_filter"
              data-analytics-label={tag}
            >
              {formatTag(tag)}
              <span className="insight-chip__count" aria-hidden="true">
                {count}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {showLead ? (
        <div className="mt-10">
          <PostCard post={lead!} variant="lead" />
        </div>
      ) : null}

      {gridItems.length > 0 ? (
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((post) => (
            <Card key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-base leading-7 text-slate">
          Nothing under that topic yet. Try another, or view all.
        </p>
      )}
    </div>
  );
}
