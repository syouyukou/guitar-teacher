export type Lesson = {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  topics: string[];
  youtubeSearch: string;
};

export const CURRICULUM: Lesson[] = [
  {
    id: "lesson-01",
    title: "認識電吉他：構造與配備",
    level: "beginner",
    description: "了解電吉他各部位名稱、功能，以及基本配備（音箱、導線、效果器）。",
    topics: ["琴頭 (Headstock)", "琴頸 (Neck)", "琴身 (Body)", "拾音器 (Pickup)", "琴橋 (Bridge)", "旋鈕 (Knobs)"],
    youtubeSearch: "電吉他構造介紹 初學者",
  },
  {
    id: "lesson-02",
    title: "持琴姿勢與調音",
    level: "beginner",
    description: "正確的持琴姿勢、Pick 握法，以及如何用調音器調音。",
    topics: ["坐姿與站姿", "Pick 握法", "左手姿勢", "調音器使用", "標準調音 EADGBe"],
    youtubeSearch: "電吉他調音 持琴姿勢 初學",


  },
  {
    id: "lesson-03",
    title: "基礎和弦：Em、Am、D、G、C",
    level: "beginner",
    description: "學習最常用的五個開放和弦，練習和弦切換。",
    topics: ["Em 和弦", "Am 和弦", "D 和弦", "G 和弦", "C 和弦", "和弦切換練習"],
    youtubeSearch: "電吉他基礎和弦 初學者 教學",


  },
  {
    id: "lesson-04",
    title: "節奏刷弦技巧",
    level: "beginner",
    description: "學習基本的刷弦節奏型態，包含下刷、上刷與悶音。",
    topics: ["下刷 (Downstroke)", "上刷 (Upstroke)", "悶音 (Palm Mute)", "基本節奏型 4/4"],
    youtubeSearch: "電吉他刷弦節奏 初學教學",


  },
  {
    id: "lesson-05",
    title: "Power Chord 強力和弦",
    level: "intermediate",
    description: "搖滾樂的基礎！學習 Power Chord 的指型與移動方式。",
    topics: ["Power Chord 指型", "移調應用", "悶音搭配", "搖滾節奏應用"],
    youtubeSearch: "Power Chord 強力和弦 教學",


  },
  {
    id: "lesson-06",
    title: "五聲音階 (Pentatonic Scale)",
    level: "intermediate",
    description: "最重要的即興音階！學習 A 小調五聲音階的第一把位。",
    topics: ["A 小調五聲音階", "第一把位指型", "上下行練習", "搭配節拍器練習"],
    youtubeSearch: "五聲音階 Pentatonic 電吉他教學",


  },
  {
    id: "lesson-07",
    title: "Bending 推弦技巧",
    level: "intermediate",
    description: "電吉他最具表情的技巧之一，學習半音和全音推弦。",
    topics: ["半音推弦", "全音推弦", "回推 (Release)", "推弦後勾弦"],
    youtubeSearch: "電吉他 Bending 推弦技巧教學",


  },
  {
    id: "lesson-08",
    title: "Vibrato 顫音技巧",
    level: "intermediate",
    description: "讓音符更有生命力的顫音技巧，搖滾與藍調必備。",
    topics: ["手腕顫音", "手指顫音", "速度與深度控制", "應用在五聲音階"],
    youtubeSearch: "電吉他 Vibrato 顫音技巧教學",


  },
  {
    id: "lesson-09",
    title: "Hammer-on & Pull-off 勾搥弦",
    level: "intermediate",
    description: "增加演奏流暢度的連奏技巧。",
    topics: ["Hammer-on 搥弦", "Pull-off 勾弦", "連續搥勾弦", "應用練習"],
    youtubeSearch: "Hammer-on Pull-off 電吉他技巧教學",


  },
  {
    id: "lesson-10",
    title: "封閉和弦與 Barre Chord",
    level: "intermediate",
    description: "學習大橫按和弦，讓所有調的和弦都能彈。",
    topics: ["F 大調和弦", "Bm 和弦", "橫按技巧訓練", "和弦移動"],
    youtubeSearch: "Barre Chord 大橫按 電吉他教學",


  },
  {
    id: "lesson-11",
    title: "即興演奏入門",
    level: "advanced",
    description: "運用五聲音階與藍調音階進行即興演奏。",
    topics: ["藍調音階", "Call & Response", "樂句構建", "搭配 Backing Track"],
    youtubeSearch: "電吉他即興 藍調音階 教學",


  },
  {
    id: "lesson-12",
    title: "點弦 (Tapping) 技巧",
    level: "advanced",
    description: "Eddie Van Halen 經典技巧，用右手手指在琴頸上搥弦。",
    topics: ["單指點弦", "基本 Tapping 樂句", "多指點弦入門", "經典樂句練習"],
    youtubeSearch: "電吉他 Tapping 點弦技巧教學",


  },
];

export function getLessonById(id: string): Lesson | undefined {
  return CURRICULUM.find((l) => l.id === id);
}

export function getLessonsByLevel(level: Lesson["level"]): Lesson[] {
  return CURRICULUM.filter((l) => l.level === level);
}
