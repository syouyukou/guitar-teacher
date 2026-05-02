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
} from "lucide-react";
import { notFound } from "next/navigation";
import { getProgress } from "@/lib/progress";

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

  function toggleComplete() {
    if (completed) markIncomplete(lesson.id);
    else markComplete(lesson.id);
  }

  function handleNoteBlur() {
    saveNote(lesson.id, note);
  }

  const levelColors = {
    beginner: "text-green-400 bg-green-400/10",
    intermediate: "text-yellow-400 bg-yellow-400/10",
    advanced: "text-red-400 bg-red-400/10",
  };
  const levelLabels = { beginner: "初學", intermediate: "進階", advanced: "高階" };

  const lessonContext = `課程名稱：${lesson.title}
課程說明：${lesson.description}
學習主題：${lesson.topics.join("、")}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          返回課程列表
        </Link>

        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400 text-sm">第 {currentIndex + 1} 課</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${levelColors[lesson.level]}`}>
                {levelLabels[lesson.level]}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="text-gray-400 text-sm mt-1">{lesson.description}</p>
          </div>
          <button
            onClick={toggleComplete}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
              completed
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            {completed ? "已完成" : "標記完成"}
          </button>
        </div>

        <div className="flex gap-1 mb-6 bg-gray-900 p-1 rounded-xl w-fit">
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
              onClick={() => setActiveTab(tabId)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tabId
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === "handout" && <LessonHandout lessonId={lesson.id} />}

            {activeTab === "learn" && (
              <div className="space-y-6">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-sm font-semibold text-gray-300">指法與和弦圖</h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("handout")}
                      className="text-xs text-orange-400 hover:text-orange-300 text-left sm:text-right"
                    >
                      完整講義、來源與生圖提示 →
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    圖為教學示意；細節請搭配「講義與配圖」或影片校正。
                  </p>
                  <HandoutFigure lessonId={lesson.id} />
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h2 className="text-sm font-semibold text-gray-300 mb-4">本課學習主題</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {lesson.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                        <span className="text-orange-400 text-xs">▸</span>
                        <span className="text-gray-200 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h2 className="text-sm font-semibold text-gray-300 mb-3">我的練習筆記</h2>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onBlur={handleNoteBlur}
                    placeholder="記錄練習心得、需要注意的地方、困難點..."
                    className="w-full h-32 bg-gray-800 text-gray-200 text-sm rounded-lg p-3 outline-none focus:ring-1 focus:ring-orange-500 placeholder-gray-500 resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-1">離開輸入框時自動儲存</p>
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-gray-300 mb-4">搜尋教學影片與資源</h2>
                <VideoSearch defaultQuery={lesson.youtubeSearch} youtubeTopic={lesson.youtubeSearch} />
              </div>
            )}

            {activeTab === "chat" && (
              <div className="h-[500px]">
                <ChatPanel lessonContext={lessonContext} />
              </div>
            )}
          </div>

          {(activeTab === "learn" || activeTab === "handout") && (
            <div className="hidden lg:block h-[500px]">
              <ChatPanel lessonContext={lessonContext} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
          {prevLesson ? (
            <Link
              href={`/lesson/${prevLesson.id}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
              <span>上一課：{prevLesson.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/lesson/${nextLesson.id}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>下一課：{nextLesson.title}</span>
              <ChevronRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
