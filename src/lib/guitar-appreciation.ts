/**
 * 吉他手賞析：入門提點與推薦人物（連結以百科／機構／搜尋為主，影片交由 YouTube 搜尋結果，較不易失效）。
 */

export type AppreciationLink = {
  label: string;
  href: string;
};

/** 入門聆聽推薦曲（連結多以 YouTube 搜尋，較不受單支影片下架影響） */
export type ClassicSong = {
  title: string;
  /** 補充：專輯、年代或版本提示 */
  context?: string;
  href: string;
};

export type GuitaristPortrait = {
  src: string;
  alt: string;
};

export type FeaturedGuitarist = {
  id: string;
  name: string;
  /** 一句話風格定位 */
  tagline: string;
  /** 代表性事蹟／里程碑（入門脈絡） */
  milestones: string[];
  /** 經典或入門推薦曲目 */
  classicSongs: ClassicSong[];
  /** 條目摘要圖（來自 Wikipedia / Wikimedia Commons） */
  portrait: GuitaristPortrait;
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
    portrait: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Jimi_Hendrix_%281967%29_%28cropped%29.jpg/500px-Jimi_Hendrix_%281967%29_%28cropped%29.jpg",
      alt: "Jimi Hendrix 1967 年演出留影（半身特写）",
    },
    milestones: [
      "1966 年赴倫敦後爆紅，The Jimi Hendrix Experience 重塑當時搖滾現場能量。",
      "1967 年蒙特婁流行音樂節等標誌性演出，推廣迴授、哇音與高增益音色。",
      "1969 年 Woodstock 閉幕日演出成為流行文化經典畫面之一。",
      "英年早逝後仍持續影響搖滾、放克與嘻哈取樣；1992 年進入搖滾名人堂。",
    ],
    classicSongs: [
      {
        title: "Purple Haze",
        context: "出道單曲方向標誌",
        href: "https://www.youtube.com/results?search_query=Jimi+Hendrix+Purple+Haze+live",
      },
      {
        title: "All Along the Watchtower",
        context: "Dylan 翻玩，展現編曲與音色",
        href: "https://www.youtube.com/results?search_query=Jimi+Hendrix+All+Along+the+Watchtower",
      },
      {
        title: "Little Wing",
        context: "旋律性與空間感",
        href: "https://www.youtube.com/results?search_query=Jimi+Hendrix+Little+Wing",
      },
      {
        title: "Voodoo Child (Slight Return)",
        context: "哇音與藍調搖滾句型",
        href: "https://www.youtube.com/results?search_query=Jimi+Hendrix+Voodoo+Child+Slight+Return",
      },
    ],
    listenFor: [
      "右手音量旋鈕與音箱破音的互動，製造動態起伏。",
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
    portrait: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bbking.jpg/500px-Bbking.jpg",
      alt: "B.B. King 手持吉他「Lucille」演出",
    },
    milestones: [
      "出身密西西比三角洲藍調傳統，長年以巡迴與錄音讓藍調全球化。",
      "名琴「Lucille」與招牌單音句法，定義「少即是多」的藍調吉他。",
      "多次葛萊美獎与大奬肯定；1987 年以演奏者身分進入搖滾名人堂。",
      "晚年仍活躍合作跨世代音樂人，被譽為「藍調之王」。",
    ],
    classicSongs: [
      {
        title: "The Thrill Is Gone",
        context: "慢藍調與顫音教科書",
        href: "https://www.youtube.com/results?search_query=B.B.+King+The+Thrill+Is+Gone+live",
      },
      {
        title: "Rock Me Baby",
        context: "律動與呼應樂隊",
        href: "https://www.youtube.com/results?search_query=B.B.+King+Rock+Me+Baby",
      },
      {
        title: "Every Day I Have the Blues",
        context: "現場對話感句法",
        href: "https://www.youtube.com/results?search_query=B.B.+King+Every+Day+I+Have+the+Blues",
      },
    ],
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
    portrait: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/DGilmourRAH111024_%2821_of_63%29_%28cropped%29.jpg/500px-DGilmourRAH111024_%2821_of_63%29_%28cropped%29.jpg",
      alt: "David Gilmour 舞台上演奏（裁剪）",
    },
    milestones: [
      "1968 年接替 Syd Barrett 進入 Pink Floyd，成為樂團聲音與演出核心之一。",
      "《The Dark Side of the Moon》《Wish You Were Here》《The Wall》等專輯奠定概念搖滾高峰。",
      "以延遲、音量與推弦音準塑造「歌唱式」長音 solo；長年主導樂團與個人巡演。",
      "1996 年與 Pink Floyd 共同進入搖滾名人堂。",
    ],
    classicSongs: [
      {
        title: "Comfortably Numb",
        context: "尾奏 solo 常被視為搖滾經典",
        href: "https://www.youtube.com/results?search_query=David+Gilmour+Comfortably+Numb+live+pulse",
      },
      {
        title: "Shine On You Crazy Diamond",
        context: "音色層次與段落敘事",
        href: "https://www.youtube.com/results?search_query=Pink+Floyd+Shine+On+You+Crazy+Diamond",
      },
      {
        title: "Time",
        context: "solo 與時鐘聲響的戲劇感",
        href: "https://www.youtube.com/results?search_query=Pink+Floyd+Time+solo",
      },
    ],
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
    portrait: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Eddie_Van_Halen_at_the_New_Haven_Coliseum.jpg/500px-Eddie_Van_Halen_at_the_New_Haven_Coliseum.jpg",
      alt: "Eddie Van Halen 舞台上演奏",
    },
    milestones: [
      "1978 年首張《Van Halen》以《Eruption》等曲驚艷樂壇，帶動八〇年代吉他技術熱潮。",
      "推廣雙手點弦、泛音與高速琶音等玩法，深深影響金屬與搖滾吉他。",
      "Frankenstrat 等自改琴與音箱實驗，成為「音色工程師型」吉他手代表。",
      "2007 年以 Van Halen 成員身分進入搖滾名人堂；2020 年辭世後仍被廣泛取樣與致敬。",
    ],
    classicSongs: [
      {
        title: "Eruption",
        context: "器樂炫技示範曲",
        href: "https://www.youtube.com/results?search_query=Eddie+Van+Halen+Eruption",
      },
      {
        title: "Jump",
        context: "合成器與吉他 riff 的流行搖滾",
        href: "https://www.youtube.com/results?search_query=Van+Halen+Jump+official",
      },
      {
        title: "Panama",
        context: "駛勁與律動",
        href: "https://www.youtube.com/results?search_query=Van+Halen+Panama",
      },
    ],
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
    portrait: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stevie_Ray_Vaughan_Live_1983.jpg/500px-Stevie_Ray_Vaughan_Live_1983.jpg",
      alt: "Stevie Ray Vaughan 1983 年現場",
    },
    milestones: [
      "1983 年《Texas Flood》出道即受矚目，帶動八〇年代藍調搖滾復興。",
      "以重型弦徑、暴烈動態與精準推弦著稱；曾與 David Bowie 等音樂人合作錄音。",
      "1990 年英年早逝，留下多張現場與錄音室經典；多次獲葛萊美肯定（含逝後追授）。",
    ],
    classicSongs: [
      {
        title: "Pride and Joy",
        context: "德州 shuffle 與雙音",
        href: "https://www.youtube.com/results?search_query=Stevie+Ray+Vaughan+Pride+and+Joy+live",
      },
      {
        title: "Texas Flood",
        context: "慢藍調與長音張力",
        href: "https://www.youtube.com/results?search_query=Stevie+Ray+Vaughan+Texas+Flood",
      },
      {
        title: "Lenny",
        context: "抒情曲式與觸弦控制",
        href: "https://www.youtube.com/results?search_query=Stevie+Ray+Vaughan+Lenny+live",
      },
    ],
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
    portrait: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Sister_Rosetta_Tharpe_%281938_publicity_photo_-_headshot%29.jpg/500px-Sister_Rosetta_Tharpe_%281938_publicity_photo_-_headshot%29.jpg",
      alt: "Sister Rosetta Tharpe 1938 年宣傳照",
    },
    milestones: [
      "三〇～四〇年代即以福音演唱會與錄音推廣電吉他，被視為搖滾先驅之一。",
      "結合掃弦節奏、飆高音與舞台魅力，影響後世藍調與搖滾吉他手。",
      "2018 年以早期影響獎項目進入搖滾名人堂，聲譽持續被音樂史學界重新發掘。",
    ],
    classicSongs: [
      {
        title: "Strange Things Happening Every Day",
        context: "里程碑式錄音之一",
        href: "https://www.youtube.com/results?search_query=Sister+Rosetta+Tharpe+Strange+Things+Happening+Every+Day",
      },
      {
        title: "Up Above My Head",
        context: "福音與律動驅動",
        href: "https://www.youtube.com/results?search_query=Sister+Rosetta+Tharpe+Up+Above+My+Head+live",
      },
      {
        title: "Didn't It Rain",
        context: "現場能量與觀眾互動",
        href: "https://www.youtube.com/results?search_query=Sister+Rosetta+Tharpe+Didn%27t+It+Rain",
      },
    ],
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
    portrait: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Tom_Morello.jpg/500px-Tom_Morello.jpg",
      alt: "Tom Morello 演出留影",
    },
    milestones: [
      "1990 年代與 Rage Against the Machine、AudioSlave 等樂團，將強烈政治文本與重 riff 結合。",
      "以飛機音、DJ 式刮弦、拾音器切換與效果器變化，開拓「聲音設計」取向的搖滾吉他。",
      "2022 年以 Rage Against the Machine 成員身分進入搖滾名人堂。",
    ],
    classicSongs: [
      {
        title: "Killing in the Name",
        context: "爆發 riff 與現場張力",
        href: "https://www.youtube.com/results?search_query=Rage+Against+the+Machine+Killing+in+the+Name+live",
      },
      {
        title: "Bulls on Parade",
        context: "效果器與節奏聲響",
        href: "https://www.youtube.com/results?search_query=Rage+Against+the+Machine+Bulls+on+Parade",
      },
      {
        title: "Guerrilla Radio",
        context: "節奏與 hook",
        href: "https://www.youtube.com/results?search_query=Rage+Against+the+Machine+Guerrilla+Radio",
      },
    ],
    listenFor: [
      "哪些聲音其實來自效果器與拾音器切換，而非複雜速彈。",
      "Riff 的律動是否適合跳舞或點頭。",
      "政治與文本訊息強的樂團裡，吉他角色如何服務歌曲。",
    ],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Tom_Morello" },
      { label: "Rock & Roll Hall of Fame — Rage Against the Machine", href: "https://www.rockhall.com/inductees/rage-against-the-machine" },
      { label: "YouTube 搜尋：guitar solo live", href: "https://www.youtube.com/results?search_query=Tom+Morello+guitar+solo+live" },
    ],
  },
];
