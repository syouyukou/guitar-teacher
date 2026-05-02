"use client";

import { CURRICULUM, type Lesson, getLessonById } from "@/lib/curriculum";
import { markComplete, markIncomplete, saveNote } from "@/lib/progress";
import { useProgress } from "@/lib/use-progress";
import ChatPanel from "@/components/ChatPanel";
import { HandoutFigure } from "@/components/handout-figures";
import LessonHandout from "@/components/LessonHandout";
import VideoSearch from "@/components/VideoSearch";
import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  BookOpen,
  FileText,
  Video,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Music2,
  ExternalLink,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getProgress } from "@/lib/progress";
import { getLessonHomeworkVideos } from "@/lib/lesson-homework-videos";

type Tab = "learn" | "handout" | "videos" | "chat";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lesson = getLessonById(id);
  if (!lesson) {
    // #region agent log
    fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
      body: JSON.stringify({
        sessionId: "bf1987",
        runId: "pre-fix",
        hypothesisId: "H5",
        location: "lesson/[id]/page.tsx:LessonPage",
        message: "lesson id not found before notFound",
        data: { idLen: typeof id === "string" ? id.length : -1 },
      }),
    }).catch(() => {});
    // #endregion
    notFound();
  }
  return <LessonView key={lesson.id} lesson={lesson} />;
}

