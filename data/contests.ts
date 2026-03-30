// コンテストデータ型定義とサンプルデータ

export interface Contest {
  id: string;
  title: string;
  brandName: string;
  brandLogo?: string;
  description: string;
  requirements: string;
  prize: {
    total: number;
    breakdown: {
      rank: string;
      amount: number;
    }[];
  };
  deadline: string;
  status: "open" | "closed" | "upcoming";
  category: "product" | "video" | "photo" | "design" | "other";
  tags: string[];
  thumbnail: string;
  entries: number;
  createdAt: string;
  judgingCriteria: string[];
  productInfo?: {
    name: string;
    description: string;
    image?: string;
  };
}

export interface Entry {
  id: string;
  contestId: string;
  creatorName: string;
  creatorAvatar?: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  submittedAt: string;
  likes: number;
  isWinner?: boolean;
  prizeRank?: string;
}

// サンプルコンテストデータ
export const sampleContests: Contest[] = [
  {
    id: "contest-001",
    title: "初夏のスキンケア製品 写真コンテスト",
    brandName: "GlowBeauty",
    description: "当社の新商品「ハイドレーティングセラム」を使用した、美しい肌の瞬間を撮影してください。自然光を活かした写真をお待ちしています。",
    requirements: "・製品が写っていること\n・人物が写っていてもOK\n・自然光または明るい照明で撮影\n・縦横比自由",
    prize: {
      total: 300000,
      breakdown: [
        { rank: "大賞", amount: 100000 },
        { rank: "優秀賞", amount: 50000 },
        { rank: "入選", amount: 20000 },
      ],
    },
    deadline: "2025-06-30",
    status: "open",
    category: "photo",
    tags: ["スキンケア", "美容", "写真"],
    thumbnail: "/images/contest-skincare.jpg",
    entries: 128,
    createdAt: "2025-04-01",
    judgingCriteria: ["製品の見せ方", "創意性", "映え", "品質"],
    productInfo: {
      name: "ハイドレーティングセラム",
      description: "保湿成分たっぷりの美容液",
    },
  },
  {
    id: "contest-002",
    title: "新商品アイスコーヒー 動画レビュー募集",
    brandName: "Morning Brew",
    description: "新発売の「クリーミーアイスラテ」を実際に飲んで、15秒〜60秒の動画レビューを投稿してください。",
    requirements: "・15秒〜60秒の動画\n・実際に製品を使用していること\n・音声コメントまたはテロップ付き\n・縦型（9:16）推奨",
    prize: {
      total: 500000,
      breakdown: [
        { rank: "大賞", amount: 200000 },
        { rank: "準大賞", amount: 100000 },
        { rank: "入選", amount: 30000 },
      ],
    },
    deadline: "2025-05-15",
    status: "open",
    category: "video",
    tags: ["飲料", "コーヒー", "動画"],
    thumbnail: "/images/contest-coffee.jpg",
    entries: 245,
    createdAt: "2025-03-15",
    judgingCriteria: ["再現性", "訴求力", "エンゲージメント", "信頼性"],
    productInfo: {
      name: "クリーミーアイスラテ",
      description: "濃厚な味わいのアイスコーヒー",
    },
  },
  {
    id: "contest-003",
    title: "手作り雑貨ブランド パッケージデザイン",
    brandName: "Handmade Atelier",
    description: "当社の手作り石けんシリーズのパッケージデザインを募集します。自然素材の温かみを表現してください。",
    requirements: "・A4サイズ（縦または横）\n・CMYKカラー\n・解像度300dpi以上\n・PDFまたはAI形式",
    prize: {
      total: 200000,
      breakdown: [
        { rank: "採用賞", amount: 150000 },
        { rank: "優秀賞", amount: 50000 },
      ],
    },
    deadline: "2025-07-20",
    status: "upcoming",
    category: "design",
    tags: ["雑貨", "パッケージ", "デザイン"],
    thumbnail: "/images/contest-package.jpg",
    entries: 0,
    createdAt: "2025-04-10",
    judgingCriteria: ["ブランドイメージ", "実用性", "視認性", "印刷適性"],
  },
];

// サンプル応募作品データ
export const sampleEntries: Entry[] = [
  {
    id: "entry-001",
    contestId: "contest-001",
    creatorName: "photo_creator_akari",
    title: "朝のスキンケアタイム",
    description: "窓から差し込む自然光で撮影しました。透明感のある肌になれる瞬間を捉えました。",
    mediaUrl: "/images/entry-001.jpg",
    mediaType: "image",
    submittedAt: "2025-04-15",
    likes: 342,
    isWinner: true,
    prizeRank: "大賞",
  },
  {
    id: "entry-002",
    contestId: "contest-001",
    creatorName: "beauty_taro",
    title: "もちもち肌の秘密",
    description: "使用後のハリ感がすごい！リピート確定です。",
    mediaUrl: "/images/entry-002.jpg",
    mediaType: "image",
    submittedAt: "2025-04-16",
    likes: 198,
    isWinner: true,
    prizeRank: "優秀賞",
  },
];
