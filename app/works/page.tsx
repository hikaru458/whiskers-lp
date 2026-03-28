"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Play, 
  Heart, 
  Eye, 
  Filter,
  Award
} from "lucide-react";

// モックUGCデータ - 部門別
const ugcWorks = [
  {
    id: 1,
    title: "マルチユーススキンケア - 朝のルーティン",
    brand: "BeautyLab",
    product: "All-in-Oneジェル",
    creator: "Sさん",
    department: "video",
    views: 12500,
    likes: 892,
    thumbnail: "🎬",
    type: "portrait",
    featured: true
  },
  {
    id: 2,
    title: "プロテインドリンク紹介動画",
    brand: "HealthyDrink",
    product: "WHEY PROTEIN",
    creator: "Tさん",
    department: "video",
    views: 8900,
    likes: 654,
    thumbnail: "🥤",
    type: "portrait",
    featured: false
  },
  {
    id: 3,
    title: "TechStart コーポレートサイト",
    brand: "TechStart",
    product: "HPデザイン",
    creator: "WebデザイナーKさん",
    department: "design",
    views: 3200,
    likes: 445,
    thumbnail: "�",
    type: "portrait",
    featured: true
  },
  {
    id: 4,
    title: "カフェモリ ブランディング",
    brand: "CafeMori",
    product: "ロゴ・メニュー",
    creator: "グラフィックYさん",
    department: "design",
    views: 2100,
    likes: 332,
    thumbnail: "☕",
    type: "portrait",
    featured: false
  },
  {
    id: 5,
    title: "スイーツパラダイス パッケージ",
    brand: "SweetsParadise",
    product: "アイスクリーム",
    creator: "イラストレーターMさん",
    department: "illustration",
    views: 5600,
    likes: 721,
    thumbnail: "🍨",
    type: "portrait",
    featured: true
  },
  {
    id: 6,
    title: "書籍装丁イラスト",
    brand: "BookStore",
    product: "ライトノベル表紙",
    creator: "漫画家Aさん",
    department: "illustration",
    views: 4300,
    likes: 555,
    thumbnail: "�",
    type: "portrait",
    featured: false
  },
  {
    id: 7,
    title: "リラックススパ BGM",
    brand: "RelaxSpa",
    product: "店内BGM",
    creator: "作曲家Hさん",
    department: "music",
    views: 2800,
    likes: 298,
    thumbnail: "🎵",
    type: "portrait",
    featured: false
  },
  {
    id: 8,
    title: "RPGフィールド曲",
    brand: "GameStudio",
    product: "ゲームBGM",
    creator: "サウンドDさん",
    department: "music",
    views: 5200,
    likes: 612,
    thumbnail: "🎮",
    type: "portrait",
    featured: true
  }
];

const departments = [
  { id: "all", label: "すべて", icon: null },
  { id: "video", label: "動画部門", icon: "🎬" },
  { id: "design", label: "HPデザイン部門", icon: "💻" },
  { id: "illustration", label: "商品イラスト部門", icon: "✏️" },
  { id: "music", label: "音楽部門", icon: "🎵" }
];

export default function GalleryPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);

  const filteredWorks = selectedDepartment === "all" 
    ? ugcWorks 
    : ugcWorks.filter(work => work.department === selectedDepartment);

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
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            トップに戻る
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-2">
                作品ギャラリー
              </h1>
              <p className="text-gray-600">
                Whiskersで生まれたUGC作品の数々
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedDepartment === dept.id
                    ? "bg-[#1a1a2e] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {dept.icon && <span>{dept.icon}</span>}
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredWorks.map((work) => (
              <Link key={work.id} href={`/works/${work.id}`}>
                <div
                  className="group relative bg-gray-100 rounded-2xl overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredWork(work.id)}
                  onMouseLeave={() => setHoveredWork(null)}
                >
                {/* Thumbnail */}
                <div className="aspect-[9/16] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-6xl">{work.thumbnail}</span>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-all ${
                    hoveredWork === work.id ? "scale-110" : ""
                  }`}>
                    <Play className="w-6 h-6 text-[#1a1a2e] ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Featured Badge */}
                {work.featured && (
                  <div className="absolute top-3 left-3">
                    <div className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-[#ff6b35] text-white">
                      <Award className="w-3 h-3" />
                      注目作品
                    </div>
                  </div>
                )}

                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                    {work.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span>{work.brand}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {(work.views / 1000).toFixed(1)}k
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" fill="currentColor" />
                        {work.likes}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/60">
                    by {work.creator}
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredWorks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">該当する作品がありません</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a1a2e] mb-1">{ugcWorks.length}</div>
              <p className="text-sm text-gray-600">採用作品</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a1a2e] mb-1">4</div>
              <p className="text-sm text-gray-600">参加ブランド</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a1a2e] mb-1">6</div>
              <p className="text-sm text-gray-600">活躍クリエイター</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1a1a2e] mb-1">58.5k</div>
              <p className="text-sm text-gray-600">総再生回数</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">
            あなたの商品もUGCで広がりませんか？
          </h2>
          <p className="text-gray-600 mb-8">
            コンテストを開催して、クリエイターの創造力を解放しましょう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contest"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium bg-[#ff6b35] text-white hover:bg-[#e55a2b] transition-all"
            >
              コンテストを見る
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white transition-all"
            >
              お問い合わせ
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
