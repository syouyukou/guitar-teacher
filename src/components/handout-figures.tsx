/** 每課附圖：內嵌 SVG，僅供本站教學示意（非商業譜例）。 */

import type { ReactNode } from "react";

function FigureFrame({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="surface-glass overflow-hidden rounded-2xl ring-1 ring-border/80">
      <div className="flex min-h-[180px] items-center justify-center p-4">{children}</div>
      <figcaption className="border-t border-border/70 bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-sm">
        {caption}
      </figcaption>
    </figure>
  );
}

/** 開放和弦：frets 由左到右為 ⑥→①（低 E → 高 e）；0 空弦，x 悶弦 */
function OpenChordMini({
  name,
  frets,
  dx,
}: {
  name: string;
  frets: (number | "x")[];
  dx: number;
}) {
  const strX = [8, 16, 24, 32, 40, 48];
  const nutY = 18;
  const yFret = (f: number) => nutY + (f - 0.5) * 11.5;

  return (
    <g transform={`translate(${dx},10)`}>
      <rect width="56" height="78" rx="4" fill="#111827" stroke="#475569" />
      <text x="28" y="11" fill="#fb923c" fontSize="9" textAnchor="middle" fontFamily="system-ui">
        {name}
      </text>
      <line x1="6" y1={nutY} x2="50" y2={nutY} stroke="#e2e8f0" strokeWidth="2.5" />
      {[28, 39.5, 51, 62.5].map((y, i) => (
        <line key={i} x1="6" y1={y} x2="50" y2={y} stroke="#334155" strokeWidth="0.9" />
      ))}
      {strX.map((x, si) => (
        <line key={si} x1={x} y1={nutY} x2={x} y2="71" stroke="#475569" strokeWidth="0.9" />
      ))}
      {frets.map((v, si) => {
        const x = strX[si];
        if (v === "x") {
          return (
            <text key={si} x={x} y={nutY - 5} fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="system-ui">
              ×
            </text>
          );
        }
        if (v === 0) {
          return (
            <circle key={si} cx={x} cy={nutY - 4} r="2.8" fill="none" stroke="#64748b" strokeWidth="1" />
          );
        }
        return (
          <circle key={si} cx={x} cy={yFret(v)} r="4.2" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
        );
      })}
    </g>
  );
}

