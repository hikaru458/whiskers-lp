"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Calendar, Gift, Users, ArrowRight, Palette, Film, PenTool, Music } from "lucide-react";

// モックデータ - 動画コンテスト
const videoContests = [
  {
    id: 1,
    brand: "BeautyLab",
    product: "オーガニック美容液",
    category: "美容・スキンケア",
    prize: 30000,
    deadline: "2024年4月15日",
    participants: 12,
    description: "自然派スキンケアブランドの新商品。使い心地や効果を動画で紹介してください。",
    color: "#ff6b35",
  },
  {
    id: 2,
    brand: "FitPro",
    product: "プロテインバー",
    category: "健康食品",
    prize: 30000,
    deadline: "2024年4月20日",
    participants: 8,
    description: "トレーニング後のお供に。味や食べごたえを重点的に。",
    color: "#4ecdc4",
  },
  {
    id: 3,
    brand: "HomeStyle",
    product: "アロマキャンドル",
    category: "インテリア・雑貨",
    prize: 30000,
    deadline: "2024年4月25日",
    participants: 15,
    description: "リラックスできる空間演出。Lifestyle感重視。",
    color: "#ff6b35",
  },
];

// モックデータ - デザインコンテスト
const designContests = [
  {
    id: 101,
    brand: "TechStart",
    project: "コーポレートサイトリデザイン",
    category: "Webデザイン",
    prize: 50000,
    deadline: "2024年4月30日",
    participants: 6,
    description: "スタートアップ企業のHPをモダンに刷新。Figmaでのモックアップ提出。採用作品は実装予定。",
    color: "#4ecdc4",
  },
  {
    id: 102,
    brand: "CafeMori",
    project: "カフェブランディング",
    category: "グラフィックデザイン",
    prize: 30000,
    deadline: "2024年5月10日",
    participants: 9,
    description: "新店舗のロゴ、メニュー表、店内看板のデザインを募集。シンプルで温かみのあるデザインを。",
    color: "#ff6b35",
  },
  {
    id: 103,
    brand: "EcoLife",
    project: "ECサイトUI改善",
    category: "UI/UXデザイン",
    prize: 40000,
    deadline: "2024年5月5日",
    participants: 4,
    description: "サステナブル商品のECサイト。購入体験を向上させるUIデザイン案を募集。",
    color: "#4ecdc4",
  },
];

// モックデータ - イラストコンテスト
const illustrationContests = [
  {
    id: 201,
    brand: "SweetsParadise",
    project: "パッケージイラスト",
    category: "パッケージデザイン",
    prize: 35000,
    deadline: "2024年5月15日",
    participants: 18,
    description: "新発売のスイーツブランド。可愛らしく食欲をそそるイラストを募集。デジタル・手書き可。",
    color: "#ff6b35",
  },
  {
    id: 202,
    brand: "AnimalCafe",
    project: "キャラクターデザイン",
    category: "キャラクター",
    prize: 40000,
    deadline: "2024年5月20日",
    participants: 25,
    description: "動物カフェのマスコットキャラクター。SNSで使えるスタンプ風も歓迎。",
    color: "#4ecdc4",
  },
  {
    id: 203,
    brand: "BookStore",
    project: "書籍表紙イラスト",
    category: "書籍装丁",
    prize: 45000,
    deadline: "2024年5月25日",
    participants: 11,
    description: "ライトノベルの表紙イラスト。ファンタジー×日常系の世界観。採用作品は実際の表紙に。",
    color: "#ff6b35",
  },
];

// モックデータ - 音楽コンテスト
const musicContests = [
  {
    id: 301,
    brand: "RelaxSpa",
    project: "店舗BGM制作",
    category: "BGM・環境音楽",
    prize: 30000,
    deadline: "2024年5月18日",
    participants: 7,
    description: "スパ・エステ店の落ち着いたBGM。30秒〜1分のループ音源。著作権フリー。",
    color: "#4ecdc4",
  },
  {
    id: 302,
    brand: "GameStudio",
    project: "ゲームBGM",
    category: "ゲーム音楽",
    prize: 50000,
    deadline: "2024年5月30日",
    participants: 14,
    description: "RPGのフィールド曲。冒険感と癒しを兼ね備えた曲調。MIDI or WAV提出。",
    color: "#ff6b35",
  },
  {
    id: 303,
    brand: "CafeChain",
    project: "店内放送ジングル",
    category: "ジングル",
    prize: 25000,
    deadline: "2024年5月12日",
    participants: 9,
    description: "カフェチェーンのオリジナルジングル。5秒〜10秒の短い音源。歌モノ可。",
    color: "#4ecdc4",
  },
];

