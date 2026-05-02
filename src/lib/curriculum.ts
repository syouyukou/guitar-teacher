export type PracticeSongLink = {
  label: string;
  href: string;
};

/** 本課推薦用於練習或對照的曲目（連結以搜尋為主，避免單一影片失效） */
export type PracticeSong = {
  title: string;
  artist: string;
  /** 與本課技巧的對應說明 */
  hint?: string;
  links: PracticeSongLink[];
};

export type Lesson = {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  /** 五年課程中的年度（第幾年） */
  planYear: 1 | 2 | 3 | 4 | 5;
  description: string;
  topics: string[];
  youtubeSearch: string;
  practiceSong: PracticeSong;
};

function yt(q: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

function tabSearch(song: string, artist: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(`${song} ${artist} 吉他譜`)}`;
}

function ps(
  title: string,
  artist: string,
  youtubeQuery: string,
  hint?: string,
): PracticeSong {
  return {
    title,
    artist,
    hint,
    links: [
      { label: "YouTube 搜尋", href: yt(youtubeQuery) },
      { label: "譜例關鍵字（Google）", href: tabSearch(title, artist) },
    ],
  };
}

/** 整體節奏說明與各年重點（供首頁／單元頁引用） */
export const CURRICULUM_PACE = {
  summary:
    "本課表以約五年、循序完成 48 個單元來規劃。若以每週練習 3～4 次、每次約 45～60 分鐘估算，大約對應每年消化 9～10 個單元；實際所需時間因人而異，可依步調延長或複習，不必與他人比較。",
  years: [
    {
      year: 1 as const,
      title: "第一年",
      focus: "器材與姿勢、調音、開放和弦、基礎節奏與譜面／把位認識",
    },
    {
      year: 2 as const,
      title: "第二年",
      focus: "搖滾 Riff、強力和弦、五聲與藍調進行、雙音與動態基礎",
    },
    {
      year: 3 as const,
      title: "第三年",
      focus: "推弦、顫音、勾搥、橫按與延伸和聲、小樂團角色與錄音對照",
    },
    {
      year: 4 as const,
      title: "第四年",
      focus: "音階色彩、backing track 策略、效果器、聽寫與公開演奏準備",
    },
    {
      year: 5 as const,
      title: "第五年",
      focus: "點弦與速彈基礎、奇數拍、改編維護與長期規劃、總複習",
    },
  ],
  /**
   * 交代「是否經過驗證」與和業界慣例的對照（供首頁／使用者閱讀；非法律聲明）。
   * 未宣稱通過任何單一機構之官方認證；順序係依常見教學梯度整理。
   */
  pedagogy: {
    disclaimer:
      "本路線圖並非經某學校、學會或考級單位『官方核准』的固定課表，也未對照某一國家大綱逐條勾稽；它是依流行／搖滾電吉他常見的學習梯度與本站模組編排而成，方便自學者循序練習。",
    howTeachersOftenSequence: [
      "先建立姿勢、調音、穩定節拍與「和弦＋右手節奏」，再進單音與和弦轉換（類似多數入門教材與線上路線圖對「前 90 天～第一年」的強調）。",
      "中階多在「橫按／可移動型和弦」「小五聲／藍調進行」「Power chord 與搖滾句式」之間磨合，並開始把技巧和實際曲目綁在一起練。",
      "往後才逐步堆疊推弦、顫音、勾搥、即興與音階色彩、效果器與樂團合作等；與美國中小學吉他課常參考的多年期能力架構（NAfME Guitar Council《Guitar Best Practices Outline》逐年：把位拓展、讀譜、藍調／即興、調式等）在「由簡到繁」方向上相近。",
      "許多中文線上／實體課程會像社區大學或音樂教室大綱那樣「每週一主題＋歌曲範例」，並搭配課後練習與影片複習 QR／連結（例：台灣社大電吉他班週次說明、部分教室標榜課後作業與掃碼重看教學片）。本站作業與中文影片入口即比照此慣例設計。",
    ],
    references: [
      {
        label: "NAfME Guitar Council — Guitar Best Practices Outline（PDF，Year 1–4）",
        href: "https://nafme.org/wp-content/uploads/2019/05/NAfME-Guitar-Council-Best-Practices-Outline-for-Years-1-4.pdf",
      },
      {
        label: "新北市板橋／瑞芳社區大學｜電吉他課程大綱與週次進度（中文，公立終身學習）",
        href: "https://pccu.org.tw/p252112/",
      },
      {
        label: "高雄「吉他維度」｜初學到進階分段與「課後作業、影片複習」敘述（中文）",
        href: "https://www.guitars.tw/course/",
      },
      {
        label: "PRO360｜電吉他基本課程內容整理（中文，概述向）",
        href: "https://www.pro360.com.tw/guide/learn_electric_guitar",
      },
    ],
    individualVariation:
      "實務上老師會依你的曲風目標、每週可練時間、是否學五線譜或只讀 Tab、以及是否組團，調整單元先後或停留複習；面授教師仍最能為你個人校準順序與難度。",
  },
} as const;

/**
 * 單元順序＝建議學習順序（上一課／下一課與首頁列表皆依此陣列）。
 * lesson-01～12 保留原 ID 以相容既有講義與附圖；lesson-13～48 為新增單元。
 */
export const CURRICULUM: Lesson[] = [
  // ─── 第一年（10）───
  {
    id: "lesson-01",
    planYear: 1,
    title: "認識電吉他：構造與配備",
    level: "beginner",
    description: "了解電吉他各部位名稱、功能，以及基本配備（音箱、導線、效果器）。",
    topics: ["琴頭 (Headstock)", "琴頸 (Neck)", "琴身 (Body)", "拾音器 (Pickup)", "琴橋 (Bridge)", "旋鈕 (Knobs)"],
    youtubeSearch: "電吉他構造介紹 初學者",
    practiceSong: ps(
      "Sweet Child O' Mine",
      "Guns N' Roses",
      "Sweet Child O Mine intro guitar two guitars",
      "聽雙吉他層次與破音音色，對照自己琴上拾音器與旋鈕。",
    ),
  },
  {
    id: "lesson-02",
    planYear: 1,
    title: "持琴姿勢與調音",
    level: "beginner",
    description: "正確的持琴姿勢、Pick 握法，以及如何用調音器調音。",
    topics: ["坐姿與站姿", "Pick 握法", "左手姿勢", "調音器使用", "標準調音 EADGBe"],
    youtubeSearch: "電吉他調音 持琴姿勢 初學",
    practiceSong: ps(
      "標準調音參考",
      "通用練習",
      "guitar standard tuning EADGBE reference tones",
      "邊聽標準音邊校準；曲子可選任意熟悉搖滾慢歌彈單音檢查。",
    ),
  },
  {
    id: "lesson-03",
    planYear: 1,
    title: "基礎和弦：Em、Am、D、G、C",
    level: "beginner",
    description: "學習最常用的五個開放和弦，練習和弦切換。",
    topics: ["Em 和弦", "Am 和弦", "D 和弦", "G 和弦", "C 和弦", "和弦切換練習"],
    youtubeSearch: "電吉他基礎和弦 初學者 教學",
    practiceSong: ps("Wish You Were Here", "Pink Floyd", "Wish You Were Here guitar chords tutorial", "開放和弦轉換與分解刷弦並用。"),
  },
  {
    id: "lesson-04",
    planYear: 1,
    title: "節奏刷弦技巧",
    level: "beginner",
    description: "學習基本的刷弦節奏型態，包含下刷、上刷與悶音。",
    topics: ["下刷 (Downstroke)", "上刷 (Upstroke)", "悶音 (Palm Mute)", "基本節奏型 4/4"],
    youtubeSearch: "電吉他刷弦節奏 初學教學",
    practiceSong: ps("Brown Eyed Girl", "Van Morrison", "Brown Eyed Girl guitar strumming", "穩定四分與八分刷弦pattern。"),
  },
  {
    id: "lesson-13",
    planYear: 1,
    title: "節奏譜與 Tab 入門",
    level: "beginner",
    description: "認識簡譜／和弦譜與 Tab 數字，能把符號對應到指板與節拍。",
    topics: ["小節線與拍號", "和弦符號", "Tab 數字與弦序", "基礎休止符"],
    youtubeSearch: "guitar tab 教學 初學",
    practiceSong: ps("Ode to Joy", "貝多芬旋律簡化", "ode to joy guitar tab beginner single notes", "單音 Tab 跟拍，建立譜與手指對應。"),
  },
  {
    id: "lesson-14",
    planYear: 1,
    title: "單音旋律與把位熟悉",
    level: "beginner",
    description: "在同一組弦上用單音走動，熟悉品格與左右手協調。",
    topics: ["食指定位", "指型小移動", "簡單換把", "與節拍器"],
    youtubeSearch: "電吉他 單音 初學",
    practiceSong: ps("Seven Nation Army", "The White Stripes", "Seven Nation Army guitar riff lesson", "經典單音 riff、注意悶音與時值。"),
  },
  {
    id: "lesson-15",
    planYear: 1,
    title: "和弦轉換與節拍器",
    level: "beginner",
    description: "以慢速精準為目標，練習常用和弦進行與換把。",
    topics: ["共同指保留", "先彈根音再補齊", "60～80 BPM", "兩小節一換"],
    youtubeSearch: "和弦轉換 節拍器 吉他",
    practiceSong: ps("Wonderwall", "Oasis", "Wonderwall guitar chords lesson", "和弦銜接與右手固定 pattern。"),
  },
  {
    id: "lesson-16",
    planYear: 1,
    title: "悶音與八分音符驅動",
    level: "beginner",
    description: "用手掌靠橋段做出悶音，驅動搖滾感八分音符。",
    topics: ["手掌支點", "悶音深淺", "下上交替", "動態對比"],
    youtubeSearch: "palm mute 電吉他 教學",
    practiceSong: ps("Smells Like Teen Spirit", "Nirvana", "Smells Like Teen Spirit guitar lesson power chords", "開放與悶音層次交錯。"),
  },
  {
    id: "lesson-17",
    planYear: 1,
    title: "切分與反拍重音",
    level: "beginner",
    description: "辨識切分節奏，練習重音落在反拍或弱拍。",
    topics: ["附點與延音線", "拍數朗誦", "Accent 練習", "與鼓點對齊"],
    youtubeSearch: "吉他 切分 節奏 教學",
    practiceSong: ps("Highway to Hell", "AC/DC", "Highway to Hell guitar riff lesson", "經典搖滾切分與悶音。"),
  },
  {
    id: "lesson-18",
    planYear: 1,
    title: "CAGED 與開放把位連結",
    level: "beginner",
    description: "初步理解 CAGED 五型在琴頸上的位置，連結已學開放和弦。",
    topics: ["C 型與 A 型邏輯", "根音在弦上", "小範圍移型", "之後將接到封閉"],
    youtubeSearch: "CAGED 吉他 入門",
    practiceSong: ps("Knockin' on Heaven's Door", "Bob Dylan / Guns N' Roses", "Knocking on Heavens Door guitar chords lesson", "G、D、C、Am 進行與型態聯想。"),
  },

  // ─── 第二年（10）───
  {
    id: "lesson-05",
    planYear: 2,
    title: "Power Chord 強力和弦",
    level: "intermediate",
    description: "搖滾樂的基礎！學習 Power Chord 的指型與移動方式。",
    topics: ["Power Chord 指型", "移調應用", "悶音搭配", "搖滾節奏應用"],
    youtubeSearch: "Power Chord 強力和弦 教學",
    practiceSong: ps("Iron Man", "Black Sabbath", "Iron Man guitar riff lesson", "根音與五度移動。"),
  },
  {
    id: "lesson-19",
    planYear: 2,
    title: "經典搖滾 Riff 分析",
    level: "intermediate",
    description: "拆解數段經典 Riff 的撥弦方向與悶音比例。",
    topics: ["動機反覆", "休止運用", "音色選擇", "慢速還原"],
    youtubeSearch: "經典搖滾 riff 吉他",
    practiceSong: ps("Day Tripper", "The Beatles", "Day Tripper guitar riff lesson", "雙音與單音混合。"),
  },
  {
    id: "lesson-20",
    planYear: 2,
    title: "調性與五度圈實務",
    level: "intermediate",
    description: "用五度圈找調號、常見進行與移調思考。",
    topics: ["大調關係小調", "屬七解決", "臨時移調", "伴奏選Key"],
    youtubeSearch: "五度圈 吉他 樂理",
    practiceSong: ps("Hotel California", "Eagles", "Hotel California guitar lesson intro", "長進行中感受調性中心（可先彈簡化版）。"),
  },
  {
    id: "lesson-06",
    planYear: 2,
    title: "五聲音階 (Pentatonic Scale)",
    level: "intermediate",
    description: "最重要的即興音階！學習 A 小調五聲音階的第一把位。",
    topics: ["A 小調五聲音階", "第一把位指型", "上下行練習", "搭配節拍器練習"],
    youtubeSearch: "五聲音階 Pentatonic 電吉他教學",
    practiceSong: ps("Sweet Home Alabama", "Lynyrd Skynyrd", "Sweet Home Alabama guitar solo pentatonic", "五聲句式在搖滾中的語彙。"),
  },
  {
    id: "lesson-21",
    planYear: 2,
    title: "五聲把位銜接",
    level: "intermediate",
    description: "連接兩個以上把位，在琴頸上平滑移動。",
    topics: ["滑入滑出", "根音導航", "重複動機", "節拍器分段"],
    youtubeSearch: "pentatonic boxes 連接",
    practiceSong: ps("Sunshine of Your Love", "Cream", "Sunshine of Your Love guitar riff lesson", "跨把位移動的範例。"),
  },
  {
    id: "lesson-22",
    planYear: 2,
    title: "十二小節藍調進行",
    level: "intermediate",
    description: "掌握 I–IV–V 十二小節結構與基本節奏型。",
    topics: ["Quick change", "Turnaround", "Shuffle 感", "呼與應"],
    youtubeSearch: "12 bar blues guitar lesson",
    practiceSong: ps("Pride and Joy", "Stevie Ray Vaughan", "Pride and Joy guitar lesson riff", "德州藍調搖滾與和弦伴奏。"),
  },
  {
    id: "lesson-23",
    planYear: 2,
    title: "雙音與小三度和聲片段",
    level: "intermediate",
    description: "在相鄰弦上彈出雙音，理解指型與平行位移。",
    topics: ["三度在弦組上", "靜音相鄰弦", "Riff 裡的雙音", "耳朵校準"],
    youtubeSearch: "guitar double stops lesson",
    practiceSong: ps("Johnny B. Goode", "Chuck Berry", "Johnny B Goode guitar intro lesson", "搖滾吉他雙音經典。"),
  },
  {
    id: "lesson-24",
    planYear: 2,
    title: "推弦預備與音準意識",
    level: "intermediate",
    description: "在進入全音推弦前，先練小幅度與比照音高。",
    topics: ["支點手指", "耳朵對照", "回推", "揉合單音樂句"],
    youtubeSearch: "guitar bending beginner lesson",
    practiceSong: ps("Something", "The Beatles", "Something George Harrison guitar solo lesson", "旋律型推弦參考。"),
  },
  {
    id: "lesson-25",
    planYear: 2,
    title: "力道層次與動態控制",
    level: "intermediate",
    description: "用右手與拾音器音量做出 headroom 與情緒對比。",
    topics: ["清音與破音切換", "觸弦深淺", "樂句留白", "手遠近拾音器"],
    youtubeSearch: "guitar dynamics lesson electric",
    practiceSong: ps("Little Wing", "Jimi Hendrix", "Little Wing guitar lesson intro", "輕重與空間感。"),
  },
  {
    id: "lesson-26",
    planYear: 2,
    title: "曲式記憶與分段練習",
    level: "intermediate",
    description: "把歌曲切成 A／B／過門，建立記憶錨點與複習節奏。",
    topics: ["口頭複誦結構", "由難段往前後串", "錄音自聽", "每週複習表"],
    youtubeSearch: "如何練吉他 分段",
    practiceSong: ps("Smoke on the Water", "Deep Purple", "Smoke on the Water guitar riff full song structure", "簡單曲式與重複段。"),
  },

  // ─── 第三年（10）───
  {
    id: "lesson-07",
    planYear: 3,
    title: "Bending 推弦技巧",
    level: "intermediate",
    description: "電吉他最具表情的技巧之一，學習半音和全音推弦。",
    topics: ["半音推弦", "全音推弦", "回推 (Release)", "推弦後勾弦"],
    youtubeSearch: "電吉他 Bending 推弦技巧教學",
    practiceSong: ps("The Thrill Is Gone", "B.B. King", "The Thrill Is Gone guitar solo lesson B.B. King style", "長音與推弦表情。"),
  },
  {
    id: "lesson-08",
    planYear: 3,
    title: "Vibrato 顫音技巧",
    level: "intermediate",
    description: "讓音符更有生命力的顫音技巧，搖滾與藍調必備。",
    topics: ["手腕顫音", "手指顫音", "速度與深度控制", "應用在五聲音階"],
    youtubeSearch: "電吉他 Vibrato 顫音技巧教學",
    practiceSong: ps("Still Got the Blues", "Gary Moore", "Still Got the Blues guitar solo lesson", "長 sustain 與顫音深度。"),
  },
  {
    id: "lesson-09",
    planYear: 3,
    title: "Hammer-on & Pull-off 勾搥弦",
    level: "intermediate",
    description: "增加演奏流暢度的連奏技巧。",
    topics: ["Hammer-on 搥弦", "Pull-off 勾弦", "連續搥勾弦", "應用練習"],
    youtubeSearch: "Hammer-on Pull-off 電吉他技巧教學",
    practiceSong: ps("Thunderstruck", "AC/DC", "Thunderstruck AC DC guitar lesson open string", "連續搥勾與開放弦（可依能力選段落）。"),
  },
  {
    id: "lesson-10",
    planYear: 3,
    title: "封閉和弦與 Barre Chord",
    level: "intermediate",
    description: "學習大橫按和弦，讓所有調的和弦都能彈。",
    topics: ["F 大調和弦", "Bm 和弦", "橫按技巧訓練", "和弦移動"],
    youtubeSearch: "Barre Chord 大橫按 電吉他教學",
    practiceSong: ps("Crazy Train", "Ozzy Osbourne", "Crazy Train guitar rhythm lesson", "F# 小調與強力和弦節奏（可先彈節奏骨架）。"),
  },
  {
    id: "lesson-27",
    planYear: 3,
    title: "滑音與連線表情",
    level: "intermediate",
    description: "Legato 與滑入滑出，讓樂句更連貫。",
    topics: ["目標音先行", "滑入時值", "與推弦並用", "乾淨止音"],
    youtubeSearch: "guitar slides legato lesson",
    practiceSong: ps("Layla", "Derek and the Dominos", "Layla guitar solo slide lesson", "經典滑音與藍調句式。"),
  },
  {
    id: "lesson-28",
    planYear: 3,
    title: "屬七與延伸和弦入門",
    level: "intermediate",
    description: "在搖滾與藍調中辨識 Dom7、9th 等色彩。",
    topics: ["V7 解決", "屬和弦經過音", "簡化按法", "聽覺訓練"],
    youtubeSearch: "dominant 7 guitar chords rock",
    practiceSong: ps("T.N.T.", "AC/DC", "TNT AC DC guitar chords lesson", "節奏與屬色彩和絃感（段落簡化亦可）。"),
  },
  {
    id: "lesson-29",
    planYear: 3,
    title: "五聲外音與藍調音",
    level: "intermediate",
    description: "在課程五聲中加入藍調音、半音趨近，聽懂「搖滾味」來源。",
    topics: ["♭5 使用時機", "鄰音裝飾", "語彙抄寫", "短動機變形"],
    youtubeSearch: "blues note pentatonic guitar",
    practiceSong: ps("Voodoo Child (Slight Return)", "Jimi Hendrix", "Voodoo Child Slight Return guitar lesson", "藍調音與 wah／破音語彙。"),
  },
  {
    id: "lesson-30",
    planYear: 3,
    title: "三重奏中的吉他角色",
    level: "intermediate",
    description: "在貝斯與鼓中找空間：補空隙、少即是多。",
    topics: ["與貝斯分頻", "節奏鑲邊", "樂句呼吸", "即興前後準備"],
    youtubeSearch: "guitar trio comping lesson",
    practiceSong: ps("Lenny", "Stevie Ray Vaughan", "Lenny SRV guitar lesson", "吉他作為和聲／旋律主角的示範。"),
  },
  {
    id: "lesson-31",
    planYear: 3,
    title: "即興動機與反覆變奏",
    level: "intermediate",
    description: "從兩三個音發展樂句，改變節奏與結尾。",
    topics: ["問答句法", "移高八度", "反拍起句", "呼應鼓 fill"],
    youtubeSearch: "guitar motif improvisation",
    practiceSong: ps("Red House", "Jimi Hendrix", "Red House guitar lesson solo", "藍調樂句延展。"),
  },
  {
    id: "lesson-32",
    planYear: 3,
    title: "錄音室與現場音色對照",
    level: "intermediate",
    description: "比較專輯版與現場版的音色、動態與錯誤容忍度。",
    topics: ["Delay／混響差異", "音量踏板", "回授控制", "觀眾互動留白"],
    youtubeSearch: "studio vs live guitar tone",
    practiceSong: ps("Crossroads", "Cream", "Crossroads Cream live guitar", "現場與錄音版本對照聆聽。"),
  },

  // ─── 第四年（10）───
  {
    id: "lesson-11",
    planYear: 4,
    title: "即興演奏入門",
    level: "advanced",
    description: "運用五聲音階與藍調音階進行即興演奏。",
    topics: ["藍調音階", "Call & Response", "樂句構建", "搭配 Backing Track"],
    youtubeSearch: "電吉他即興 藍調音階 教學",
    practiceSong: ps("Key to the Highway", "藍調標準", "key to the highway guitar blues backing jam", "十二小節上即興入門。"),
  },
  {
    id: "lesson-33",
    planYear: 4,
    title: "藍調音階整合",
    level: "advanced",
    description: "在單一把位混合大／小藍調音階與五聲。",
    topics: ["把位地圖", "避免「音墟」", "屬和弦上色彩", "錄下修正"],
    youtubeSearch: "blues scale guitar all positions",
    practiceSong: ps("Still Got the Blues", "Gary Moore", "Still Got the Blues backing track guitar", "長拍慢句與音階選擇。"),
  },
  {
    id: "lesson-34",
    planYear: 4,
    title: "Dorian 色彩入門",
    level: "advanced",
    description: "在 II–V 或靜態和弦上聽出 Dorian 與自然小調差異。",
    topics: ["6 音與 b7", "搖滾／融合例子", "兩小節內模進", "耳朵核對"],
    youtubeSearch: "Dorian mode guitar lesson",
    practiceSong: ps("Oye Como Va", "Santana", "Oye Como Va guitar lesson", "經典 Dorian 句型。"),
  },
  {
    id: "lesson-35",
    planYear: 4,
    title: "Mixolydian 與屬和弦",
    level: "advanced",
    description: "在屬和弦靜止或搖滾和弦上運用 Mixolydian。",
    topics: ["b7 色彩", "與大調五聲並用", "樂句收尾", "和弦音落點"],
    youtubeSearch: "Mixolydian guitar solo lesson",
    practiceSong: ps("Sweet Home Alabama", "Lynyrd Skynyrd", "Sweet Home Alabama solo lesson guitar", "搖滾裡屬／Mixo 感。"),
  },
  {
    id: "lesson-36",
    planYear: 4,
    title: "和弦與音階對應思考",
    level: "advanced",
    description: "和弦進行上選「和弦音—鄰音—和弦音」路徑。",
    topics: ["Arpeggio 片段", "經過半音", "避免與貝斯撞車", "簡化即興"],
    youtubeSearch: "chord tone soloing guitar",
    practiceSong: ps("Sultans of Swing", "Dire Straits", "Sultans of Swing guitar lesson", "旋律化即興與和弦對齊。"),
  },
  {
    id: "lesson-37",
    planYear: 4,
    title: "Backing Track 練習策略",
    level: "advanced",
    description: "設計每週 BT 課表：技巧／耳朵／時間限制。",
    topics: ["錄音檢討", "限定音數", "限定把位", "模仿→改寫"],
    youtubeSearch: "A minor pentatonic backing track",
    practiceSong: ps("藍調／搖滾即興伴奏", "YouTube BT", "slow blues backing track A minor guitar", "自行搭配本課技巧選段練習。"),
  },
  {
    id: "lesson-38",
    planYear: 4,
    title: "撥弦經濟與右手路徑",
    level: "advanced",
    description: "alternate picking 基礎與跨弦效率。",
    topics: ["內外撥規則", "幽靈撥", "小節循環", "漸進提速"],
    youtubeSearch: "alternate picking guitar lesson",
    practiceSong: ps("Cliffs of Dover intro", "Eric Johnson", "Cliffs of Dover guitar lesson intro", "精緻撥弦與乾淨度（可先慢速）。"),
  },
  {
    id: "lesson-39",
    planYear: 4,
    title: "效果器鏈與音箱增益基礎",
    level: "advanced",
    description: "理解前級／後級、overdrive、delay、reverb 在前後順序上的差異。",
    topics: ["四線接法概念", "增益堆疊", "Delay 分 Pre／Post", "音色備份"],
    youtubeSearch: "guitar pedal order lesson",
    practiceSong: ps("Run Like Hell", "Pink Floyd", "Run Like Hell guitar delay effect lesson", "延遲與律動。"),
  },
  {
    id: "lesson-40",
    planYear: 4,
    title: "樂句聽寫與改寫",
    level: "advanced",
    description: "慢速扒 short lick，再改節奏與結尾成自己的話。",
    topics: ["區間循環軟體", "邊彈邊唱音名", "改拍號遊戲", "與同伴互動"],
    youtubeSearch: "transcribe guitar solo ear training",
    practiceSong: ps("Comfortably Numb solo", "Pink Floyd", "Comfortably Numb solo first phrase lesson", "經典首句聽寫素材。"),
  },
  {
    id: "lesson-41",
    planYear: 4,
    title: "小型演出與排練要點",
    level: "advanced",
    description: "音量平衡、檢音流程、set list 與心態準備。",
    topics: ["監聽與主 PA", "備用導線", "分段 Rehearsal", "上台前暖手"],
    youtubeSearch: "band rehearsal tips guitarist",
    practiceSong: ps("Roadhouse Blues", "The Doors", "Roadhouse Blues guitar lesson live feel", "現場律動與重複段。"),
  },

  // ─── 第五年（8）───
  {
    id: "lesson-12",
    planYear: 5,
    title: "點弦 (Tapping) 技巧",
    level: "advanced",
    description: "Eddie Van Halen 經典技巧，用右手手指在琴頸上搥弦。",
    topics: ["單指點弦", "基本 Tapping 樂句", "多指點弦入門", "經典樂句練習"],
    youtubeSearch: "電吉他 Tapping 點弦技巧教學",
    practiceSong: ps("Eruption", "Van Halen", "Eruption Van Halen tapping tutorial", "點弦經典（先學片段）。"),
  },
  {
    id: "lesson-42",
    planYear: 5,
    title: "點弦與琶音結合",
    level: "advanced",
    description: "把琶音輪廓與點弦段落銜接，注意音量均衡。",
    topics: ["左右手分工", "消音技巧", "漸強漸弱", "小段落循環"],
    youtubeSearch: "tapping arpeggios guitar lesson",
    practiceSong: ps("Hot for Teacher", "Van Halen", "Hot For Teacher guitar tapping riff", "點弦與節奏結合。"),
  },
  {
    id: "lesson-43",
    planYear: 5,
    title: "速彈與交替撥弦基礎",
    level: "advanced",
    description: "在乾淨前提下漸進提速，搭配放鬆與節拍細分。",
    topics: ["16 音符分組", "手腕與手指分工", "錄影檢查", "休息間隔"],
    youtubeSearch: "speed building guitar alternate picking",
    practiceSong: ps("Master of Puppets riff", "Metallica", "Master of Puppets guitar riff lesson downpicking", "持續下撥與耐力。"),
  },
  {
    id: "lesson-44",
    planYear: 5,
    title: "奇數拍與重音遊戲",
    level: "advanced",
    description: "7/8、5/4 等拍的數拍與重音漂移練習。",
    topics: ["2+2+3 組合", "身體律動", "與鼓對點", "簡化 riffs"],
    youtubeSearch: "7/8 guitar riff lesson",
    practiceSong: ps("Money", "Pink Floyd", "Money Pink Floyd 7/8 bass guitar riff lesson", "奇數拍經典（吉他跟進同型態）。"),
  },
  {
    id: "lesson-45",
    planYear: 5,
    title: "改編與簡化譜思維",
    level: "advanced",
    description: "把複雜編曲收斂成可演奏版，保留聽覺重點。",
    topics: ["刪繁就簡", "移調可行性", "和聲替代", "自製 lead sheet"],
    youtubeSearch: "guitar arrangement simplify song",
    practiceSong: ps("Blackbird", "The Beatles", "Blackbird guitar lesson fingerpicking", "獨奏編配思維（可改以撥片／電琴音色嘗試）。"),
  },
  {
    id: "lesson-46",
    planYear: 5,
    title: "器材維護與手感調整入門",
    level: "advanced",
    description: "弦高、八度、換弦週期與清潔，減少練習阻力。",
    topics: ["弦距粗判", "換弦步驟", "指板保養", "何時尋求技師"],
    youtubeSearch: "electric guitar setup basics",
    practiceSong: ps("自行選曲", "維護後試彈", "electric guitar clean tone chord check", "維護後用簡單和弦＋單音檢查手感與八度。"),
  },
  {
    id: "lesson-47",
    planYear: 5,
    title: "長期練習週期與檢核",
    level: "advanced",
    description: "以月／季為單位設定目標、弱項與展演里程碑。",
    topics: ["練習日誌", "錄影音存檔", "弱點課表", "心態與休息"],
    youtubeSearch: "guitar practice routine advanced",
    practiceSong: ps("自行選曲", "階段錄音", "metronome practice jam slow blues", "固定 BPM 錄一段作為月度對照。"),
  },
  {
    id: "lesson-48",
    planYear: 5,
    title: "五年總覽與進階方向",
    level: "advanced",
    description: "回顧已學技巧地圖，規劃之後專攻（爵士、融合、金屬等）。",
    topics: ["技巧檢核表", "教材與師資", "樂團／創作", "健康演奏"],
    youtubeSearch: "guitar player next steps after fundamentals",
    practiceSong: ps("Free Bird", "Lynyrd Skynyrd", "Free Bird guitar solo lesson", "長篇搖滾敘事與技巧總合（可先學副歌與主題）。"),
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return CURRICULUM.find((l) => l.id === id);
}

export function getLessonsByLevel(level: Lesson["level"]): Lesson[] {
  return CURRICULUM.filter((l) => l.level === level);
}

export function getLessonsByPlanYear(year: 1 | 2 | 3 | 4 | 5): Lesson[] {
  return CURRICULUM.filter((l) => l.planYear === year);
}

export const PLAN_YEARS = [1, 2, 3, 4, 5] as const;