export function HandoutFigure({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case "lesson-01":
      return (
        <FigureFrame caption="電吉他主要部位示意（教學用簡圖）">
          <svg viewBox="0 0 360 200" className="w-full max-w-md h-auto text-gray-200" aria-hidden>
            <rect x="40" y="70" width="200" height="90" rx="14" fill="#1f2937" stroke="#475569" />
            <text x="120" y="115" fill="#fb923c" fontSize="11" textAnchor="middle" fontFamily="system-ui,sans-serif">
              Body 琴身
            </text>
            <rect x="240" y="88" width="90" height="54" rx="6" fill="#111827" stroke="#64748b" />
            <text x="285" y="118" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="system-ui">
              Pickups
            </text>
            <rect x="235" y="80" width="8" height="70" rx="2" fill="#334155" />
            <text x="218" y="75" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="system-ui">
              Bridge
            </text>
            <rect x="30" y="95" width="140" height="40" rx="4" fill="#0f172a" stroke="#475569" />
            <text x="100" y="118" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="system-ui">
              Neck 琴頸 / Frets 品格
            </text>
            <rect x="8" y="92" width="28" height="46" rx="3" fill="#1e293b" stroke="#64748b" />
            <text x="22" y="102" fill="#fb923c" fontSize="8" textAnchor="middle" fontFamily="system-ui">
              琴頭
            </text>
            <circle cx="16" cy="100" r="2" fill="#64748b" />
            <circle cx="16" cy="108" r="2" fill="#64748b" />
            <circle cx="16" cy="116" r="2" fill="#64748b" />
            <circle cx="16" cy="124" r="2" fill="#64748b" />
            <circle cx="16" cy="132" r="2" fill="#64748b" />
            <text x="4" y="148" fill="#64748b" fontSize="7" fontFamily="system-ui">
              Tuners
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-02":
      return (
        <FigureFrame caption="持琴與調音：琴頸略抬高、調音器顯示音名">
          <svg viewBox="0 0 320 160" className="w-full max-w-md h-auto" aria-hidden>
            <ellipse cx="120" cy="130" rx="70" ry="14" fill="#1f2937" />
            <path d="M90 120 Q120 40 200 55 L260 75 L255 95 L185 120 Z" fill="#334155" stroke="#64748b" />
            <path d="M200 55 L240 25 L250 45 L210 70 Z" fill="#1e293b" stroke="#64748b" />
            <text x="245" y="38" fill="#fb923c" fontSize="9" fontFamily="system-ui">
              調音器
            </text>
            <rect x="232" y="42" width="36" height="14" rx="2" fill="#0ea5e9" opacity="0.9" />
            <text x="250" y="52" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace">
              E
            </text>
            <text x="135" y="100" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
              坐姿 · 琴頸抬高
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-03":
      return (
        <FigureFrame caption="Em、Am、D、G、C 開放和弦指法（⑥ 在左、① 在右；× 為不撥該弦）">
          <svg viewBox="0 0 420 96" className="w-full max-w-xl h-auto" aria-hidden>
            <OpenChordMini name="Em" frets={[0, 2, 2, 0, 0, 0]} dx={12} />
            <OpenChordMini name="Am" frets={[0, 0, 2, 2, 1, 0]} dx={88} />
            <OpenChordMini name="D" frets={["x", "x", 0, 2, 3, 2]} dx={164} />
            <OpenChordMini name="G" frets={[3, 2, 0, 0, 0, 3]} dx={240} />
            <OpenChordMini name="C" frets={["x", 3, 2, 0, 1, 0]} dx={316} />
          </svg>
        </FigureFrame>
      );
    case "lesson-04":
      return (
        <FigureFrame caption="下刷 ↑ 上刷 與 悶音位置（靠橋）示意">
          <svg viewBox="0 0 300 120" className="w-full max-w-md h-auto" aria-hidden>
            <text x="40" y="28" fill="#e2e8f0" fontSize="11" fontFamily="system-ui">
              刷弦方向
            </text>
            <path d="M40 50 L90 70 L40 90" fill="none" stroke="#f97316" strokeWidth="2" markerEnd="url(#arr)" />
            <path d="M100 90 L150 70 L100 50" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <text x="40" y="108" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
              橘：下刷　藍：上刷
            </text>
            <rect x="190" y="30" width="90" height="36" rx="4" fill="#1f2937" stroke="#475569" />
            <text x="208" y="50" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
              Palm mute
            </text>
            <rect x="200" y="58" width="70" height="6" rx="2" fill="#64748b" opacity="0.6" />
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#f97316" />
              </marker>
            </defs>
          </svg>
        </FigureFrame>
      );
    case "lesson-05":
      return (
        <FigureFrame caption="強力和弦（根音在⑥弦）：食指根音、無名指與小指各上延兩格／併排">
          <svg viewBox="0 0 380 200" className="w-full max-w-lg h-auto" aria-hidden>
            <text x="12" y="18" fill="#fb923c" fontSize="11" fontFamily="system-ui">
              Power chord · 例：根音第 5 品（實際把位可平移）
            </text>
            <rect x="20" y="32" width="340" height="150" rx="8" fill="#0f172a" stroke="#334155" />
            {[0, 1, 2, 3, 4, 5].map((s) => (
              <line
                key={s}
                x1="40"
                y1={56 + s * 22}
                x2="330"
                y2={56 + s * 22}
                stroke="#1e293b"
                strokeWidth={s === 0 || s === 5 ? 1.5 : 1}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((f) => (
              <line
                key={f}
                x1={88 + f * 38}
                y1="52"
                x2={88 + f * 38}
                y2="170"
                stroke="#334155"
                strokeWidth="1.2"
              />
            ))}
            <text x="55" y="68" fill="#64748b" fontSize="8" fontFamily="system-ui">
              e
            </text>
            <text x="55" y="90" fill="#64748b" fontSize="8" fontFamily="system-ui">
              B
            </text>
            <text x="55" y="112" fill="#64748b" fontSize="8" fontFamily="system-ui">
              G
            </text>
            <text x="55" y="134" fill="#64748b" fontSize="8" fontFamily="system-ui">
              D
            </text>
            <text x="55" y="156" fill="#64748b" fontSize="8" fontFamily="system-ui">
              A
            </text>
            <text x="55" y="178" fill="#64748b" fontSize="8" fontFamily="system-ui">
              E
            </text>
            <text x="102" y="48" fill="#475569" fontSize="7" fontFamily="system-ui">
              5
            </text>
            <text x="140" y="48" fill="#475569" fontSize="7" fontFamily="system-ui">
              6
            </text>
            <text x="178" y="48" fill="#475569" fontSize="7" fontFamily="system-ui">
              7
            </text>
            <circle cx="107" cy="167" r="9" fill="#f97316" stroke="#fb923c" strokeWidth="2" opacity="0.95" />
            <text x="107" y="171" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">
              1
            </text>
            <circle cx="183" cy="145" r="9" fill="#f97316" stroke="#fb923c" strokeWidth="2" />
            <text x="183" y="149" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">
              3
            </text>
            <circle cx="183" cy="123" r="9" fill="#f97316" stroke="#fb923c" strokeWidth="2" />
            <text x="183" y="127" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">
              4
            </text>
            <text x="250" y="188" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
              ⑥弦根 · ⑤④弦併排（五度＋八度）
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-06":
      return (
        <FigureFrame caption="小調五聲常見「盒狀」指型之一（R = 根音）">
          <svg viewBox="0 0 340 180" className="w-full max-w-md h-auto" aria-hidden>
            <rect x="30" y="24" width="280" height="140" rx="8" fill="#111827" stroke="#334155" />
            {Array.from({ length: 6 }).map((_, s) => (
              <line key={s} x1="50" y1={44 + s * 22} x2="290" y2={44 + s * 22} stroke="#1e293b" />
            ))}
            {Array.from({ length: 5 }).map((_, f) => (
              <line key={f} x1={70 + f * 52} y1="36" x2={70 + f * 52} y2="156" stroke="#475569" />
            ))}
            <circle cx="122" cy="100" r="8" fill="#f97316" />
            <text x="122" y="104" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="system-ui">
              R
            </text>
            <circle cx="174" cy="78" r="6" fill="#38bdf8" opacity="0.9" />
            <circle cx="174" cy="122" r="6" fill="#38bdf8" opacity="0.9" />
            <circle cx="226" cy="100" r="6" fill="#38bdf8" opacity="0.9" />
            <text x="30" y="16" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
              範例圖 · 實際把位與調性以老師講解為準
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-07":
      return (
        <FigureFrame caption="推弦：輔助指撐住，往目標音高推升">
          <svg viewBox="0 0 280 120" className="w-full max-w-sm h-auto" aria-hidden>
            <line x1="40" y1="70" x2="220" y2="70" stroke="#475569" strokeWidth="3" />
            <circle cx="120" cy="70" r="10" fill="#f97316" />
            <path d="M120 70 L175 55" fill="none" stroke="#fb923c" strokeWidth="2" strokeDasharray="4 2" />
            <polygon points="175,50 182,58 168,58" fill="#fb923c" />
            <text x="44" y="40" fill="#e2e8f0" fontSize="10" fontFamily="system-ui">
              Bend
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-08":
      return (
        <FigureFrame caption="顫音：規律小幅度搖動以改變音高">
          <svg viewBox="0 0 280 100" className="w-full max-w-sm h-auto" aria-hidden>
            <path
              d="M40 50 Q60 35 80 50 T120 50 T160 50 T200 50"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <circle cx="120" cy="50" r="8" fill="#f97316" />
            <text x="44" y="28" fill="#e2e8f0" fontSize="10" fontFamily="system-ui">
              Vibrato
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-09":
      return (
        <FigureFrame caption="搥弦（向下力）與勾弦（側向勾離）">
          <svg viewBox="0 0 300 110" className="w-full max-w-md h-auto" aria-hidden>
            <text x="20" y="22" fill="#f97316" fontSize="10" fontFamily="system-ui">
              H = hammer-on
            </text>
            <path d="M40 60 L80 60" stroke="#64748b" strokeWidth="3" />
            <path d="M80 60 L95 45" fill="none" stroke="#f97316" strokeWidth="2" markerEnd="url(#h2)" />
            <circle cx="40" cy="60" r="7" fill="#38bdf8" />
            <circle cx="110" cy="60" r="7" fill="#f97316" />
            <text x="170" y="22" fill="#38bdf8" fontSize="10" fontFamily="system-ui">
              P = pull-off
            </text>
            <path d="M200 60 L240 60" stroke="#64748b" strokeWidth="3" />
            <circle cx="240" cy="60" r="7" fill="#f97316" />
            <circle cx="200" cy="60" r="7" fill="#38bdf8" />
            <path d="M240 60 L215 72" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <defs>
              <marker id="h2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#f97316" />
              </marker>
            </defs>
          </svg>
        </FigureFrame>
      );
    case "lesson-10":
      return (
        <FigureFrame caption="大橫按：食指側邊壓住全弦，後三指構成和弦形">
          <svg viewBox="0 0 300 130" className="w-full max-w-md h-auto" aria-hidden>
            <rect x="40" y="35" width="220" height="80" rx="6" fill="#111827" stroke="#475569" />
            <rect x="55" y="48" width="190" height="14" rx="4" fill="#f97316" opacity="0.75" />
            <text x="60" y="58" fill="#0f172a" fontSize="8" fontFamily="system-ui">
              Barre 食指
            </text>
            <circle cx="110" cy="92" r="8" fill="#38bdf8" />
            <circle cx="150" cy="88" r="8" fill="#38bdf8" />
            <circle cx="185" cy="92" r="8" fill="#38bdf8" />
            <text x="40" y="24" fill="#94a3b8" fontSize="10" fontFamily="system-ui">
              F / Bm 等封閉和弦起點
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-11":
      return (
        <FigureFrame caption="呼應式即興：短問句 → 短答句（可搭配 12 小節藍調）">
          <svg viewBox="0 0 320 100" className="w-full max-w-md h-auto" aria-hidden>
            <path d="M20 60 Q40 30 60 60 T100 60" fill="none" stroke="#f97316" strokeWidth="2" />
            <text x="20" y="85" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
              Call
            </text>
            <path d="M160 60 Q190 35 220 55 T280 58" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="85" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
              Response
            </text>
          </svg>
        </FigureFrame>
      );
    case "lesson-12":
      return (
        <FigureFrame caption="點弦：右手搥向品位，左手可保留支点音">
          <svg viewBox="0 0 300 120" className="w-full max-w-md h-auto" aria-hidden>
            <rect x="40" y="40" width="220" height="50" rx="4" fill="#0f172a" stroke="#334155" />
            <line x1="70" y1="35" x2="70" y2="95" stroke="#475569" />
            <line x1="130" y1="35" x2="130" y2="95" stroke="#475569" />
            <circle cx="70" cy="65" r="9" fill="#38bdf8" />
            <text x="70" y="28" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="system-ui">
              左手
            </text>
            <path d="M178 20 L178 58" fill="none" stroke="#f97316" strokeWidth="2" />
            <polygon points="178,62 183,52 173,52" fill="#f97316" />
            <text x="196" y="30" fill="#fb923c" fontSize="9" fontFamily="system-ui">
              右手搥弦
            </text>
          </svg>
        </FigureFrame>
      );
    default:
      return null;
  }
}