export default function ContestPage() {
  const [activeTab, setActiveTab] = useState<"video" | "design" | "illustration" | "music">("video");
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#1a1a2e]">Whiskers</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">トップ</Link>
              <Link href="/works" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">ギャラリー</Link>
              <Link href="/creators" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">クリエイター</Link>
              <Link href="/contest" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors">コンテスト</Link>
              <Link href="/contact" className="bg-[#ff6b35] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#e55a2b] transition-colors">お問い合わせ</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            トップに戻る
          </Link>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl">🏆</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e]">
              開催中のコンテスト
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mb-8">
            参加したいコンテストを選んで、あなたのスキルを活かしましょう。
            フォロワー数は関係ありません。創造力だけで評価されます。
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "video"
                  ? "bg-[#ff6b35] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Film className="w-4 h-4" />
              動画部門
            </button>
            <button
              onClick={() => setActiveTab("design")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "design"
                  ? "bg-[#4ecdc4] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Palette className="w-4 h-4" />
              HPデザイン部門
            </button>
            <button
              onClick={() => setActiveTab("illustration")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "illustration"
                  ? "bg-[#ff6b35] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <PenTool className="w-4 h-4" />
              商品イラスト部門
            </button>
            <button
              onClick={() => setActiveTab("music")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === "music"
                  ? "bg-[#4ecdc4] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Music className="w-4 h-4" />
              音楽部門
            </button>
          </div>
        </div>
      </section>

      {/* Contest Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Department Title */}
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
            {activeTab === "video" ? "🎬 動画コンテスト" : 
             activeTab === "design" ? "🎨 デザインコンテスト" :
             activeTab === "illustration" ? "✏️ イラストコンテスト" : "🎵 音楽コンテスト"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === "video" ? videoContests : 
              activeTab === "design" ? designContests :
              activeTab === "illustration" ? illustrationContests : musicContests).map((contest) => (
              <div 
                key={contest.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div 
                  className="h-24 flex items-center justify-center"
                  style={{ backgroundColor: `${contest.color}15` }}
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${contest.color}30` }}
                  >
                    {activeTab === "video" ? "🎁" : 
                     activeTab === "design" ? "🎨" :
                     activeTab === "illustration" ? "✏️" : "🎵"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{ 
                      backgroundColor: `${contest.color}15`,
                      color: contest.color 
                    }}
                  >
                    {contest.category}
                  </span>

                  {/* Brand & Product/Project */}
                  <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">
                    {contest.brand}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {activeTab === "video" ? (contest as any).product : (contest as any).project}
                  </p>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {contest.description}
                  </p>

                  {/* Prize */}
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-4 h-4 text-[#ff6b35]" />
                    <span className="font-bold text-[#ff6b35]">
                      賞金 ¥{contest.prize.toLocaleString()}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>締切: {contest.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{contest.participants}人参加中</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <Link
                      href={`/contest/${contest.id}`}
                      className="block w-full text-center py-2 rounded-full font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all text-sm"
                    >
                      詳細を見る
                    </Link>
                    <Link
                      href="/contact"
                      className="block w-full text-center py-3 rounded-full font-medium text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: contest.color }}
                    >
                      参加を申し込む
                      <ArrowRight className="w-4 h-4 inline ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State / Coming Soon */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              新しいコンテストは随時追加されます。
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 mt-4 text-[#ff6b35] hover:underline"
            >
              ブランド様はこちらからコンテスト開催のお問い合わせ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1a1a2e]">Whiskers</span>
              <span className="text-sm text-gray-500">— 創造をつなぐ</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>© 2024 Whiskers</span>
              <span className="hidden sm:inline">|</span>
              <span>Brand ≡ Creator ≡ Potential</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
