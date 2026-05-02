"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";

type Props = {
  lessonContext?: string;
};

export default function ChatPanel({ lessonContext }: Props) {
  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: { lessonContext },
    }),
  });
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!error) return;
    // #region agent log
    fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
      body: JSON.stringify({
        sessionId: "bf1987",
        runId: "pre-fix",
        hypothesisId: "H2",
        location: "ChatPanel.tsx:useEffect:error",
        message: "useChat error set",
        data: {
          name: error.name,
          message: error.message.slice(0, 200),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, [error]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ role: "user", parts: [{ type: "text", text: input }] });
    setInput("");
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 rounded-xl border border-gray-800">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
        <Bot size={18} className="text-orange-400" />
        <span className="font-semibold text-white text-sm">吉他師傅 AI</span>
        <span className="ml-auto text-xs text-gray-500">即時問答</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8 space-y-2">
            <p className="text-2xl">🎸</p>
            <p>嗨！我是你的吉他師傅。</p>
            <p>有任何關於電吉他的問題，盡管問我！</p>
          </div>
        )}
        {messages.map((m) => {
          const textContent = m.parts
            ?.filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("") ?? "";
          return (
            <div
              key={m.id}
              className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.role === "user" ? "bg-orange-500" : "bg-gray-700"
                }`}
              >
                {m.role === "user" ? (
                  <User size={14} className="text-white" />
                ) : (
                  <Bot size={14} className="text-orange-400" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                {textContent}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
              <Bot size={14} className="text-orange-400" />
            </div>
            <div className="bg-gray-800 rounded-xl px-3 py-2 text-sm text-gray-400">
              <span className="animate-pulse">思考中...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="問吉他師傅任何問題..."
          className="flex-1 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-orange-500 placeholder-gray-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white rounded-lg px-3 py-2 transition-colors"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
