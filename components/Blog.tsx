"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "./Projects";

interface DevToPost {
  id: number;
  title: string;
  description: string;
  url: string;
  tag_list: string[];
  published_at: string;
  reading_time_minutes: number;
  cover_image: string | null;
}

const FALLBACK_TEASERS = [
  {
    tag: "Test Automation",
    title: "Building Self-Healing Selenium Frameworks with AI",
    url: "https://dev.to/yashpandey07/building-self-healing-selenium-frameworks-with-ai-5e41",
    live: true,
  },
  {
    tag: "AI Testing",
    title: "How to Test LLM-Powered Applications Effectively",
    url: "https://dev.to/yashpandey07/how-to-test-llm-powered-applications-effectively-1n06",
    live: true,
  },
  {
    tag: "Playwright",
    title: "Why Playwright + Vitest is the Future of Web Testing",
    url: "https://dev.to/yashpandey07/why-playwright-vitest-is-the-future-of-web-testing-4hg1",
    live: true,
  },
];

export default function Blog() {
  const [posts, setPosts] = useState<DevToPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=yashpandey07&per_page=6")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setPosts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-32 px-8" style={{ background: "#050505" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="BLOG" title="Articles" subtitle="thoughts & guides" />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {posts.length > 0
            ? posts.map((post) => (
                <LivePostCard key={post.id} post={post} />
              ))
            : FALLBACK_TEASERS.map((t) => (
                <TeaserCard key={t.title} teaser={t} loading={loading} />
              ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.3)" }}>
            Writing about test automation, AI testing, and developer productivity.
          </p>
          <a
            href="https://dev.to/yashpandey07"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "rgba(99,102,241,0.8)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#a5b4fc"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(99,102,241,0.8)"; }}
          >
            All posts on Dev.to ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function LivePostCard({ post }: { post: DevToPost }) {
  const tag = post.tag_list[0] ?? "Article";
  const date = new Date(post.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="misty-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group"
      style={{ textDecoration: "none", transition: "border-color 0.25s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      <span
        className="self-start px-2.5 py-1 rounded-full"
        style={{
          fontSize: "10px",
          letterSpacing: "0.15em",
          fontFamily: "monospace",
          background: "rgba(99,102,241,0.12)",
          border: "1px solid rgba(99,102,241,0.25)",
          color: "rgba(165,180,252,0.9)",
          textTransform: "uppercase",
        }}
      >
        {tag}
      </span>

      <h3
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1.4,
          flex: 1,
        }}
      >
        {post.title}
      </h3>

      {post.description && (
        <p style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "0.825rem",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {post.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
          {date}
        </span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
          {post.reading_time_minutes} min read ↗
        </span>
      </div>
    </a>
  );
}

function TeaserCard({ teaser, loading }: { teaser: typeof FALLBACK_TEASERS[0]; loading: boolean }) {
  const inner = (
    <div
      className="misty-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{ height: "100%", opacity: loading ? 0.5 : 1, transition: "opacity 0.3s" }}
    >
      <div className="shimmer absolute inset-0 rounded-2xl" />

      <span
        className="relative z-10 self-start px-2.5 py-1 rounded-full"
        style={{
          fontSize: "10px",
          letterSpacing: "0.15em",
          fontFamily: "monospace",
          background: "rgba(99,102,241,0.12)",
          border: "1px solid rgba(99,102,241,0.25)",
          color: "rgba(165,180,252,0.7)",
          textTransform: "uppercase",
        }}
      >
        {teaser.tag}
      </span>

      <h3
        className="relative z-10"
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: teaser.live ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
          lineHeight: 1.4,
          flex: 1,
        }}
      >
        {teaser.title}
      </h3>

      <div className="relative z-10 mt-auto flex items-center gap-2">
        {teaser.live ? (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #4ade80" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "'Satoshi', sans-serif" }}>
              Read on Dev.to ↗
            </span>
          </>
        ) : (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" style={{ boxShadow: "0 0 6px #f59e0b" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'Satoshi', sans-serif" }}>
              Coming Soon
            </span>
          </>
        )}
      </div>
    </div>
  );

  if (teaser.live && teaser.url) {
    return (
      <a href={teaser.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }
  return inner;
}
