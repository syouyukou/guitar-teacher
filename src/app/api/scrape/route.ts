import * as cheerio from "cheerio";
import { NextRequest } from "next/server";

export const maxDuration = 30;

type ScrapeResult = {
  title: string;
  content: string;
  url: string;
};

async function scrapeGuitarTabs(query: string): Promise<ScrapeResult[]> {
  const results: ScrapeResult[] = [];

  // 搜尋 Ultimate Guitar
  try {
    const searchUrl = `https://www.ultimate-guitar.com/search.php?search_type=lessons&value=${encodeURIComponent(query)}`;
    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      const items: string[] = [];
      $("a[href*='/lesson/']").each((_, el) => {
        const href = $(el).attr("href");
        const text = $(el).text().trim();
        if (href && text && items.length < 3) {
          items.push(`• ${text} — ${href.startsWith("http") ? href : "https://www.ultimate-guitar.com" + href}`);
        }
      });
      if (items.length > 0) {
        results.push({
          title: "Ultimate Guitar 相關課程",
          content: items.join("\n"),
          url: searchUrl,
        });
      }
    }
  } catch {
    // ignore
  }

  // 抓取 JustinGuitar 搜尋結果
  try {
    const searchUrl = `https://www.justinguitar.com/search?q=${encodeURIComponent(query.replace(/[^\w\s]/g, ""))}`;
    const res = await fetch(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GuitarTeacher/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      const items: string[] = [];
      $("a[href*='/lessons/']").each((_, el) => {
        const href = $(el).attr("href");
        const text = $(el).text().trim();
        if (href && text.length > 5 && items.length < 3) {
          items.push(`• ${text} — https://www.justinguitar.com${href}`);
        }
      });
      if (items.length > 0) {
        results.push({
          title: "JustinGuitar 相關課程",
          content: items.join("\n"),
          url: searchUrl,
        });
      }
    }
  } catch {
    // ignore
  }

  return results;
}

async function getYouTubeLinks(query: string): Promise<ScrapeResult[]> {
  try {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIQAw%3D%3D`;
    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "zh-TW,zh;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return [];

    const html = await res.text();
    const matches = html.matchAll(/"videoId":"([^"]{11})","thumbnail".*?"title":\{"runs":\[\{"text":"([^"]+)"/g);
    const videos: { id: string; title: string }[] = [];
    const seen = new Set<string>();

    for (const m of matches) {
      if (videos.length >= 5) break;
      if (!seen.has(m[1])) {
        seen.add(m[1]);
        videos.push({ id: m[1], title: m[2] });
      }
    }

    if (videos.length === 0) return [];

    return [
      {
        title: "YouTube 教學影片",
        content: videos
          .map((v) => `• ${v.title}\n  https://www.youtube.com/watch?v=${v.id}`)
          .join("\n"),
        url: searchUrl,
      },
    ];
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { query, type } = await req.json();
  // #region agent log
  fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
    body: JSON.stringify({
      sessionId: "bf1987",
      runId: "pre-fix",
      hypothesisId: "H3",
      location: "api/scrape/route.ts:POST:entry",
      message: "scrape POST",
      data: {
        type: typeof type === "string" ? type : String(type),
        queryLen: typeof query === "string" ? query.length : -1,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  let results: ScrapeResult[] = [];

  if (type === "youtube" || type === "all") {
    const ytResults = await getYouTubeLinks(query);
    results = [...results, ...ytResults];
  }

  if (type === "tabs" || type === "all") {
    const tabResults = await scrapeGuitarTabs(query);
    results = [...results, ...tabResults];
  }

  return Response.json({ results });
}
