"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { AssetCard } from "@/components/insights/asset-card";
import { PostCard } from "@/components/insights/post-card";
import { formatTag, type PostMeta, type TagCount } from "@/lib/insights-shared";

type InsightsGridProps = {
  posts: PostMeta[];
  tags: TagCount[];
};

// How many topics ride in the always-visible scroll row. The rest live in the
// searchable "All topics" panel so the bar never wraps into a block.
const BAR_LIMIT = 8;

function Card({ post }: { post: PostMeta }) {
  return post.type === "asset" ? <AssetCard post={post} /> : <PostCard post={post} />;
}

function Chip({
  label,
  count,
  active,
  onClick,
  tag,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
  tag?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`insight-chip ${active ? "insight-chip--active" : ""}`}
      {...(tag ? { "data-analytics-event": "insight_filter", "data-analytics-label": tag } : {})}
    >
      {label}
      {typeof count === "number" ? (
        <span className="insight-chip__count" aria-hidden="true">
          {count}
        </span>
      ) : null}
    </button>
  );
}

export function InsightsGrid({ posts, tags }: InsightsGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const lead = useMemo(
    () => posts.find((post) => post.featured && post.type === "post") ?? null,
    [posts],
  );

  const visible = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [posts, activeTag]);

  // tags arrive sorted by count desc. The top slice rides the bar; the active
  // tag is pulled forward so a panel selection stays visible (and dismissable).
  const barTags = useMemo(() => {
    const top = tags.slice(0, BAR_LIMIT);
    if (activeTag && !top.some((t) => t.tag === activeTag)) {
      const picked = tags.find((t) => t.tag === activeTag);
      if (picked) return [picked, ...top];
    }
    return top;
  }, [tags, activeTag]);

  const hasOverflow = tags.length > BAR_LIMIT;

  const panelTags = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tags;
    return tags.filter((t) => formatTag(t.tag).toLowerCase().includes(q));
  }, [tags, query]);

  const select = (tag: string | null) => {
    setActiveTag(tag);
    setPanelOpen(false);
    setQuery("");
  };

  // Close the panel on outside click or Escape; focus search when it opens.
  useEffect(() => {
    if (!panelOpen) return;
    searchRef.current?.focus();
    const onClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setPanelOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  // On the unfiltered view, the lead post is shown large and removed from the grid.
  const showLead = !activeTag && lead;
  const gridItems = showLead ? visible.filter((post) => post.slug !== lead!.slug) : visible;

  return (
    <div>
      {tags.length > 0 ? (
        <div className="insight-filter" ref={filterRef}>
          <div className="insight-filter__bar">
            <div
              className="insight-filter__scroll"
              role="group"
              aria-label="Filter insights by topic"
            >
              <Chip label="All" active={activeTag === null} onClick={() => select(null)} />
              {barTags.map(({ tag, count }) => (
                <Chip
                  key={tag}
                  tag={tag}
                  label={formatTag(tag)}
                  count={count}
                  active={activeTag === tag}
                  onClick={() => select(tag)}
                />
              ))}
            </div>
            {hasOverflow ? (
              <>
                <div className="insight-filter__fade" aria-hidden="true" />
                <button
                  type="button"
                  className={`insight-chip insight-filter__more ${panelOpen ? "insight-chip--active" : ""}`}
                  aria-expanded={panelOpen}
                  aria-haspopup="true"
                  onClick={() => setPanelOpen((v) => !v)}
                >
                  All topics
                  <span className={`insight-filter__more-caret ${panelOpen ? "is-open" : ""}`} aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>

          {hasOverflow && panelOpen ? (
            <div className="insight-filter__panel">
              <input
                ref={searchRef}
                type="text"
                className="insight-filter__search"
                placeholder={`Search ${tags.length} topics…`}
                aria-label="Search topics"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="insight-filter__panel-grid">
                {panelTags.length > 0 ? (
                  panelTags.map(({ tag, count }) => (
                    <Chip
                      key={tag}
                      tag={tag}
                      label={formatTag(tag)}
                      count={count}
                      active={activeTag === tag}
                      onClick={() => select(tag)}
                    />
                  ))
                ) : (
                  <p className="insight-filter__empty">No topic matches “{query}”.</p>
                )}
              </div>
            </div>
          ) : null}
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
