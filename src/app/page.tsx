"use client";

import Link from "next/link";
import { CURRICULUM } from "@/lib/curriculum";
import LessonCard from "@/components/LessonCard";
import ChatPanel from "@/components/ChatPanel";
import { useProgress } from "@/lib/use-progress";
import {
  ArrowRight,
  Guitar,
  Headphones,
  Sparkles,
  Star,
  GraduationCap,
  Target,
  BookOpen,
} from "lucide-react";

const FEATURED_IDS = ["lesson-01", "lesson-05", "lesson-11"] as const;

const CLAY_PREVIEW_ROT = ["clay--coral", "clay--mint", "clay--sky"] as const;

export default function Home() {
  const { completedLessons } = useProgress();

  const total = CURRICULUM.length;
  const done = completedLessons.length;
  const pct = Math.round((done / total) * 100);

  const featured = FEATURED_IDS.map((id) => CURRICULUM.find((l) => l.id === id)).filter(Boolean) as NonNullable<
    (typeof CURRICULUM)[0]
  >[];

  const levels = ["beginner", "intermediate", "advanced"] as const;
  const levelLabels = { beginner: "初學者", intermediate: "進階", advanced: "高階" };
  const levelDesc = {
    beginner: "從持琴、調音到和弦與節奏",
    intermediate: "強力和弦、五聲與表情技巧",
    advanced: "即興與高階演奏技術",
  };

  const demoFilled = 7;

  return (
    <div className="landing-playful text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Hero */}
        <section className="mb-12 sm:mb-16">
          <div className="relative">
            <div
              className="pointer-events-none absolute -left-6 -top-10 h-36 w-36 rounded-full bg-[oklch(0.72_0.2_320/0.25)] blur-3xl motion-reduce:opacity-60"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-[oklch(0.75_0.18_55/0.22)] blur-3xl motion-reduce:opacity-60"
              aria-hidden
            />
            <div className="relative mx-auto max-w-4xl text-center">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[oklch(0.22_0.05_280/0.55)] px-4 py-2 text-xs font-bold text-primary ring-1 ring-primary/35 backdrop-blur-sm">
                <Sparkles size={15} strokeWidth={2.5} className="shrink-0 text-amber-300" aria-hidden />
                電吉他自學：單元、講義與練習輔助
              </p>
              <h1 className="text-balance text-[1.85rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
                依{" "}
                <span className="bg-gradient-to-r from-fuchsia-300 via-amber-200 to-cyan-300 bg-clip-text text-transparent">
                  單元順序
                </span>
                練習
                <br className="hidden sm:block" />
                搭配講義與即時問答
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-muted-foreground sm:text-lg">
                本站提供結構化課程、指法示意與延伸資源；練習時可對照講義，有需要再使用側欄問答整理觀念。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/lesson/lesson-01"
                  className="clay clay--sun clay-hover inline-flex min-h-12 items-center gap-2 px-7 text-sm font-bold shadow-none"
                >
                  <BookOpen size={18} aria-hidden />
                  從第一課開始
                  <ArrowRight size={18} aria-hidden />
                </Link>
                <a
                  href="#courses"
                  className="clay clay--ink clay-hover inline-flex min-h-12 items-center gap-2 px-6 text-sm font-semibold shadow-none"
                >
                  <GraduationCap size={18} aria-hidden />
                  瀏覽完整課表
                </a>
              </div>
              <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
                <div className="clay clay--coral flex items-center gap-2 px-4 py-2.5 text-sm font-semibold">
                  <Target size={17} aria-hidden />
                  {total} 堂結構課程
                </div>
                <div className="clay clay--mint flex items-center gap-2 px-4 py-2.5 text-sm font-semibold">
                  <Sparkles size={17} aria-hidden />
                  練習問答輔助
                </div>
                <div className="clay clay--sky flex items-center gap-2 px-4 py-2.5 text-sm font-semibold">
                  <Headphones size={17} aria-hidden />
                  賞析入門專區
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-10">
          <div className="space-y-14 lg:col-span-2">
            {/* Course catalog preview */}
            <section aria-labelledby="preview-heading">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 id="preview-heading" className="text-xl font-bold tracking-tight text-card-foreground sm:text-2xl">
                    單元預覽
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    節選不同階段的代表單元，可由此進入完整內容。
                  </p>
                </div>
                <a
                  href="#courses"
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline sm:shrink-0"
                >
                  看全部 {total} 課 →
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {featured.map((lesson, i) => (
                  <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.id}`}
                    className={`clay ${CLAY_PREVIEW_ROT[i] ?? "clay--lilac"} clay-hover block p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  >
                    <span className="mb-2 inline-flex rounded-full bg-[oklch(0.99_0.02_0/0.28)] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ring-1 ring-[oklch(0_0_0/0.08)]">
                      {levelLabels[lesson.level]}
                    </span>
                    <h3 className="mt-2 text-base font-bold leading-snug">{lesson.title}</h3>
                    <p className="clay-muted mt-2 line-clamp-3 text-xs leading-relaxed sm:text-sm">{lesson.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
                      前往單元
                      <ArrowRight size={16} aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Progress demo + your progress */}
            <section aria-labelledby="progress-heading" className="grid gap-5 sm:grid-cols-2">
              <div id="progress-heading" className="sr-only">
                學習進度與示範
              </div>
              <div className="clay clay--sky p-6 sm:p-7">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.99_0.02_0/0.25)] ring-1 ring-[oklch(0_0_0/0.08)]">
                    <Target size={20} aria-hidden />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">示範：累積式進度</h2>
                    <p className="text-xs opacity-80">假設常態下約完成前段單元</p>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed opacity-85">
                  每完成一堂可標記完成；進度條會反映目前已讀單元比例。
                </p>
                <div className="mb-3 flex flex-wrap gap-2" role="list" aria-label="示範：12 課完成格">
                  {Array.from({ length: total }, (_, idx) => {
                    const on = idx < demoFilled;
                    return (
                      <span
                        key={idx}
                        role="listitem"
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ring-1 transition-colors ${
                          on
                            ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white ring-emerald-700/25 shadow-inner"
                            : "bg-[oklch(0.99_0.01_0/0.2)] ring-[oklch(0_0_0/0.1)] text-[oklch(0.35_0.05_250)]"
                        }`}
                      >
                        {idx + 1}
                      </span>
                    );
                  })}
                </div>
                <div
                  className="h-3 overflow-hidden rounded-full bg-[oklch(0.35_0.06_250/0.2)] ring-1 ring-[oklch(0_0_0/0.12)]"
                  role="progressbar"
                  aria-valuenow={Math.round((demoFilled / total) * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="示範完成度"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 motion-reduce:transition-none"
                    style={{ width: `${Math.round((demoFilled / total) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-[0.7rem] font-medium opacity-75">
                  示範約 {Math.round((demoFilled / total) * 100)}% · 實際進度見右欄
                </p>
              </div>

              <div className="clay clay--lilac flex flex-col p-6 sm:p-7">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.99_0.02_0/0.25)] ring-1 ring-[oklch(0_0_0/0.08)]">
                    <Star size={20} className="fill-amber-400 text-amber-600" aria-hidden />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">你的真實進度</h2>
                    <p className="text-xs opacity-80">存在這台裝置，隨開隨讀</p>
                  </div>
                </div>
                <p className="mb-4 text-3xl font-black tabular-nums">
                  {done}{" "}
                  <span className="text-lg font-semibold opacity-70">/ {total} 課</span>
                </p>
                <div
                  className="mb-3 h-3 overflow-hidden rounded-full bg-[oklch(0.35_0.06_280/0.22)] ring-1 ring-[oklch(0_0_0/0.1)]"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`已完成 ${pct} 百分比課程`}
                >
                  <div
                    className="motion-reduce:transition-none h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-400 transition-[width] duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-auto text-sm font-semibold opacity-85">
                  {done === 0
                    ? "從第一課開始，進度條就會跟著動起來。"
                    : `已完成 ${pct}%，可繼續下一單元。`}
                </p>
              </div>
            </section>

            {/* Quick link: listen */}
            <Link
              href="/listen"
              className="clay clay--mint clay-hover group flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[oklch(0.99_0.02_0/0.28)] ring-1 ring-[oklch(0_0_0/0.08)]">
                  <Headphones size={24} strokeWidth={2.25} className="text-emerald-900" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-bold">吉他手賞析補給站</h2>
                  <p className="mt-1 text-sm opacity-85 leading-relaxed">
                    學會「怎麼聽」：入門角度、推薦樂手與可靠連結。
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 self-end text-sm font-bold sm:self-center">
                前往賞析
                <ArrowRight className="transition group-hover:translate-x-0.5" size={18} aria-hidden />
              </span>
            </Link>

            {/* Full curriculum */}
            <div id="courses" className="scroll-mt-24">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Guitar className="h-5 w-5 text-primary/80" strokeWidth={2} aria-hidden />
                <span className="text-sm font-medium">完整課程路線</span>
              </div>
              {levels.map((level) => {
                const lessons = CURRICULUM.filter((l) => l.level === level);
                return (
                  <section key={level} className="mt-8 scroll-mt-24">
                    <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="text-lg font-bold tracking-tight text-card-foreground">
                        {levelLabels[level]}
                      </h2>
                      <span className="text-sm text-muted-foreground">{levelDesc[level]}</span>
                    </div>
                    <div className="space-y-3">
                      {lessons.map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          completed={completedLessons.includes(lesson.id)}
                          index={CURRICULUM.indexOf(lesson)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          <aside className="lg:sticky lg:top-[4.75rem] lg:self-start">
            <div className="surface-glass flex h-[min(36rem,calc(100vh-5.5rem))] min-h-[28rem] flex-col overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-soft-lg)]">
              <ChatPanel />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
