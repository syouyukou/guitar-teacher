"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BookOpen, ExternalLink, Music2, Sparkles, Trophy } from "lucide-react";
import {
  APPRECIATION_GENRES,
  DEFAULT_APPRECIATION_GENRE,
  type AppreciationGenreId,
  type FeaturedGuitarist,
  guitaristsForGenre,
} from "@/lib/guitar-appreciation";

function classicOrderFor(g: FeaturedGuitarist, genreId: AppreciationGenreId): number {
  return g.genrePlacements.find((p) => p.genreId === genreId)!.classicOrder;
}

export function ListenBrowse() {
  const [genre, setGenre] = useState<AppreciationGenreId>(DEFAULT_APPRECIATION_GENRE);

  const list = useMemo(() => guitaristsForGenre(genre), [genre]);
  const meta = APPRECIATION_GENRES.find((g) => g.id === genre)!;
  const totalInGenre = list.length;

  return (
    <div>
      <div className="surface-glass sticky top-0 z-10 mb-8 rounded-[var(--radius)] p-4 shadow-[var(--shadow-soft)] ring-1 ring-border/40 backdrop-blur-md sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Sparkles size={13} aria-hidden />
            依曲風瀏覽
          </span>
          <span className="text-xs text-muted-foreground">
            順序與徽章數字一致（多欄時由左而右、由上而下；卡面高度不一仍可形成瀑布感）
          </span>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="賞析曲風"
        >
          {APPRECIATION_GENRES.map((g) => {
            const selected = genre === g.id;
            return (
              <button
                key={g.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setGenre(g.id)}
                className={`min-h-10 rounded-full border px-3.5 py-2 text-left text-xs font-semibold transition-[background-color,border-color,box-shadow,color] duration-200 sm:text-sm ${
                  selected
                    ? "border-primary/50 bg-primary/15 text-primary shadow-[var(--shadow-soft)]"
                    : "border-border/70 bg-muted/30 text-muted-foreground hover:border-primary/35 hover:bg-primary/8 hover:text-card-foreground"
                }`}
              >
                <span className="block">{g.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{meta.blurb}</p>
      </div>

      <h2 className="mb-2 text-lg font-bold tracking-tight text-card-foreground">推薦從這幾位聽起</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        頭像取自英文維基百科條目摘要圖（Wikimedia Commons）；曲目為 YouTube 搜尋連結。
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((guitarist) => {
          const rank = classicOrderFor(guitarist, genre);
          const positionLabel =
            totalInGenre > 0 ? `此曲風脈絡 · 經典參考 ${rank}／${totalInGenre}` : null;
          const isClassicLead = rank === 1;

          return (
            <article
              key={guitarist.id}
              className="surface-glass h-fit overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-soft)] transition-shadow duration-200 motion-safe:hover:shadow-[var(--shadow-soft-lg)]"
            >
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold text-card-foreground">{guitarist.name}</h3>
                    <p className="mt-1.5 text-sm leading-[1.7] text-muted-foreground">{guitarist.tagline}</p>
                  </div>
                  {positionLabel ? (
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider ring-1 ${
                        isClassicLead
                          ? "bg-primary/14 text-primary ring-primary/35"
                          : "bg-muted/50 text-muted-foreground ring-border/70"
                      }`}
                    >
                      {isClassicLead ? <BookOpen size={11} aria-hidden /> : null}
                      {positionLabel}
                    </span>
                  ) : null}
                </div>

                <div className="relative mx-auto mb-5 aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/70">
                  <Image
                    src={guitarist.portrait.src}
                    alt={guitarist.portrait.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 320px"
                  />
                </div>
                <p className="-mt-4 mb-5 text-[0.65rem] leading-snug text-muted-foreground">
                  照片：Wikipedia／Wikimedia Commons（依檔案頁授權）
                </p>

                <div className="mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                    <Trophy size={14} strokeWidth={2.25} className="opacity-90" aria-hidden />
                    事蹟與里程碑
                  </span>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed text-card-foreground">
                    {guitarist.milestones.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/80" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                    <Music2 size={14} strokeWidth={2.25} className="opacity-90" aria-hidden />
                    經典／入門推薦曲目
                  </span>
                  <ul className="mt-3 flex flex-col gap-2">
                    {guitarist.classicSongs.map((song) => (
                      <li key={song.title}>
                        <a
                          href={song.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group surface-inset block rounded-xl px-3.5 py-3 ring-1 ring-border/55 transition-[background-color,border-color] duration-200 hover:bg-primary/8 hover:ring-primary/30"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                              <span className="font-semibold text-card-foreground group-hover:text-primary">{song.title}</span>
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

                <div className="mb-5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary">入門可以注意聽</span>
                  <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-card-foreground">
                    {guitarist.listenFor.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {guitarist.links.map((link) => (
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
            </article>
          );
        })}
      </div>
    </div>
  );
}
