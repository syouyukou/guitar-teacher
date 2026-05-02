"use client";

import { getLessonHandout, SOURCE_VERIFICATION_BLURB } from "@/lib/lesson-handouts";
import { HandoutFigure } from "@/components/handout-figures";
import { BookMarked, ImageIcon, Library } from "lucide-react";
import { useState } from "react";

export default function LessonHandout({ lessonId }: { lessonId: string }) {
  const handout = getLessonHandout(lessonId);
  const [showPrompt, setShowPrompt] = useState(false);

  if (!handout) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-sm text-gray-500">
        此課尚無講義內容。
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl p-4">
        <BookMarked className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-amber-200/90 leading-relaxed">
          以下講義由本站依公開資料與教學慣例編寫、附示意圖；實際指法與音色請搭配影片、譜例或面對面老師調整。切勿將示意圖視為唯一標準。
        </p>
      </div>

      <HandoutFigure lessonId={lessonId} />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-6">
        {handout.sections.map((sec) => (
          <section key={sec.heading}>
            <h3 className="text-orange-400 text-sm font-semibold mb-2">{sec.heading}</h3>
            <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
              {sec.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {handout.howToSteps && handout.howToSteps.length > 0 && (
          <section>
            <h3 className="text-orange-400 text-sm font-semibold mb-2">練習步驟</h3>
            <ol className="list-decimal list-inside space-y-1.5 text-gray-300 text-sm leading-relaxed">
              {handout.howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {handout.tips && handout.tips.length > 0 && (
          <section>
            <h3 className="text-orange-400 text-sm font-semibold mb-2">小提醒</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
              {handout.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowPrompt((v) => !v)}
          className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm font-medium text-gray-200 hover:bg-gray-800/80 transition-colors"
        >
          <ImageIcon size={16} className="text-orange-400 flex-shrink-0" />
          <span>配圖用英文提示詞（給圖像生成或設計師）</span>
          <span className="ml-auto text-xs text-gray-500">{showPrompt ? "收合" : "展開"}</span>
        </button>
        {showPrompt && (
          <div className="px-4 pb-4 pt-0">
            <pre className="text-xs text-gray-400 whitespace-pre-wrap break-words bg-gray-950 rounded-lg p-3 border border-gray-800 font-mono leading-relaxed">
              {handout.imagePromptEn}
            </pre>
          </div>
        )}
      </div>

      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Library size={16} className="text-orange-400" />
          <h3 className="text-sm font-semibold text-gray-200">參考與資料來源</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 border-l-2 border-amber-500/50 pl-3">
          {SOURCE_VERIFICATION_BLURB}
        </p>
        <ul className="space-y-3 text-sm text-gray-400">
          {handout.sources.map((s) => (
            <li key={s.url ?? s.title} className="leading-relaxed">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
                >
                  {s.title}
                </a>
              ) : (
                <span className="text-gray-300">{s.title}</span>
              )}
              {s.accessed && (
                <span className="text-gray-600 text-xs ml-2">（存取：{s.accessed}）</span>
              )}
              {s.note && <p className="text-xs text-gray-500 mt-1">{s.note}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
