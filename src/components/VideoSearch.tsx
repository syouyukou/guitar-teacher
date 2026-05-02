"use client";

import { useState } from "react";
import { Search, ExternalLink, PlayCircle } from "lucide-react";

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
            <span className="text-orange-400 mt-0.5">▸</span>
            <div>
              {label && <span className="text-gray-200 text-sm">{label}</span>}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 mt-0.5"
              >
                <ExternalLink size={11} />
                {url.length > 60 ? url.slice(0, 60) + "..." : url}
              </a>
            </div>
          </div>
        );
      }
      if (line.trim()) {
        return <p key={i} className="text-gray-400 text-xs py-0.5">{line.replace(/^•\s*/, "")}</p>;
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
        <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-400 mb-2">本課推薦起手</p>
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            <PlayCircle size={16} className="text-red-500 shrink-0" />
            <span className="min-w-0">在 YouTube 搜尋：{youtubeTopic}</span>
            <ExternalLink size={14} className="shrink-0" />
          </a>
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="搜尋吉他教學影片或課程..."
          className="flex-1 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 placeholder-gray-500"
        />
        <button
          onClick={() => search()}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white rounded-lg px-4 py-2 text-sm transition-colors flex items-center gap-1"
        >
          <Search size={14} />
          搜尋
        </button>
      </div>

      {loading && (
        <div className="text-center text-gray-500 text-sm py-4 animate-pulse">
          正在搜尋教學資源...
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4">找不到相關資源，請換個關鍵字試試。</p>
      )}

      {results.map((r, i) => (
        <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <PlayCircle size={16} className="text-red-500" />
            <h3 className="text-white text-sm font-semibold">{r.title}</h3>
          </div>
          <div className="space-y-1">{parseLinks(r.content)}</div>
        </div>
      ))}
    </div>
  );
}
