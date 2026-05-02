/**
 * 吉他手賞析：入門提點與推薦人物（連結以百科／機構／搜尋為主，影片交由 YouTube 搜尋結果，較不易失效）。
 */

export type AppreciationLink = {
  label: string;
  href: string;
};

export type FeaturedGuitarist = {
  id: string;
  name: string;
  /** 一句話風格定位 */
  tagline: string;
  /** 入門可以怎麼聽 */
  listenFor: string[];
  links: AppreciationLink[];
};

export const APPRECIATION_INTRO = {
  title: "入門可以怎麼欣賞？",
  /** 給完全初學者的聽覺框架 */
  principles: [
    {
      heading: "先聽「音色與力道」",
      body: "同一句旋律，清音、破音、悶音會傳達不同情緒。注意右手觸弦輕重與悶音比例，而不只是「快或慢」。",
    },
    {
      heading: "再聽「節奏與呼吸」",
      body: "好樂手常在句與句之間留白。試著打拍子跟和弦進行，再注意吉他手是在拍點上還是稍稍「推／拖」製造張力。",
    },
    {
      heading: "注意「音準與表情」",
      body: "推弦到是否到點、顫音穩不穩、搥勾是否乾淨，會大幅影響「像不像在唱歌」。可挑 10～20 秒片段反覆聽。",
    },
    {
      heading: "對照「現場 vs 錄音室」",
      body: "現場版多了互動與風險，錄音室版通常更精緻。對照同一首歌兩種版本，最容易發現樂手的習慣與偏好。",
    },
  ],
  note: "以下人物僅作為入門賞析起點，非排名。建議從你覺得好聽的一段開始，對照本站的技巧詞彙（推弦、悶音、點弦等）會更有感。",
};

export const FEATURED_GUITARISTS: FeaturedGuitarist[] = [
  {
    id: "hendrix",
    name: "Jimi Hendrix",
    tagline: "六〇年代末搖滾與藍調融合、音箱回授與即興句式。",
    listenFor: [
      "右手音量旋鈕與音箱破音的互动，製造動態起伏。",
      "長音上的顫音與推弦，是否「唱得出來」。",
      "和弦與即興音階切換時，句尾怎麼收尾。",
    ],
    links: [
      { label: "Wikipedia（傳略與影響）", href: "https://en.wikipedia.org/wiki/Jimi_Hendrix" },
      { label: "Rock & Roll Hall of Fame — 入堂介紹", href: "https://www.rockhall.com/inductees/jimi-hendrix" },
      { label: "YouTube 搜尋：現場演出精選", href: "https://www.youtube.com/results?search_query=Jimi+Hendrix+live+performance" },
    ],
  },
  {
    id: "bb-king",
    name: "B.B. King",
    tagline: "藍調吉他「一個音說一個故事」的顫音與句法。",
    listenFor: [
      "單音長句裡，顫音起步與結尾的速度變化。",
      "樂句之間的停頓與呼吸，像說話一樣。",
      "與樂隊呼應時，吉他在哪個落點「讓」給其他樂器。",
    ],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/B.B._King" },
      { label: "Britannica", href: "https://www.britannica.com/biography/B-B-King" },
      { label: "YouTube 搜尋：現場 Live", href: "https://www.youtube.com/results?search_query=B.B.+King+live+guitar" },
    ],
  },
  {
    id: "gilmour",
    name: "David Gilmour",
    tagline: "空間感、bend 與延音，旋律性搖滾 solo 的經典範本。",
    listenFor: [
      "推弦音準與維持時間，搭配延遲效果時的層次。",
      "慢速樂句裡，每個音的力道是否一致。",
      "和聲與 solo 切換時，角色如何轉換。",
    ],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/David_Gilmour" },
      { label: "Rock & Roll Hall of Fame — Pink Floyd", href: "https://www.rockhall.com/inductees/pink-floyd" },
      { label: "YouTube 搜尋：comfortably numb solo live", href: "https://www.youtube.com/results?search_query=David+Gilmour+comfortably+numb+live" },
    ],
  },
  {
    id: "van-halen",
    name: "Eddie Van Halen",
    tagline: "點弦、琶音與高速樂句；八〇年代搖滾吉他技術革新代表。",
    listenFor: [
      "點弦段落與一般按弦的音色是否均衡。",
      "快到難以分辨時，重拍是否仍清楚。",
      "同一段落現場與專輯差異，技巧取捨何在。",
    ],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Eddie_Van_Halen" },
      { label: "Britannica", href: "https://www.britannica.com/biography/Eddie-Van-Halen" },
      { label: "YouTube 搜尋：Eruption live", href: "https://www.youtube.com/results?search_query=Eddie+Van+Halen+Eruption+live" },
    ],
  },
  {
    id: "srv",
    name: "Stevie Ray Vaughan",
    tagline: "德州藍調搖滾，爆發力與動態、雙音與節奏和弦並重。",
    listenFor: [
      "粗弦上的推弦是否仍維持音準。",
      "快段與慢段之間的對比。",
      "右手悶音與開放弦穿插時的節奏感。",
    ],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Stevie_Ray_Vaughan" },
      { label: "Britannica", href: "https://www.britannica.com/biography/Stevie-Ray-Vaughan" },
      { label: "YouTube 搜尋：Pride and Joy live", href: "https://www.youtube.com/results?search_query=Stevie+Ray+Vaughan+Pride+and+Joy+live" },
    ],
  },
  {
    id: "tharpe",
    name: "Sister Rosetta Tharpe",
    tagline: "福音與早期電吉他，影響搖滾與藍調吉他語彙的先驅之一。",
    listenFor: [
      "掃弦節奏與歌唱之間的同步，驅動整首歌的律動。",
      "早期電吉他音色偏乾淨或微破時，右手如何控制。",
      "與現代搖滾手對照，哪些句型一脈相承。",
    ],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Sister_Rosetta_Tharpe" },
      { label: "Library of Congress — Songs of America 系列入口", href: "https://www.loc.gov/collections/songs-of-america/about-this-collection/" },
      { label: "YouTube 搜尋：現場演出", href: "https://www.youtube.com/results?search_query=Sister+Rosetta+Tharpe+live" },
    ],
  },
  {
    id: "morello",
    name: "Tom Morello",
    tagline: "另類金屬與嘻哈元素，效果器與非傳統技巧製造「非吉他聲響」。",
    listenFor: [
      "哪些聲音其實來自效果器與拾音器切換，而非複雜速彈。",
      " riff 的律動是否適合跳舞或點頭。",
      "政治與文本訊息強的樂團裡，吉他角色如何服務歌曲。",
    ],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Tom_Morello" },
      { label: "Rock & Roll Hall of Fame — Rage Against the Machine", href: "https://www.rockhall.com/inductees/rage-against-the-machine" },
      { label: "YouTube 搜尋：guitar solo live", href: "https://www.youtube.com/results?search_query=Tom+Morello+guitar+solo+live" },
    ],
  },
];
