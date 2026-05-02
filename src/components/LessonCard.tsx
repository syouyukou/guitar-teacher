"use client";

import { Lesson } from "@/lib/curriculum";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  lesson: Lesson;
  completed: boolean;
  index: number;
};

const levelChip = {
  beginner: "bg-success/15 text-success ring-success/25",
  intermediate: "bg-amber-500/12 text-amber-200 ring-amber-400/25",
  advanced: "bg-danger/15 text-danger ring-danger/25",
};

const levelLabels = {
  beginner: "初學",
  intermediate: "進階",
  advanced: "高階",
};

export default function LessonCard({ lesson, completed, index }: Props) {
  return (
    <Link href={`/lesson/${lesson.id}`} className="block rounded-[var(--radius)]">
      <article
        className="group surface-glass flex min-h-[4.25rem] cursor-pointer items-center gap-4 rounded-[var(--radius)] p-4 transition-[transform,box-shadow] duration-200 ease-out motion-safe:active:scale-[0.99] sm:p-5 sm:pr-6 motion-safe:hover:shadow-[var(--shadow-soft-lg)] motion-safe:hover:ring-1 motion-safe:hover:ring-primary/25"
        role="article"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/90 text-sm font-bold tabular-nums text-muted-foreground ring-1 ring-border/60 transition group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/25">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-card-foreground sm:text-[0.9375rem]">
              {lesson.title}
            </h3>
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ring-1 ${levelChip[lesson.level]}`}
            >
              {levelLabels[lesson.level]}
            </span>
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground sm:line-clamp-1">
            {lesson.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {completed ? (
            <CheckCircle2 size={22} className="text-success" strokeWidth={2.25} />
          ) : (
            <Circle size={22} className="text-border" strokeWidth={2} />
          )}
          <ChevronRight
            size={18}
            className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
            strokeWidth={2}
          />
        </div>
      </article>
    </Link>
  );
}