function LessonView({ lesson }: { lesson: Lesson }) {
  const progress = useProgress();
  const completed = progress.completedLessons.includes(lesson.id);
  const [note, setNote] = useState(() => getProgress().notes[lesson.id] ?? "");
  const [activeTab, setActiveTab] = useState<Tab>("learn");

  const currentIndex = CURRICULUM.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? CURRICULUM[currentIndex - 1] : null;
  const nextLesson = currentIndex < CURRICULUM.length - 1 ? CURRICULUM[currentIndex + 1] : null;

  const { homework, videoResources } = getLessonHomeworkVideos(lesson);

  function toggleComplete() {
    if (completed) markIncomplete(lesson.id);
    else markComplete(lesson.id);
  }

  function handleNoteBlur() {
    saveNote(lesson.id, note);
  }

  const levelChip = {
    beginner: "bg-success/15 text-success ring-success/25",
    intermediate: "bg-amber-500/12 text-amber-200 ring-amber-400/25",
    advanced: "bg-danger/15 text-danger ring-danger/25",
  };
  const levelLabels = { beginner: "初學", intermediate: "進階", advanced: "高階" };

  const lessonContext = `課程名稱：${lesson.title}
課程說明：${lesson.description}
學習主題：${lesson.topics.join("、")}
五年課程第 ${lesson.planYear} 年；全課程序號第 ${currentIndex + 1}／${CURRICULUM.length} 單元。
建議練習曲：${lesson.practiceSong.title}（${lesson.practiceSong.artist}）${lesson.practiceSong.hint ? ` — ${lesson.practiceSong.hint}` : ""}
課後作業要點：${homework.join("；")}`;

  return (
    <div className="text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            <ArrowLeft size={15} strokeWidth={2.25} aria-hidden />
            返回課程列表
          </Link>
          <span className="hidden text-border sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/listen"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            吉他手賞析專區
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                五年課程 · 第 {lesson.planYear} 年
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" aria-hidden>
                ·
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                第 {currentIndex + 1}／{CURRICULUM.length} 單元
              </span>
              <span
                className={`rounded-md px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ring-1 ${levelChip[lesson.level]}`}
              >
                {levelLabels[lesson.level]}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl">
              {lesson.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-muted-foreground sm:text-base">
              {lesson.description}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleComplete}
            className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-[background-color,box-shadow,color] duration-200 ease-out ring-1 ${
              completed
                ? "bg-success/15 text-success ring-success/35 hover:bg-success/23"
                : "surface-inset text-card-foreground ring-border hover:bg-muted/85"
            }`}
          >
            {completed ? <CheckCircle2 size={18} strokeWidth={2.25} /> : <Circle size={18} />}
            {completed ? "已完成" : "標記完成"}
          </button>
        </div>

        <div
          className="surface-inset mb-8 inline-flex flex-wrap gap-1 rounded-[var(--radius)] p-1.5 ring-1 ring-border/70"
          role="tablist"
          aria-label="課程分頁"
        >
          {(
            [
              { id: "learn" as Tab, label: "學習內容", icon: BookOpen },
              { id: "handout" as Tab, label: "講義與配圖", icon: FileText },
              { id: "videos" as Tab, label: "影片搜尋", icon: Video },
              { id: "chat" as Tab, label: "問老師", icon: MessageSquare },
            ] as const
          ).map(({ id: tabId, label, icon: Icon }) => (
            <button
              key={tabId}
              id={`tab-${tabId}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tabId}
              aria-controls={`panel-${tabId}`}
              onClick={() => setActiveTab(tabId)}
              className={`flex min-h-11 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 ease-out sm:px-4 ${
                activeTab === tabId
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:bg-muted/55 hover:text-foreground"
              }`}
            >
              <Icon size={15} strokeWidth={activeTab === tabId ? 2.25 : 2} />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {activeTab === "handout" && (
              <div role="tabpanel" id="panel-handout" aria-labelledby="tab-handout">
                <LessonHandout lessonId={lesson.id} />
              </div>
            )}

            {activeTab === "learn" && (
              <div className="space-y-6" role="tabpanel" id="panel-learn" aria-labelledby="tab-learn">
                <div className="surface-glass space-y-3 rounded-[var(--radius)] p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-sm font-semibold text-card-foreground">指法與和弦圖</h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("handout")}
                      className="text-left text-xs font-medium text-primary hover:underline sm:text-right"
                    >
                      完整講義、來源與生圖提示 →
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    圖為教學示意；細節請搭配「講義與配圖」或影片校正。
                  </p>
                  <HandoutFigure lessonId={lesson.id} />
                </div>

                <div className="surface-glass rounded-[var(--radius)] p-5 sm:p-6">
                  <h2 className="mb-4 text-sm font-semibold text-card-foreground">本課學習主題</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {lesson.topics.map((topic) => (
                      <div
                        key={topic}
                        className="surface-inset flex items-center gap-2 rounded-xl px-3.5 py-2.5 ring-1 ring-border/50"
                      >
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-primary"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                        <span className="text-sm text-card-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-glass rounded-[var(--radius)] p-5 sm:p-6">
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                    <Music2 size={18} className="text-primary" aria-hidden />
                    建議練習曲（對照本課技巧）
                  </h2>
                  <p className="text-base font-semibold text-card-foreground">
                    {lesson.practiceSong.title}
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {lesson.practiceSong.artist}
                    </span>
                  </p>
                  {lesson.practiceSong.hint ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lesson.practiceSong.hint}</p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lesson.practiceSong.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border/80 bg-muted/40 px-3 py-2 text-xs font-semibold text-primary transition-[border-color,background-color] duration-200 hover:border-primary/40 hover:bg-primary/10"
                      >
                        {link.label}
                        <ExternalLink size={12} className="opacity-80" aria-hidden />
                      </a>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    連結以搜尋結果為主，可依版權與習慣自選教學影片或譜例；版權歸原著作權人。
                  </p>
                </div>

                <div className="surface-glass rounded-[var(--radius)] p-5 sm:p-6">
                  <h2 className="mb-3 text-sm font-semibold text-card-foreground">課後作業</h2>
                  <p className="mb-3 text-xs text-muted-foreground">
                    以下參考常見「每週帶回家練習」形式（如社大、音樂教室課綱）；可依時間刪減，但建議至少完成一項並簡單記錄。
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-card-foreground">
                    {homework.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="surface-glass rounded-[var(--radius)] p-5 sm:p-6">
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                    <Video size={18} className="text-primary" aria-hidden />
                    建議觀看（中文內容優先）
                  </h2>
                  <p className="mb-3 text-xs text-muted-foreground">
                    連結為搜尋結果頁，方便以中文關鍵字挑選講解；版權與教學品質請自行判斷，亦可搭配本課「影片搜尋」分頁。
                  </p>
                  <ul className="space-y-3">
                    {videoResources.map((v) => (
                      <li key={v.href}>
                        <a
                          href={v.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-wrap items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {v.title}
                          <ExternalLink size={12} className="shrink-0 opacity-80" aria-hidden />
                        </a>
                        {v.note ? <p className="mt-1 text-xs text-muted-foreground">{v.note}</p> : null}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="surface-glass rounded-[var(--radius)] p-5 sm:p-6">
                  <h2 className="mb-3 text-sm font-semibold text-card-foreground">我的練習筆記</h2>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onBlur={handleNoteBlur}
                    placeholder="記錄練習心得、需要注意的地方、困難點..."
                    className="surface-inset min-h-32 w-full resize-none rounded-xl p-3 text-sm text-card-foreground outline-none ring-1 ring-border/60 placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">離開輸入框時自動儲存</p>
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div
                className="surface-glass rounded-[var(--radius)] p-5 sm:p-6"
                role="tabpanel"
                id="panel-videos"
                aria-labelledby="tab-videos"
              >
                <h2 className="mb-4 text-sm font-semibold text-card-foreground">搜尋教學影片與資源</h2>
                <VideoSearch defaultQuery={lesson.youtubeSearch} youtubeTopic={lesson.youtubeSearch} />
              </div>
            )}

            {activeTab === "chat" && (
              <div
                className="surface-glass h-[500px] overflow-hidden rounded-[var(--radius)]"
                role="tabpanel"
                id="panel-chat"
                aria-labelledby="tab-chat"
              >
                <ChatPanel lessonContext={lessonContext} />
              </div>
            )}
          </div>

          {(activeTab === "learn" || activeTab === "handout") && (
            <div className="hidden h-[500px] lg:block">
              <div className="surface-glass h-full overflow-hidden rounded-[var(--radius)]">
                <ChatPanel lessonContext={lessonContext} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {prevLesson ? (
            <Link
              href={`/lesson/${prevLesson.id}`}
              className="group flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary motion-safe:transition-transform motion-safe:group-hover:-translate-x-0.5"
            >
              <ChevronLeft size={18} aria-hidden className="shrink-0" />
              <span className="min-w-0 truncate">上一課：{prevLesson.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/lesson/${nextLesson.id}`}
              className="group flex min-h-11 items-center justify-end gap-2 rounded-lg px-1 text-right text-sm text-muted-foreground transition-colors duration-200 hover:text-primary sm:text-left motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
            >
              <span className="min-w-0 truncate">下一課：{nextLesson.title}</span>
              <ChevronRight size={18} aria-hidden className="shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
