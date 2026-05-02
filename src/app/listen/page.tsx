import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, BookMarked, Headphones, Sparkles } from "lucide-react";
import { APPRECIATION_COLUMN_STORIES, APPRECIATION_INTRO } from "@/lib/guitar-appreciation";
import { ListenBrowse } from "@/components/ListenBrowse";

export const metadata: Metadata = {
  title: "吉他手賞析｜我的電吉他老師",
  description: "入門如何欣賞電吉他：曲風導覽、經典樂手瀑布流瀏覽、專欄小故事與延伸閱讀。",
};

export default function ListenPage() {
  return (
    <div className="text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 pb-20 sm:px-6">
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
                <h1 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">吉他手賞析專區</h1>
                <p className="mt-2 text-sm leading-[1.7] text-muted-foreground sm:text-base">
                  可依曲風切換經典參考路徑，採瀑布流輕鬆瀏覽；另有專欄從編曲、空間與律動等角度認識音樂。
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
          <p className="border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">{APPRECIATION_INTRO.note}</p>
        </section>

        <section className="mb-14">
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/28">
              <BookMarked size={20} strokeWidth={2} aria-hidden />
            </span>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-card-foreground">專欄 · 換個角度看音樂</h2>
              <p className="text-sm text-muted-foreground">不談哪位樂手，而是聽覺習慣與歷史層次的補給短文。</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {APPRECIATION_COLUMN_STORIES.map((col) => (
              <article
                key={col.id}
                className="surface-glass h-fit rounded-[var(--radius)] p-5 shadow-[var(--shadow-soft)] ring-1 ring-border/40 sm:p-6"
              >
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-widest text-primary">{col.angle}</p>
                <h3 className="text-base font-bold text-card-foreground">{col.title}</h3>
                <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">{col.body}</p>
              </article>
            ))}
          </div>
        </section>

        <ListenBrowse />
      </div>
    </div>
  );
}
