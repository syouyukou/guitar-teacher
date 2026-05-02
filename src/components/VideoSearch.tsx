"use client";

import { useState } from "react";
import { Search, ExternalLink, PlayCircle, ChevronRight } from "lucide-react";

type ScrapeResult = {
  title: string;
  content: string;
  url: string;
};

type Props = {
  defaultQuery?: string;
  /** Shown as a direct YouTube search link for this lesson topic. */
  youtubeTopic?: string;
};

export default function VideoSearch({ defaultQuery = "", youtubeTopic }: Props) {
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function search(q?: string) {
    const searchQuery = q ?? query;
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, type: "all" }),
      });
      // #region agent log
      fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
        body: JSON.stringify({
          sessionId: "bf1987",
          runId: "pre-fix",
          hypothesisId: "H3",
          location: "VideoSearch.tsx:search:afterFetch",
          message: "/api/scrape response",
          data: { ok: res.ok, status: res.status },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      const data = await res.json();
      setResults(data.results ?? []);
    } catch (e) {
      // #region agent log
      fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
        body: JSON.stringify({
          sessionId: "bf1987",
          runId: "pre-fix",
          hypothesisId: "H4",
          location: "VideoSearch.tsx:search:catch",
          message: "VideoSearch fetch/json failed",
          data: {
            errorName: e instanceof Error ? e.name : "unknown",
            errorMessage: e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200),
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  // Parse YouTube links from content
  function parseLinks(content: string) {
    return content.split("\n").map((line, i) => {
      const urlMatch = line.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        const url = urlMatch[0];
        const label = line.replace(url, "").replace(/•\s*/, "").replace(/\s*—\s*$/, "").trim();
        return (
          <div key={i} className="flex items-start gap-2 py-1">
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden />
            <div>
              {label && <span className="text-sm text-card-foreground">{label}</span>}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                <ExternalLink size={11} aria-hidden />
                {url.length > 60 ? url.slice(0, 60) + "..." : url}
              </a>
            </div>
          </div>
        );
      }
      if (line.trim()) {
        return (
          <p key={i} className="py-0.5 text-xs text-muted-foreground">
            {line.replace(/^•\s*/, "")}
          </p>
        );
      }
      return null;
    });
  }

  const youtubeHref = youtubeTopic
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeTopic)}`
    : null;

  return (
    <div className="space-y-4">
      {youtubeHref && (
        <div className="surface-inset rounded-xl p-4 ring-1 ring-primary/20">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">本課推薦起手</p>
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 w-full max-w-full items-center gap-2 rounded-lg py-1 text-sm font-medium text-primary transition-colors duration-200 hover:brightness-110 sm:inline-flex sm:w-auto"
          >
            <PlayCircle size={18} className="shrink-0 text-red-500" aria-hidden />
            <span className="min-w-0">在 YouTube 搜尋：{youtubeTopic}</span>
            <ExternalLink size={14} className="shrink-0 opacity-70" aria-hidden />
          </a>
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="搜尋吉他教學影片或課程…"
          className="surface-inset min-h-11 flex-1 rounded-xl px-3 py-2.5 text-sm text-card-foreground outline-none ring-1 ring-border/70 transition-shadow duration-200 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="button"
          onClick={() => search()}
          disabled={loading}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-[filter,opacity,box-shadow] duration-200 hover:brightness-110 disabled:opacity-40"
        >
          <Search size={15} strokeWidth={2.25} aria-hidden />
          搜尋
        </button>
      </div>

      {loading && (
        <div className="animate-pulse py-4 text-center text-sm text-muted-foreground">
          正在搜尋教學資源…
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">找不到相關資源，請換個關鍵字試試。</p>
      )}

      {results.map((r, i) => (
        <div key={i} className="surface-glass rounded-[var(--radius)] p-4 shadow-[var(--shadow-soft)] sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <PlayCircle size={18} className="shrink-0 text-red-500" aria-hidden />
            <h3 className="text-sm font-semibold text-card-foreground">{r.title}</h3>
          </div>
          <div className="space-y-1">{parseLinks(r.content)}</div>
        </div>
      ))}
    </div>
  );
}
