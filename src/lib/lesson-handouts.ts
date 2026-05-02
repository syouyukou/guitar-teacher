/**
 * 每課講義：正文、AI／設計師配圖提示（英文）、資料來源。
 * 圖示由 components/handout-figures 依 lessonId 渲染。
 */

export type HandoutSource = {
  title: string;
  url?: string;
  note?: string;
  accessed?: string;
};

export type LessonHandoutContent = {
  sections: { heading: string; paragraphs: string[] }[];
  howToSteps?: string[];
  tips?: string[];
  /** 給圖像生成或設計參考的英文提示（與內文一致） */
  imagePromptEn: string;
  sources: HandoutSource[];
};

export const LESSON_HANDOUTS: Record<string, LessonHandoutContent> = {
  "lesson-01": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "電吉他由琴頭、琴頸、琴身三大部分組成；理解各部位名稱有助於你跟老師溝通、看說明書與調整器材。",
          "拾音器把弦的振動轉成電訊號，經由導線送到音箱放大。旋鈕通常控制音量與音色（Tone）。",
        ],
      },
    ],
    howToSteps: [
      "對準附圖，默認一次各部位中文與英文名稱。",
      "找出自己琴上的拾音器顆數（單單、雙雙等）與琴橋型式。",
      "確認音箱、導線、背帶是否就緒，養成練習前檢查習慣。",
    ],
    tips: ["初學階段不必急著買很多效果器，先把清音與撿聽清楚。"],
    imagePromptEn:
      "Educational diagram, electric guitar parts labeled in English and Chinese: headstock, tuners, nut, neck, fretboard, frets, body, pickups, bridge, volume and tone knobs, input jack. Clean vector infographic style, dark background, high contrast labels, no brand logos.",
    sources: [
      {
        title: "Guitar anatomy (generic instrument construction)",
        url: "https://en.wikipedia.org/wiki/Electric_guitar",
        accessed: "2026-05-03",
        note: "概述電吉他構造與歷史，詞彙可與教材對照。",
      },
    ],
  },
  "lesson-02": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "穩定的持琴姿勢是左手按弦與右手刷弦的基礎；調音則確保你聽到的音高與示範、伴奏一致。",
          "標準調弦為 E–A–D–G–B–e（由粗到細）。使用調音器時注意環境安靜、靠琴橋近一點拾音。",
        ],
      },
    ],
    howToSteps: [
      "坐姿：雙腳平放，吉他靠在大腿與胸前，琴頸略抬高。",
      "Pick 以拇指與食指捏住，露出約三分之一的撥片尖端。",
      "依序調六條弦，旋鈕每次小幅度轉動，直到調音器顯示在正確音名且亮綠燈（或同樣穩定指示）。",
    ],
    tips: ["新弦容易走音，頭幾天練習前都先快速檢查音準。"],
    imagePromptEn:
      "Side view illustration of seated guitarist correct posture, guitar on lap, neutral wrist; second small panel: clip-on tuner on headstock with note E displayed. Flat instructional style, inclusive silhouette, no recognizable face detail.",
    sources: [
      {
        title: "Guitar tuning",
        url: "https://en.wikipedia.org/wiki/Guitar_tuning",
        accessed: "2026-05-03",
      },
    ],
  },
  "lesson-03": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "Em、Am、D、G、C 是最常用的開放和弦，許多流行與搖滾歌曲只用其中幾個就能伴奏。",
          "和弦切換要慢而準：先求按實不悶音，再逐漸加快。",
        ],
      },
    ],
    howToSteps: [
      "每個和弦單獨按好，右手輕輕刷一下確認每一條弦都清楚。",
      "記住共同手指（若有）在切換時可以不移動，減少多餘動作。",
      "配合節拍器，以每兩拍換一個和弦開始。",
    ],
    tips: ["指尖尽量垂直，靠近品柱（不要壓在品柱正上方）。", "大拇指在琴頸後方中央偏上撐住。"],
    imagePromptEn:
      "Five guitar chord charts in a row: Em, Am, D, G, C open positions. Standard fretboard grid, black dots for fingertips, O and X for open/muted strings, numbers for suggested fingers. Clean white on charcoal, print-ready.",
    sources: [
      {
        title: "Chord (music) — open chords overview",
        url: "https://en.wikipedia.org/wiki/Chord_(music)",
        accessed: "2026-05-03",
        note: "理論背景；實際指法以現場教學或譜為準。",
      },
    ],
  },
  "lesson-04": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "節奏感是吉他手的骨架：下刷與上刷的組合構成不同節奏型。",
          "悶音（Palm mute）用手掌靠弦根處輕觸弦，得到短促、有張力的聲音，常用於搖滾。",
        ],
      },
    ],
    howToSteps: [
      "四四拍下刷：每拍一下，從粗弦到細弦順過。",
      "加入上刷時，幅度可以小一點，先求穩定。",
      "悶音時右手掌外側輕靠弦，仍保持手腕可動，試著從「很悶」到「半開」調整比例。",
    ],
    tips: ["跟著簡單歌曲練習同一節奏型，比死記符號更有效。"],
    imagePromptEn:
      "Diagram of guitar strumming directions: arrows for downstroke and upstroke across strings; second diagram palm position near bridge for palm muting, hand silhouette side view. Instructional, minimal colors orange and gray.",
    sources: [
      {
        title: "Strum",
        url: "https://en.wikipedia.org/wiki/Strum",
        accessed: "2026-05-03",
      },
    ],
  },
  "lesson-05": {
    sections: [
      {
        heading: "什麼是強力和弦（Power Chord）",
        paragraphs: [
          "強力和弦通常由「根音 + 純五度」（有時重複八度）組成，常省略三度，因此聽起來中性、可在大調與小調和弦進行中通用，是搖滾與龐克的重要元素。",
          "在電吉他上多以可移動的指型彈奏，並常搭配悶音與破音音色。",
        ],
      },
      {
        heading: "怎麼按（經典雙指／三指指型）",
        paragraphs: [
          "以根音在第六弦為例：食指按住根音品格，無名指按壓比根音高兩格的第五弦，小指按壓與無名指同一格的第四弦（與無名指併排）。第五弦與前兩條同格，形成五度與八度。",
          "移動整組指型即可隨琴頸改調；注意粗弦與細弦是否需悶音，避免不和谐空弦。",
        ],
      },
    ],
    howToSteps: [
      "食指垂直按實根音，指尖靠近品柱後方。",
      "無名指與小指併排按在後兩條弦上，手腕略前送，避免碰觸到鄰弦。",
      "右手配合悶音與下撥，先慢速確保每條被按的弦音乾淨，再加速。",
    ],
    tips: ["把位愈高，品距愈窄，注意指尖別碰鄰品。", "可先用清音練習指型，再加破音。"],
    imagePromptEn:
      "Close-up photo-style illustration of left hand power chord shape on electric guitar neck: index on low E string at example fret, ring on A two frets higher, pinky on D same fret as ring; string labels E A D G B e; fret numbers; small annotations muted vs fretted. Rock lesson context, neutral lighting, no logo on headstock.",
    sources: [
      {
        title: "Power chord",
        url: "https://en.wikipedia.org/wiki/Power_chord",
        accessed: "2026-05-03",
        note: "定義與文化脈絡；實際指法請搭配本講義附圖或教師示範。",
      },
    ],
  },
  "lesson-06": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "五聲音階（例如小調五聲）音數少、避開半音張力，在即興與搖滾旋律中極常用。",
          "先熟記「第一把位」指型，上下行配合節拍器是基礎功課。",
        ],
      },
    ],
    howToSteps: [
      "從根音開始依指型彈奏，唱名或可先用「嗒」代替，專心指距。",
      "上行與下行都練，再改變起音（仍限指型內）。",
      "速度由 60 BPM 八分音符起，穩了再升。",
    ],
    tips: ["指型可平移把位換調，先弄清根音位置。"],
    imagePromptEn:
      "Guitar fretboard diagram highlighting minor pentatonic box pattern in one position, dots with finger numbers, root notes marked R, dark fretboard maple-like, clean lesson chart style.",
    sources: [
      {
        title: "Pentatonic scale",
        url: "https://en.wikipedia.org/wiki/Pentatonic_scale",
        accessed: "2026-05-03",
      },
    ],
  },
  "lesson-07": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "推弦透過拉長有效弦長提高音高；半音與全音推弦是旋律表情的核心技巧之一。",
          "需兼顧音準、音色穩定與左手耐力，避免只靠蛮力。",
        ],
      },
    ],
    howToSteps: [
      "多用三指或雙指輔助推弦手指，撐住弦的側向張力。",
      "推弦時用耳分辨是否到目標音高，可對照相鄰把位同一音。",
      "練習「推上—停住—回放」與「推上—勾弦」組合。",
    ],
    tips: ["注意推弦方向依弦序與把位調整（多數情況朝琴頭或朝上弦方向）。"],
    imagePromptEn:
      "Side view of bending technique: fingers pushing string toward higher fret, arrow showing bend direction, small waveform hint of pitch rise. Educational line art on dark background.",
    sources: [
      {
        title: "String bending",
        url: "https://en.wikipedia.org/wiki/String_bending",
        accessed: "2026-05-03",
      },
    ],
  },
  "lesson-08": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "顫音讓長音有持續的起伏，分為以手腕或手指為軸的作法。",
          "速度和「寬度」要可控制，才不會顯得緊張或散漫。",
        ],
      },
    ],
    howToSteps: [
      "按住音符後，以規律小幅搖動改變有效張力。",
      "先模仿慢速旋律句尾，一個音拖長練顫音。",
      "配合節拍器練習漸快與漸慢的顫音。",
    ],
    tips: ["搖滾與藍調顫音風格略有不同，可多聽錄音辨別。"],
    imagePromptEn:
      "Illustration of vibrato motion: oscillating arrow along string near fretted note, wrist pivot hint, two panels slow vs faster vibrato. Minimal guitar teacher style.",
    sources: [
      {
        title: "Vibrato",
        url: "https://en.wikipedia.org/wiki/Vibrato",
        accessed: "2026-05-03",
        note: "包含聲樂與弦樂脈絡；吉他上以左手為主。",
      },
    ],
  },
  "lesson-09": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "搥弦（Hammer-on）與勾弦（Pull-off）讓相鄰音不必每次都右手再撥一次，樂句更連貫。",
          "力量來自指尖快速下落與側向勾離，需維持兩音的音量平衡。",
        ],
      },
    ],
    howToSteps: [
      "搥弦：先撥較低音，另一指快速有力地槌到目標品格。",
      "勾弦：先按兩音，撥高音後手指勾離帶出低音，兩指仍大致按住。",
      "串成三音或四音組合反覆慢練。",
    ],
    tips: ["左手拇指在琴頸後方提供反作用力，避免虎口垮掉。"],
    imagePromptEn:
      "Two-panel guitar technique: hammer-on with downward arrow to fret; pull-off with lateral flick arrow. Fret numbers and fingertip dots, clean instructional diagram.",
    sources: [
      {
        title: "Hammer-on and pull-off",
        url: "https://en.wikipedia.org/wiki/Hammer-on",
        accessed: "2026-05-03",
      },
    ],
  },
  "lesson-10": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "封閉和弦用食指横按同一品位當作「可移動的弦枕」，搭配其他手指形成大、小調等和弦。",
          "F 與 Bm 是初學大橫按最常見的關卡，需耐心建立手指力量與角度。",
        ],
      },
    ],
    howToSteps: [
      "食指略側用靠近指骨的硬邊按弦，壓住所有該品弦。",
      "中指、無名指、小指各就各位後，再整組施力。",
      "若某弦悶住，微調食指roll或手腕角度，單弦檢查。",
    ],
    tips: ["每天短時間多次練橫按比一次押很久更有效。"],
    imagePromptEn:
      "Barre chord diagram: index finger bar across all strings at fret, additional fingers forming major shape, side view of finger roll technique inset. High contrast lesson graphic.",
    sources: [
      {
        title: "Barre chord",
        url: "https://en.wikipedia.org/wiki/Barre_chord",
        accessed: "2026-05-03",
      },
    ],
  },
  "lesson-11": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "即興可把五聲與藍調音階當作「安全區」，在伴奏和弦上找落點與收尾音。",
          "呼應（Call and Response）練習有助於建構樂句，而不是只爬音階。",
        ],
      },
    ],
    howToSteps: [
      "選一個簡單 12 小節進行或 backing track。",
      "每兩小節模仿一次「問」，再用音階回「答」。",
      "錄下自己，聽是否落在句點與呼吸上。",
    ],
    tips: ["少即是多，初學先控制音符數量與空格。"],
    imagePromptEn:
      "Conceptual music lesson graphic: call-and-response wave shapes over a simple 12-bar blues chord chart silhouette, guitar neck with highlighted pentatonic roots. Dark mode educational poster style.",
    sources: [
      {
        title: "Blues scale",
        url: "https://en.wikipedia.org/wiki/Blues_scale",
        accessed: "2026-05-03",
      },
      {
        title: "Call and response (music)",
        url: "https://en.wikipedia.org/wiki/Call_and_response_(music)",
        accessed: "2026-05-03",
      },
    ],
  },
  "lesson-12": {
    sections: [
      {
        heading: "本課重點",
        paragraphs: [
          "點弦用右手（或雙手）在琴頸上搥出音符，擴展音階與琶音的速度與音色可能。",
          "從單音點弦與慢速樂句開始，再進入多指協調。",
          ],
      },
    ],
    howToSteps: [
      "右手第一指關節略彎，以指尖快速搥向品位。",
      "左手可先按好支点音，右手點出高音，注意兩手力度平衡。",
      "使用適度破音與壓縮有助於音符突出，但先以清音練準度。",
    ],
    tips: ["手腕放鬆，力量來自短促的加速度而非整隻手臂硬砸。"],
    imagePromptEn:
      "Tapping technique close-up: right hand index tapping higher fret, left hand fretting lower notes, numbered fingertips, electric guitar neck shallow depth of field illustration, lesson annotations.",
    sources: [
      {
        title: "Tapping (guitar technique)",
        url: "https://en.wikipedia.org/wiki/Tapping_(guitar_technique)",
        accessed: "2026-05-03",
      },
    ],
  },
};

export function getLessonHandout(lessonId: string): LessonHandoutContent | undefined {
  return LESSON_HANDOUTS[lessonId];
}
