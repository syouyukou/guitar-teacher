/**
 * 每課講義：正文、AI／設計師配圖提示（英文）、資料來源。
 * 圖示由 components/handout-figures 依 lessonId 渲染。
 *
 * 來源選擇原則：每課至少五筆、可公開查證；優先百科條目、院校／開放音樂理論教材、
 * 政府或大型博物館／圖書館、以及樂器製造商公開教學（技術名詞與入門說明）。
 */

export const SOURCE_VERIFICATION_BLURB =
  "編修時交叉比對方式：每課連結至少涵蓋「百科／機構層級定義」與「和弦、音階或技巧名詞」兩條線；若兩處用語一致（例如根音—五度、標準調弦音高、悶音位置）才寫入本講義正文。若官網改版導致 404，請以同機構搜尋關鍵字或 Internet Archive 留存頁驗證原文。";

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

const ACC = "2026-05-03" as const;

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
        title: "Wikipedia — Electric guitar（構造與拾音器概念）",
        url: "https://en.wikipedia.org/wiki/Electric_guitar",
        accessed: ACC,
        note: "條目附引用，可核對琴身、拾音器、旋鈕等通稱。",
      },
      {
        title: "Encyclopaedia Britannica — electric guitar",
        url: "https://www.britannica.com/art/electric-guitar",
        accessed: ACC,
        note: "經 Britannica 編輯部審閱之條目，自述構造要素與拾音器角色。",
      },
      {
        title: "Wikipedia — Guitar（樂器總述：琴頸、品格、琴弦）",
        url: "https://en.wikipedia.org/wiki/Guitar",
        accessed: ACC,
        note: "與電吉他條目交叉比對「neck／fret」等通用解剖名詞。",
      },
      {
        title: "Smithsonian National Museum of American History — collections search（electric guitar）",
        url: "https://americanhistory.si.edu/collections/search?q=electric+guitar",
        accessed: ACC,
        note: "博物館典藏品檢索，可作實物與歷史脈絡之權威索引（非教學影片）。",
      },
      {
        title: "Metropolitan Museum of Art — collection search: guitar",
        url: "https://www.metmuseum.org/art/collection/search?q=guitar",
        accessed: ACC,
        note: "館藏樂器圖像與斷代資料，適合對照「樂器形製」用語。",
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
        title: "Wikipedia — Guitar tuning",
        url: "https://en.wikipedia.org/wiki/Guitar_tuning",
        accessed: ACC,
        note: "標準調弦與各種調弦系統條列，可驗證 EADGBE 通稱。",
      },
      {
        title: "Wikipedia — Standard tuning",
        url: "https://en.wikipedia.org/wiki/Standard_tuning",
        accessed: ACC,
        note: "與 Guitar tuning 條目交叉核對六弦音名與音程關係。",
      },
      {
        title: "Encyclopaedia Britannica — pitch (music)",
        url: "https://www.britannica.com/art/pitch-music",
        accessed: ACC,
        note: "音高與頻率概念之機構定義，對照調音目標音高。",
      },
      {
        title: "Wikipedia — Concert pitch",
        url: "https://en.wikipedia.org/wiki/Concert_pitch",
        accessed: ACC,
        note: "說明 A4＝440 Hz 等慣例於不同地區之差異，調音時可一併理解。",
      },
      {
        title: "National Institute of Standards and Technology (NIST) — SI Brochure (International System of Units)「秒與測量基礎」",
        url: "https://www.nist.gov/si-redefinition/definitions-si-base-units",
        accessed: ACC,
        note: "頻率量測根基於時間／秒的國際定義；調音器顯示 Hz 時可理解其物理意義。",
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
        title: "Wikipedia — Chord (music)",
        url: "https://en.wikipedia.org/wiki/Chord_(music)",
        accessed: ACC,
        note: "和弦作為同時發聲音程組合之定義；與本課開放和弦用語對照。",
      },
      {
        title: "Wikipedia — Major chord／Minor chord",
        url: "https://en.wikipedia.org/wiki/Major_chord",
        accessed: ACC,
        note: "大三和弦結構；可再連至 Minor chord 條目比對小三和弦。",
      },
      {
        title: "MusicTheory.net — Introduction to Chords（四種三和弦類型）",
        url: "https://www.musictheory.net/lessons/40",
        accessed: ACC,
        note: "長期線上理論教材；與條目中三和弦結構敘述可互證。",
      },
      {
        title: "Open Music Theory (Pressbooks) — Triads",
        url: "https://viva.pressbooks.pub/openmusictheory/chapter/triads/",
        accessed: ACC,
        note: "公開音樂理論教科書章節；院校常用 OER，可驗證和弦類型命名。",
      },
      {
        title: "Encyclopaedia Britannica — harmony (music)",
        url: "https://www.britannica.com/art/harmony-music",
        accessed: ACC,
        note: "和聲與和弦功能之百科層級概述。",
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
        title: "Wikipedia — Strum",
        url: "https://en.wikipedia.org/wiki/Strum",
        accessed: ACC,
        note: "刷弦動作通稱與上下行敘述。",
      },
      {
        title: "Wikipedia — Palm mute",
        url: "https://en.wikipedia.org/wiki/Palm_mute",
        accessed: ACC,
        note: "搖滾／電吉他語境下 palm mute 定義，可與本課示意交叉比對。",
      },
      {
        title: "Wikipedia — Rhythm",
        url: "https://en.wikipedia.org/wiki/Rhythm",
        accessed: ACC,
        note: "節拍與節奏之概括條目。",
      },
      {
        title: "Encyclopaedia Britannica — rhythm (music)",
        url: "https://www.britannica.com/art/rhythm-music",
        accessed: ACC,
        note: "節奏之機構定義，與律動練習語彙一致即可。",
      },
      {
        title: "Library of Congress — Performing Arts Reading Room／Music Division",
        url: "https://www.loc.gov/rr/perform/music-div/",
        accessed: ACC,
        note: "美國國會圖書館音樂部與表演藝術閱覽室官方介紹；館藏規模與研究範疇可公開查證。",
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
        title: "Wikipedia — Power chord",
        url: "https://en.wikipedia.org/wiki/Power_chord",
        accessed: ACC,
        note: "根音＋五度、省略三度等描述之主要條目依據。",
      },
      {
        title: "Wikipedia — Perfect fifth",
        url: "https://en.wikipedia.org/wiki/Perfect_fifth",
        accessed: ACC,
        note: "與「五度」音程數學與聲學定義交叉驗證。",
      },
      {
        title: "Wikipedia — Interval (music)",
        url: "https://en.wikipedia.org/wiki/Interval_(music)",
        accessed: ACC,
        note: "音程通論，可核對與純五度相關術語。",
      },
      {
        title: "Encyclopaedia Britannica — rock (music)",
        url: "https://www.britannica.com/art/rock-music",
        accessed: ACC,
        note: "搖滾樂風格百科條目，提及電吉他與和聲簡化等脈絡。",
      },
      {
        title: "Wikipedia — Distortion (music)（破音與搖滾音色脈絡）",
        url: "https://en.wikipedia.org/wiki/Distortion_(music)",
        accessed: ACC,
        note: "與強力和弦常見演奏語境（失真音色）交叉參照；非單獨定義 power chord。",
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
        title: "Wikipedia — Pentatonic scale",
        url: "https://en.wikipedia.org/wiki/Pentatonic_scale",
        accessed: ACC,
        note: "五聲音階之大／小調型態與文化分布。",
      },
      {
        title: "Wikipedia — Major pentatonic scale",
        url: "https://en.wikipedia.org/wiki/Major_pentatonic_scale",
        accessed: ACC,
        note: "與小調五聲互為關係調視角時可交叉閱讀。",
      },
      {
        title: "Open Music Theory — Pentatonic and blues scales",
        url: "https://viva.pressbooks.pub/openmusictheory/chapter/pentatonic-and-blues-scales/",
        accessed: ACC,
        note: "OER 章節，與條目音級省略邏輯互相印證。",
      },
      {
        title: "MusicTheory.net — The Major Scale",
        url: "https://www.musictheory.net/lessons/21",
        accessed: ACC,
        note: "大調音階構成；可搭配同站 Minor Scales（第 22 課）理解五聲音階與調式音級之關係。",
      },
      {
        title: "Encyclopaedia Britannica — musical sound（音階與音高組織引言）",
        url: "https://www.britannica.com/art/musical-sound",
        accessed: ACC,
        note: "音階、音高組織之背景條目。",
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
        title: "Wikipedia — String bending",
        url: "https://en.wikipedia.org/wiki/String_bending",
        accessed: ACC,
        note: "電吉他推弦條目主軸。",
      },
      {
        title: "Wikipedia — Blue note",
        url: "https://en.wikipedia.org/wiki/Blue_note",
        accessed: ACC,
        note: "藍調語境下微分音與推弦聽感之文化技術背景。",
      },
      {
        title: "Wikipedia — Expressive techniques for string instruments",
        url: "https://en.wikipedia.org/wiki/Expressive_techniques_for_string_instruments",
        accessed: ACC,
        note: "弦樂器表情技巧總覽，可對照 bending／vibrato 分類。",
      },
      {
        title: "Encyclopaedia Britannica — blues (music)",
        url: "https://www.britannica.com/art/blues-music",
        accessed: ACC,
        note: "藍調風格百科條目，概述吉他技巧在流派中之角色。",
      },
      {
        title: "Britannica — electric guitar（技巧列舉含 string-bending）",
        url: "https://www.britannica.com/art/electric-guitar",
        accessed: ACC,
        note: "與維基「string bending」條目交叉檢查「電吉他常用技巧」用語。",
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
        title: "Wikipedia — Vibrato",
        url: "https://en.wikipedia.org/wiki/Vibrato",
        accessed: ACC,
        note: "顫音總論（跨樂器）。",
      },
      {
        title: "Wikipedia — Vibrato (string instrument)",
        url: "https://en.wikipedia.org/wiki/Vibrato_(string_instrument)",
        accessed: ACC,
        note: "弓弦／撥弦樂器脈絡之顫音；吉他左手顫音可對照此條目子節。",
      },
      {
        title: "Wikipedia — Expressive techniques for string instruments",
        url: "https://en.wikipedia.org/wiki/Expressive_techniques_for_string_instruments",
        accessed: ACC,
        note: "再次作為技巧分類之索引條目。",
      },
      {
        title: "Encyclopaedia Britannica — stringed instrument（演奏技術總述）",
        url: "https://www.britannica.com/art/stringed-instrument",
        accessed: ACC,
        note: "弦樂器演奏技術之百科層級介紹。",
      },
      {
        title: "National Park Service — Edison sound recordings（歷史錄音與顫音美學之文物脈絡）",
        url: "https://www.nps.gov/edis/learn/historyculture/sound.htm",
        accessed: ACC,
        note: "美國國家公園管理局旗下愛迪生遺址官方頁；作為「音樂表演與錄音史」可驗證公開來源（非吉他專章）。",
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
        title: "Wikipedia — Hammer-on",
        url: "https://en.wikipedia.org/wiki/Hammer-on",
        accessed: ACC,
        note: "搥弦定義與記譜慣例。",
      },
      {
        title: "Wikipedia — Pull-off",
        url: "https://en.wikipedia.org/wiki/Pull-off",
        accessed: ACC,
        note: "勾弦定義；宜與 hammer-on 條目併讀。",
      },
      {
        title: "Wikipedia — Legato",
        url: "https://en.wikipedia.org/wiki/Legato",
        accessed: ACC,
        note: "連奏通稱，涵蓋搥勾之演奏美學。",
      },
      {
        title: "Wikipedia — Slur (music)",
        url: "https://en.wikipedia.org/wiki/Slur_(music)",
        accessed: ACC,
        note: "譜上連線與連奏標示之關係。",
      },
      {
        title: "Yale University Library — Gilmore Music Library",
        url: "https://guides.library.yale.edu/music",
        accessed: ACC,
        note: "耶魯音樂圖書館研究指引官方頁；可作「音樂文獻與術語查核」之院校權威入口。",
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
        title: "Wikipedia — Barre chord",
        url: "https://en.wikipedia.org/wiki/Barre_chord",
        accessed: ACC,
        note: "橫按／封閉和弦機械原理之主條目。",
      },
      {
        title: "Wikipedia — Capo",
        url: "https://en.wikipedia.org/wiki/Capo",
        accessed: ACC,
        note: "可移動弦枕之裝置與橫按概念對照閱讀。",
      },
      {
        title: "Wikipedia — Fret",
        url: "https://en.wikipedia.org/wiki/Fret",
        accessed: ACC,
        note: "品格（fret）物理與音高分割之條目，可與橫按「移動把位」機制對照。",
      },
      {
        title: "Open Music Theory — Seventh Chords（延伸和弦與指法思維參考）",
        url: "https://viva.pressbooks.pub/openmusictheory/chapter/seventh-chords/",
        accessed: ACC,
        note: "進階和弦結構；與橫按封閉形一起理解「可移動型」之和聲。",
      },
      {
        title: "Wikipedia — Movable chord",
        url: "https://en.wikipedia.org/wiki/Movable_chord",
        accessed: ACC,
        note: "可移動和弦（closed／barre shape）之術語條目。",
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
        title: "Wikipedia — Blues scale",
        url: "https://en.wikipedia.org/wiki/Blues_scale",
        accessed: ACC,
        note: "藍調音階之定義與小調五聲＋藍調音之關係。",
      },
      {
        title: "Wikipedia — Call and response (music)",
        url: "https://en.wikipedia.org/wiki/Call_and_response_(music)",
        accessed: ACC,
        note: "呼應式樂句之歷史與型態。",
      },
      {
        title: "Wikipedia — Twelve-bar blues",
        url: "https://en.wikipedia.org/wiki/Twelve-bar_blues",
        accessed: ACC,
        note: "12 小節藍調和聲骨架，即興練習常用底層。",
      },
      {
        title: "Wikipedia — Musical improvisation",
        url: "https://en.wikipedia.org/wiki/Musical_improvisation",
        accessed: ACC,
        note: "即興演奏通論與教學脈絡。",
      },
      {
        title: "Encyclopaedia Britannica — improvisation (music)",
        url: "https://www.britannica.com/art/improvisation-music",
        accessed: ACC,
        note: "即興之百科定義，可與維基條目對照措辭。",
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
        title: "Wikipedia — Tapping (guitar technique)",
        url: "https://en.wikipedia.org/wiki/Tapping_(guitar_technique)",
        accessed: ACC,
        note: "點弦技巧主條目。",
      },
      {
        title: "Wikipedia — Two-handed tapping",
        url: "https://en.wikipedia.org/wiki/Two-handed_tapping",
        accessed: ACC,
        note: "雙手點弦之延伸手法與代表人物脈絡。",
      },
      {
        title: "Wikipedia — Shred guitar",
        url: "https://en.wikipedia.org/wiki/Shred_guitar",
        accessed: ACC,
        note: "高速演奏風格與點弦之流派關聯。",
      },
      {
        title: "Encyclopaedia Britannica — Eddie Van Halen",
        url: "https://www.britannica.com/biography/Eddie-Van-Halen",
        accessed: ACC,
        note: "點弦普及化之關鍵人物傳略（史觀佐證）。",
      },
      {
        title: "Smithsonian Lemelson Center — invention & electric guitar（創新與專利脈絡入口）",
        url: "https://invention.si.edu/",
        accessed: ACC,
        note: "史密森尼下 Lemelson 創新計畫官方站；可延伸檢索吉他相關發明史料。",
      },
    ],
  },
};

export function getLessonHandout(lessonId: string): LessonHandoutContent | undefined {
  return LESSON_HANDOUTS[lessonId];
}
