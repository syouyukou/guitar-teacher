"use client";

import { CURRICULUM } from "@/lib/curriculum";
import LessonCard from "@/components/LessonCard";
import ChatPanel from "@/components/ChatPanel";
import { useProgress } from "@/lib/use-progress";

export default function Home() {
  const { completedLessons } = useProgress();

  const total = CURRICULUM.length;
  const done = completedLessons.length;
  const pct = Math.round((done / total) * 100);

  const levels = ["beginner", "intermediate", "advanced"] as const;
  const levelLabels = { beginner: "🟢 初學者", intermediate: "🟡 進階", advanced: "🔴 高階" };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl">
            🎸
          </div>
          <div>
            <h1 className="text-2xl font-bold">我的電吉他老師</h1>
            <p className="text-gray-400 text-sm">一步一步，從零到搖滾</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">學習進度</span>
            <span className="text-sm font-bold text-orange-400">{done} / {total} 課完成 ({pct}%)</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Curriculum */}
          <div className="lg:col-span-2 space-y-6">
            {levels.map((level) => {
              const lessons = CURRICULUM.filter((l) => l.level === level);
              return (
                <div key={level}>
                  <h2 className="text-base font-semibold text-gray-300 mb-3">{levelLabels[level]}</h2>
                  <div className="space-y-2">
                    {lessons.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        completed={completedLessons.includes(lesson.id)}
                        index={CURRICULUM.indexOf(lesson)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat */}
          <div className="h-[600px] lg:sticky lg:top-8">
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
