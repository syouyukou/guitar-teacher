"use client";

import { getLessonHandout, SOURCE_VERIFICATION_BLURB } from "@/lib/lesson-handouts";
import { HandoutFigure } from "@/components/handout-figures";
import { BookMarked, ChevronDown, ImageIcon, Library } from "lucide-react";
import { useState } from "react";

export default function LessonHandout({ lessonId }: { lessonId: string }) {
  const handout = getLessonHandout(lessonId);
  const [showPrompt, setShowPrompt] = useState(false);

  if (!handout) {
    return (
      <div className="surface-glass rounded-2xl p-6 text-sm text-muted-foreground">此課尚無講義內容。</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="surface-glass flex items-start gap-3 rounded-2xl border border-primary/20 p-4 sm:p-5">
        <BookMarked className="mt-0.5 shrink-0 text-primary" size={20} strokeWidth={2.25} />
        <p className="text-sm leading-relaxed text-card-foreground">
          以下講義由本站依公開資料與教學慣例編寫、附示意圖；實際指法與音色請搭配影片、譜例或面對面老師調整。切勿將示意圖視為唯一標準。
        </p>
      </div>

      <HandoutFigure lessonId={lessonId} />

      <div className="surface-glass space-y-6 rounded-2xl p-5 sm:p-6">
        {handout.sections.map((sec) => (
          <section key={sec.heading}>
            <h3 className="mb-2 text-sm font-semibold text-primary">{sec.heading}</h3>
            <div className="space-y-2 text-sm leading-relaxed text-card-foreground">
              {sec.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {handout.howToSteps && handout.howToSteps.length > 0 && (
          <section>
            <h3 className="mb-2 text-sm font-semibold text-primary">練習步驟</h3>
            <ol className="list-inside list-decimal space-y-1.5 text-sm leading-relaxed text-card-foreground">
              {handout.howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {handout.tips && handout.tips.length > 0 && (
          <section>
            <h3 className="mb-2 text-sm font-semibold text-primary">小提醒</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {handout.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="surface-glass overflow-hidden rounded-2xl">
        <button
          type="button"
          onClick={() => setShowPrompt((v) => !v)}
          className="flex w-full items-center gap-2 px-4 py-3.5 text-left text-sm font-medium text-card-foreground transition hover:bg-muted/40"
        >
          <ImageIcon size={17} className="shrink-0 text-primary" strokeWidth={2.25} />
          <span>配圖用英文提示詞（給圖像生成或設計師）</span>
          <ChevronDown
            size={18}
            className={`ml-auto shrink-0 text-muted-foreground transition ${showPrompt ? "rotate-180" : ""}`}
          />
        </button>
        {showPrompt && (
          <div className="border-t border-border/60 px-4 pb-4 pt-0">
            <pre className="surface-inset mt-3 max-h-64 overflow-auto rounded-xl p-4 font-mono text-xs leading-relaxed text-muted-foreground ring-1 ring-border/60">
              {handout.imagePromptEn}
            </pre>
          </div>
        )}
      </div>

      <section className="surface-glass rounded-2xl p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <Library size={18} className="text-primary" strokeWidth={2.25} />
          <h3 className="text-sm font-semibold text-card-foreground">參考與資料來源</h3>
        </div>
        <p className="mb-4 border-l-2 border-primary/50 pl-3 text-xs leading-relaxed text-muted-foreground">
          {SOURCE_VERIFICATION_BLURB}
        </p>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {handout.sources.map((s) => (
            <li key={s.url ?? s.title} className="leading-relaxed">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {s.title}
                </a>
              ) : (
                <span className="text-card-foreground">{s.title}</span>
              )}
              {s.accessed && <span className="ml-2 text-xs opacity-80">（存取：{s.accessed}）</span>}
              {s.note && <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
