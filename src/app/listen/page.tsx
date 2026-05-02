import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Headphones, Music2, Sparkles, Trophy } from "lucide-react";
import { APPRECIATION_INTRO, FEATURED_GUITARISTS } from "@/lib/guitar-appreciation";

export const metadata: Metadata = {
  title: "吉他手賞析｜我的電吉他老師",
  description: "入門如何欣賞電吉他與推薦樂手：相片、經典曲目、事蹟與延伸閱讀。",
};

export default function ListenPage() {
  return (
    <div className="text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-10 pb-20 sm:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-10 items-center gap-1.5 rounded-lg px-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          <ArrowLeft size={15} strokeWidth={2.25} aria-hidden />
          返回課程列表
        </Link>

        <header className="mb-10">
          <div className="surface-glass relative overflow-hidden rounded-[var(--radius)] p-6 sm:p-8 shadow-[var(--shadow-soft-lg)]">
            <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Headphones size={28} strokeWidth={2.25} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  <Sparkles size={13} aria-hidden />
                  Listening lab
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">
                  吉他手賞析專區
                </h1>
                <p className="mt-2 text-sm leading-[1.7] text-muted-foreground sm:text-base">
                  帶你入門怎麼聽、聽什麼；每位樂手附維基百科公開授權肖像、經典入門曲目與事蹟提要，並可延伸查百科與影片。
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="surface-glass mb-12 space-y-5 rounded-[var(--radius)] p-6 sm:p-8 shadow-[var(--shadow-soft)]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">{APPRECIATION_INTRO.title}</h2>
          <div className="space-y-4">
            {APPRECIATION_INTRO.principles.map((p) => (
              <div key={p.heading}>
                <h3 className="mb-1 text-sm font-semibold text-card-foreground">{p.heading}</h3>
                <p className="text-sm leading-[1.7] text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">
            {APPRECIATION_INTRO.note}
          </p>
        </section>

        <h2 className="mb-2 text-lg font-bold tracking-tight text-card-foreground">推薦從這幾位聽起</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          頭像取自英文維基百科條目摘要圖（Wikimedia Commons）；曲目連結為 YouTube 搜尋，避免單支影片失效。
        </p>
        <ul className="space-y-8">
          {FEATURED_GUITARISTS.map((g) => (
            <li
              key={g.id}
              className="surface-glass overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-soft)] transition-shadow duration-200 motion-safe:hover:shadow-[var(--shadow-soft-lg)]"
            >
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6 sm:p-6">
                <div className="mx-auto w-full max-w-[14rem] shrink-0 sm:mx-0 sm:max-w-[13.5rem]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/70">
                    <Image
                      src={g.portrait.src}
                      alt={g.portrait.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 216px"
                    />
                  </div>
                  <p className="mt-2 px-0.5 text-[0.65rem] leading-snug text-muted-foreground">
                    照片：Wikipedia／Wikimedia Commons（依檔案頁授權）
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-card-foreground">{g.name}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{g.tagline}</p>

                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                      <Trophy size={14} strokeWidth={2.25} className="opacity-90" aria-hidden />
                      事蹟與里程碑
                    </span>
                    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-card-foreground">
                      {g.milestones.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/80" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                      <Music2 size={14} strokeWidth={2.25} className="opacity-90" aria-hidden />
                      經典／入門推薦曲目
                    </span>
                    <ul className="mt-3 flex flex-col gap-2">
                      {g.classicSongs.map((song) => (
                        <li key={song.title}>
                          <a
                            href={song.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group surface-inset block rounded-xl px-3.5 py-3 ring-1 ring-border/55 transition-[background-color,border-color] duration-200 hover:bg-primary/8 hover:ring-primary/30"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="min-w-0">
                                <span className="font-semibold text-card-foreground group-hover:text-primary">
                                  {song.title}
                                </span>
                                {song.context ? (
                                  <p className="mt-0.5 text-xs text-muted-foreground">{song.context}</p>
                                ) : null}
                              </div>
                              <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">
                                搜尋
                                <ExternalLink size={12} className="opacity-80" aria-hidden />
                              </span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                      入門可以注意聽
                    </span>
                    <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-card-foreground">
                      {g.listenFor.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border/80 bg-muted/40 px-3 py-2 text-xs font-semibold text-primary backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/40 hover:bg-primary/10"
                      >
                        {link.label}
                        <ExternalLink size={12} className="opacity-70" aria-hidden />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
