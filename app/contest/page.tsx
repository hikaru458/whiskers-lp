"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Calendar, Gift, Users, ArrowRight, Palette, Film, PenTool, Music } from "lucide-react";
import { CatLogo } from "@/components/CatLogo";

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
    description: "自然派スキンケア企業の新商品。使い心地や効果を動画で紹介してください。",
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
    description: "新発売のスイーツ企業。可愛らしく食欲をそそるイラストを募集。デジタル・手書き可。",
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
    description: "カフェのマスコットキャラクターを募集。SNSで使えるシンプルなデザインを。",
    color: "#4ecdc4",
  },
  {
    id: 203,
    brand: "BookStore",
    project: "書籍装丁イラスト",
    category: "書籍装丁",
    prize: 30000,
    deadline: "2024年5月25日",
    participants: 14,
    description: "ライトノベルの表紙イラストを募集。ファンタジー世界観の作品です。",
    color: "#ff6b35",
  },
];

// モックデータ - 音楽コンテスト
const musicContests = [
  {
    id: 301,
    brand: "RelaxSpa",
    project: "店内BGM制作",
    category: "BGM・環境音楽",
    prize: 45000,
    deadline: "2024年5月30日",
    participants: 11,
    description: "スパ施設で流す癒しのBGMを募集。自然音を取り入れたリラックス楽曲を。",
    color: "#4ecdc4",
  },
  {
    id: 302,
    brand: "GameStudio",
    project: "ゲームBGM",
    category: "ゲーム音楽",
    prize: 50000,
    deadline: "2024年6月5日",
    participants: 7,
    description: "RPGのフィールド曲を募集。冒険心を掻き立てる楽曲をお待ちしています。",
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

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#ff6b35]/10 to-[#ff6b35]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#4ecdc4]/10 to-[#4ecdc4]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}

export default function ContestPage() {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <CatLogo className="w-10 h-10 shadow-lg rounded-xl group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1a1a2e] to-[#4a4a5e] bg-clip-text text-transparent">
                Whiskers
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Top
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/works" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/creators" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Creators
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/contest" className="text-sm text-[#ff6b35] font-medium relative group">
                Contest
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff6b35]" />
              </Link>
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-[0.1em]">
              <span className="bg-gradient-to-r from-[#1a1a2e] via-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent">
                コンテスト一覧
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              企業が求める作品を募集しています。あなたの創造力で賞金を獲得しよう。
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "video"
                  ? "bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] text-white shadow-lg shadow-[#ff6b35]/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6b35] hover:text-[#ff6b35] hover:shadow-md"
              }`}
            >
              <Film className="w-4 h-4" />
              動画部門
            </button>
            <button
              onClick={() => setActiveTab("design")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "design"
                  ? "bg-gradient-to-r from-[#4ecdc4] to-[#5dddd5] text-white shadow-lg shadow-[#4ecdc4]/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#4ecdc4] hover:text-[#4ecdc4] hover:shadow-md"
              }`}
            >
              <Palette className="w-4 h-4" />
              HPデザイン部門
            </button>
            <button
              onClick={() => setActiveTab("illustration")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "illustration"
                  ? "bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] text-white shadow-lg shadow-[#ff6b35]/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6b35] hover:text-[#ff6b35] hover:shadow-md"
              }`}
            >
              <PenTool className="w-4 h-4" />
              商品イラスト部門
            </button>
            <button
              onClick={() => setActiveTab("music")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "music"
                  ? "bg-gradient-to-r from-[#4ecdc4] to-[#5dddd5] text-white shadow-lg shadow-[#4ecdc4]/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#4ecdc4] hover:text-[#4ecdc4] hover:shadow-md"
              }`}
            >
              <Music className="w-4 h-4" />
              音楽部門
            </button>
          </div>
        </div>
      </section>

      {/* Contest Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Department Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">
              {activeTab === "video" ? "🎬" : 
               activeTab === "design" ? "🎨" :
               activeTab === "illustration" ? "✏️" : "🎵"}
            </span>
            <h2 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-xl font-bold text-[#1a1a2e] tracking-[0.05em]">
              {activeTab === "video" ? "動画コンテスト" : 
               activeTab === "design" ? "デザインコンテスト" :
               activeTab === "illustration" ? "イラストコンテスト" : "音楽コンテスト"}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {(activeTab === "video" ? videoContests : 
              activeTab === "design" ? designContests :
              activeTab === "illustration" ? illustrationContests : musicContests).map((contest) => (
              <div 
                key={contest.id} 
                className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02] flex flex-col h-full"
              >
                {/* Card Header */}
                <div 
                  className="h-28 flex items-center justify-center relative overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: `${contest.color}10` }}
                >
                  {/* Gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${contest.color}20, transparent)` }}
                  />
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: `${contest.color}25` }}
                  >
                    {activeTab === "video" ? "🎁" : 
                     activeTab === "design" ? "🎨" :
                     activeTab === "illustration" ? "✏️" : "🎵"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Category Badge */}
                  <span 
                    className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
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
                  <p className="text-gray-500 text-sm mb-5 line-clamp-2 flex-grow">
                    {contest.description}
                  </p>

                  {/* Prize */}
                  <div className="flex items-center gap-2 mb-5">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${contest.color}15` }}
                    >
                      <Gift className="w-4 h-4" style={{ color: contest.color }} />
                    </div>
                    <span className="font-bold text-lg" style={{ color: contest.color }}>
                      賞金 ¥{contest.prize.toLocaleString()}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-5 py-3 border-t border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>締切: {contest.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{contest.participants}人参加中</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2 mt-auto">
                    <Link
                      href={`/contest/${contest.id}`}
                      className="block w-full text-center py-3 rounded-full font-medium border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
                    >
                      詳細を見る
                    </Link>
                    <Link
                      href="/contact"
                      className="block w-full text-center py-3 rounded-full font-medium text-white transition-all hover:opacity-90 shadow-md hover:shadow-lg"
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
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full text-gray-500 text-sm">
              <span>✨</span>
              <span>新しいコンテストは随時追加されます</span>
            </div>
            <Link 
              href="/contact"
              className="flex items-center justify-center gap-2 mt-6 text-[#ff6b35] hover:text-[#e55a2b] font-medium transition-colors group"
            >
              企業様はこちらからコンテスト開催のお問い合わせ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <CatLogo className="w-10 h-10 shadow-lg rounded-xl group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xl font-bold text-[#1a1a2e]">Whiskers</span>
                <span className="text-sm text-gray-500 ml-2">— 創造をつなぐ</span>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <Link href="/terms" className="hover:text-[#ff6b35] transition-colors">利用規約</Link>
              <Link href="/privacy" className="hover:text-[#ff6b35] transition-colors">プライバシーポリシー</Link>
              <span className="hidden sm:inline">|</span>
              <span>© 2024 Whiskers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
