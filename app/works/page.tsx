"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Play, 
  Heart, 
  Eye, 
  Filter,
  Award,
  ArrowRight
} from "lucide-react";
import { CatLogo } from "@/components/CatLogo";

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
    thumbnail: "💻",
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
    thumbnail: "📚",
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

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#ff6b35]/10 to-[#ff6b35]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#4ecdc4]/10 to-[#4ecdc4]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}

export default function GalleryPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);

  const filteredWorks = selectedDepartment === "all" 
    ? ugcWorks 
    : ugcWorks.filter(work => work.department === selectedDepartment);

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
              <Link href="/works" className="text-sm text-[#ff6b35] font-medium relative group">
                Gallery
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff6b35]" />
              </Link>
              <Link href="/creators" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Creators
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/contest" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                Contest
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
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
                作品ギャラリー
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Whiskersで生まれたUGC作品の数々
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">部門</span>
            </div>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  selectedDepartment === dept.id
                    ? "bg-[#1a1a2e] text-white shadow-lg shadow-[#1a1a2e]/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#ff6b35] hover:text-[#ff6b35] hover:shadow-md"
                }`}
              >
                {dept.icon && <span className="text-lg">{dept.icon}</span>}
                <span className="font-medium">{dept.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredWorks.map((work) => (
              <Link key={work.id} href={`/works/${work.id}`}>
                <div
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                  onMouseEnter={() => setHoveredWork(work.id)}
                  onMouseLeave={() => setHoveredWork(null)}
                >
                  {/* Thumbnail */}
                  <div className="aspect-[9/16] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-[#ff6b35]/5 group-hover:to-[#4ecdc4]/5 transition-all duration-500">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{work.thumbnail}</span>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-16 h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 ${
                      hoveredWork === work.id ? "scale-110" : "scale-100"
                    }`}>
                      <Play className="w-6 h-6 text-[#1a1a2e] ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {work.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] text-white shadow-lg">
                        <Award className="w-3.5 h-3.5" />
                        注目作品
                      </div>
                    </div>
                  )}

                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-[#4ecdc4] transition-colors">
                      {work.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <span className="font-medium">{work.brand}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          {(work.views / 1000).toFixed(1)}k
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" fill="currentColor" />
                          {work.likes}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-white/70">
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
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <p className="text-gray-500 text-lg">該当する作品がありません</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: ugcWorks.length, label: "採用作品", suffix: "" },
              { value: 4, label: "参加企業", suffix: "" },
              { value: 6, label: "活躍クリエイター", suffix: "" },
              { value: 58.5, label: "総再生回数", suffix: "k" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35]/20 to-[#4ecdc4]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#1a1a2e] to-[#ff6b35] bg-clip-text text-transparent mb-2">
                      {stat.value}{stat.suffix}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#2a2a3e] to-[#1a1a2e]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4ecdc4]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-[0.1em]">
            あなたの商品もUGCで広がりませんか？
          </h2>
          <p className="text-white/80 mb-10 text-lg max-w-2xl mx-auto">
            コンテストを開催して、クリエイターの創造力を解放しましょう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contest"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              コンテストを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium border-2 border-white/30 text-white hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
            >
              お問い合わせ
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
