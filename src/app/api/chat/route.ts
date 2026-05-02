import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const maxDuration = 60;

export async function POST(req: Request) {
  // #region agent log
  fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
    body: JSON.stringify({
      sessionId: "bf1987",
      runId: "pre-fix",
      hypothesisId: "H1",
      location: "api/chat/route.ts:POST:entry",
      message: "chat POST entered",
      data: { hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY) },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  let messages;
  let lessonContext;
  try {
    ({ messages, lessonContext } = await req.json());
  } catch (e) {
    // #region agent log
    fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
      body: JSON.stringify({
        sessionId: "bf1987",
        runId: "pre-fix",
        hypothesisId: "H1",
        location: "api/chat/route.ts:POST:parse",
        message: "req.json failed",
        data: {
          errorName: e instanceof Error ? e.name : "unknown",
          errorMessage: e instanceof Error ? e.message : String(e),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    throw e;
  }
  // #region agent log
  fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
    body: JSON.stringify({
      sessionId: "bf1987",
      runId: "pre-fix",
      hypothesisId: "H1",
      location: "api/chat/route.ts:POST:afterParse",
      message: "body parsed",
      data: {
        messagesIsArray: Array.isArray(messages),
        messagesLen: Array.isArray(messages) ? messages.length : -1,
        hasLessonContext: typeof lessonContext === "string" && lessonContext.length > 0,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  const systemPrompt = `你是一位專業的電吉他老師，名字叫「吉他師傅」。
你的任務是幫助學生學習電吉他，用繁體中文回答問題。

你的教學風格：
- 耐心、鼓勵，適合初學者到進階學習者
- 用具體的例子和比喻解釋技巧
- 當學生問到技巧時，給出清楚的步驟說明
- 適時提醒練習的重要性和正確姿勢

${typeof lessonContext === "string" && lessonContext ? `目前學生正在學習的課程內容：\n${lessonContext}` : ""}

回答時：
- 用繁體中文
- 技術術語可保留英文並附上中文解釋
- 回答要簡潔有重點，必要時可以條列說明
- 可以推薦具體的練習方法或練習曲目`;

  try {
    if (!Array.isArray(messages)) {
      throw new TypeError("messages must be an array");
    }
    const modelMessages = await convertToModelMessages(messages as UIMessage[]);

    // #region agent log
    fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
      body: JSON.stringify({
        sessionId: "bf1987",
        runId: "post-fix",
        hypothesisId: "H1",
        location: "api/chat/route.ts:POST:afterConvert",
        message: "convertToModelMessages done",
        data: { modelMessageCount: modelMessages.length },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const result = streamText({
      model: anthropic("claude-sonnet-4-6"),
      system: systemPrompt,
      messages: modelMessages,
    });
    // #region agent log
    fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
      body: JSON.stringify({
        sessionId: "bf1987",
        runId: "pre-fix",
        hypothesisId: "H1",
        location: "api/chat/route.ts:POST:beforeResponse",
        message: "streamText ok, returning",
        data: {},
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    return result.toTextStreamResponse();
  } catch (e) {
    // #region agent log
    fetch("http://127.0.0.1:7455/ingest/03148ab5-aa7a-4dcf-b708-7abe7b4ab2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf1987" },
      body: JSON.stringify({
        sessionId: "bf1987",
        runId: "pre-fix",
        hypothesisId: "H1",
        location: "api/chat/route.ts:POST:streamTextCatch",
        message: "streamText or toTextStream threw",
        data: {
          errorName: e instanceof Error ? e.name : "unknown",
          errorMessage: e instanceof Error ? e.message : String(e),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    throw e;
  }
}
