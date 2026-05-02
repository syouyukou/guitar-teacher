"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Bot, Guitar, Send, User } from "lucide-react";

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
    <div className="flex h-full flex-col border-0 bg-transparent">
      <div className="flex items-center gap-2 border-b border-border/80 bg-muted/25 px-4 py-3 backdrop-blur-sm">
        <Bot size={18} className="text-primary" strokeWidth={2.25} />
        <span className="text-sm font-semibold text-card-foreground">吉他師傅 AI</span>
        <span className="ml-auto text-xs text-muted-foreground">即時問答</span>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="mt-8 space-y-3 text-center text-sm text-muted-foreground">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 ring-1 ring-primary/25">
              <Guitar className="h-8 w-8 text-primary" strokeWidth={2} aria-hidden />
            </div>
            <p className="font-semibold text-card-foreground">嗨，我是吉他師傅。</p>
            <p className="max-w-[16rem] mx-auto leading-relaxed">有任何電吉他的問題都可以問我。</p>
          </div>
        )}
        {messages.map((m) => {
          const textContent =
            m.parts
              ?.filter((p) => p.type === "text")
              .map((p) => (p as { type: "text"; text: string }).text)
              .join("") ?? "";
          return (
            <div
              key={m.id}
              className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ring-1 ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground ring-primary/30"
                    : "bg-muted/90 text-primary ring-border"
                }`}
              >
                {m.role === "user" ? (
                  <User size={14} strokeWidth={2.25} />
                ) : (
                  <Bot size={14} strokeWidth={2.25} />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "surface-inset text-card-foreground ring-1 ring-border/60"
                }`}
              >
                {textContent}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted/90 ring-1 ring-border">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="surface-inset rounded-2xl px-3.5 py-2.5 text-sm text-muted-foreground ring-1 ring-border/60">
              <span className="animate-pulse">思考中…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-border/80 bg-muted/20 p-3 backdrop-blur-sm"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="問吉他師傅任何問題…"
          className="surface-inset flex-1 rounded-xl px-3 py-2.5 text-sm text-card-foreground outline-none ring-1 ring-border/70 placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex shrink-0 items-center justify-center rounded-xl bg-primary px-3.5 py-2.5 text-primary-foreground shadow-md shadow-primary/25 transition hover:brightness-110 disabled:opacity-40"
        >
          <Send size={18} strokeWidth={2.25} />
        </button>
      </form>
    </div>
  );
}
