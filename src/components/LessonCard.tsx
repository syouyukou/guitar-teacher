"use client";

import { Lesson } from "@/lib/curriculum";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  lesson: Lesson;
  completed: boolean;
  index: number;
};

const levelColors = {
  beginner: "text-green-400 bg-green-400/10",
  intermediate: "text-yellow-400 bg-yellow-400/10",
  advanced: "text-red-400 bg-red-400/10",
};

const levelLabels = {
  beginner: "初學",
  intermediate: "進階",
  advanced: "高階",
};

export default function LessonCard({ lesson, completed, index }: Props) {
  return (
    <Link href={`/lesson/${lesson.id}`}>
      <div className="group flex items-center gap-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-orange-500/50 rounded-xl p-4 transition-all cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-400 flex-shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white text-sm font-semibold truncate">{lesson.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${levelColors[lesson.level]}`}>
              {levelLabels[lesson.level]}
            </span>
          </div>
          <p className="text-gray-400 text-xs truncate">{lesson.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {completed ? (
            <CheckCircle2 size={20} className="text-green-400" />
          ) : (
            <Circle size={20} className="text-gray-600" />
          )}
          <ChevronRight size={16} className="text-gray-500 group-hover:text-orange-400 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
