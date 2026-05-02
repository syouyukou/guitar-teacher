import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Headphones } from "lucide-react";
import { APPRECIATION_INTRO, FEATURED_GUITARISTS } from "@/lib/guitar-appreciation";

export const metadata: Metadata = {
  title: "吉他手賞析｜我的電吉他老師",
  description: "入門如何欣賞電吉他與推薦樂手，附百科與影片搜尋連結。",
};

export default function ListenPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-8 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          返回課程列表
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-orange-500/20 border border-orange-500/40 rounded-xl flex items-center justify-center">
            <Headphones className="text-orange-400" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">吉他手賞析專區</h1>
            <p className="text-gray-400 text-sm">帶你入門怎麼聽、聽什麼，並附上可查證與可看影片的連結</p>
          </div>
        </div>

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10 space-y-5">
          <h2 className="text-orange-400 text-sm font-semibold tracking-wide">
            {APPRECIATION_INTRO.title}
          </h2>
          <div className="space-y-4">
            {APPRECIATION_INTRO.principles.map((p) => (
              <div key={p.heading}>
                <h3 className="text-white text-sm font-medium mb-1">{p.heading}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-800 pt-4">
            {APPRECIATION_INTRO.note}
          </p>
        </section>

        <h2 className="text-lg font-semibold text-white mb-4">推薦從這幾位聽起</h2>
        <ul className="space-y-5">
          {FEATURED_GUITARISTS.map((g) => (
            <li
              key={g.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg shadow-black/20"
            >
              <h3 className="text-base font-bold text-white mb-1">{g.name}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{g.tagline}</p>
              <div className="mb-4">
                <span className="text-xs font-medium text-orange-400/90 uppercase tracking-wider">
                  入門可以注意聽
                </span>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-300 list-disc list-inside">
                  {g.listenFor.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-gray-800 text-sky-400 hover:text-sky-300 hover:bg-gray-700 border border-gray-700 transition-colors"
                  >
                    {link.label}
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
