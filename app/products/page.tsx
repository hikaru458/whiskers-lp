"use client";

import Link from "next/link";
import { ArrowLeft, Gift, Calendar, Users, ArrowRight, Plus, Film, Palette, PenTool, Music } from "lucide-react";

// モックデータ - 企業登録商品
const products = [
  {
    id: 1,
    brand: "BeautyLab",
    name: "オーガニック美容液",
    image: "💧",
    category: "美容・スキンケア",
    description: "自然由来成分100%の美容液。使い心地や効果を伝える作品を募集しています。",
    requestTypes: ["video", "illustration"],
    prize: 30000,
    deadline: "2024年4月15日",
    participants: 12,
    color: "#ff6b35",
  },
  {
    id: 2,
    brand: "FitPro",
    name: "プロテインバー",
    image: "🍫",
    category: "健康食品",
    description: "高タンパク低糖質のプロテインバー。トレーニングシーンでの使用感を伝えてください。",
    requestTypes: ["video", "music"],
    prize: 30000,
    deadline: "2024年4月20日",
    participants: 8,
    color: "#4ecdc4",
  },
  {
    id: 3,
    brand: "TechStart",
    name: "スマートウォッチ",
    image: "⌚",
    category: "テクノロジー",
    description: "次世代スマートウォッチ。機能紹介動画や商品イラストを募集しています。",
    requestTypes: ["video", "design", "illustration"],
    prize: 50000,
    deadline: "2024年4月30日",
    participants: 15,
    color: "#ff6b35",
  },
  {
    id: 4,
    brand: "CafeMori",
    name: "オリジナルブレンドコーヒー",
    image: "☕",
    category: "飲料",
    description: "厳選豆のスペシャルティコーヒー。カフェの雰囲気とともに紹介してください。",
    requestTypes: ["video", "music", "illustration"],
    prize: 25000,
    deadline: "2024年5月10日",
    participants: 20,
    color: "#4ecdc4",
  },
  {
    id: 5,
    brand: "HomeStyle",
    name: "アロマキャンドル",
    image: "🕯️",
    category: "インテリア・雑貨",
    description: "天然アロマの癒しキャンドル。リラックスシーンでの使用感を伝える作品を。",
    requestTypes: ["video", "illustration", "music"],
    prize: 30000,
    deadline: "2024年4月25日",
    participants: 15,
    color: "#ff6b35",
  },
  {
    id: 6,
    brand: "EcoLife",
    name: "サステナブルバッグ",
    image: "🛍️",
    category: "ファッション",
    description: "リサイクル素材のエコバッグ。環境配慮のメッセージを含めた作品を募集。",
    requestTypes: ["video", "design", "illustration"],
    prize: 35000,
    deadline: "2024年5月5日",
    participants: 10,
    color: "#4ecdc4",
  },
];

const requestTypeLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  video: { label: "動画", icon: <Film className="w-3 h-3" />, color: "#ff6b35" },
  design: { label: "HPデザイン", icon: <Palette className="w-3 h-3" />, color: "#4ecdc4" },
  illustration: { label: "イラスト", icon: <PenTool className="w-3 h-3" />, color: "#ff6b35" },
  music: { label: "音楽", icon: <Music className="w-3 h-3" />, color: "#4ecdc4" },
};

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

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1a1a2e] to-[#4a4a5e] bg-clip-text text-transparent">
                Whiskers
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                トップ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/works" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                ギャラリー
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/creators" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                クリエイター
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/contest" className="text-sm text-gray-600 hover:text-[#ff6b35] transition-colors relative group">
                コンテスト
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#ff6b35] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            トップに戻る
          </Link>
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-[#ff6b35]/10 text-[#ff6b35] rounded-full text-sm font-medium mb-4">
              Products
            </span>
            <h1 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-[0.1em]">
              <span className="bg-gradient-to-r from-[#1a1a2e] via-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent">
                商品紹介
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              企業が作品制作を希望している商品一覧です。
              興味のある商品を選んで、あなたのクリエイティブで魅力を伝えましょう。
            </p>
            
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#ff6b35]/10 to-[#ff8f5c]/10 rounded-full border border-[#ff6b35]/20">
              <span className="text-xl">🎁</span>
              <span className="text-[#ff6b35] font-medium">すべての商品は<strong>サンプル無料提供</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div 
                  className="h-32 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: `${product.color}10` }}
                >
                  {/* Gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${product.color}20, transparent)` }}
                  />
                  <div 
                    className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                  >
                    {product.image}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: `${product.color}15`,
                        color: product.color 
                      }}
                    >
                      {product.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <span>🎁</span>
                      サンプル無料
                    </span>
                  </div>

                  {/* Brand & Product Name */}
                  <h3 className="text-sm text-gray-500 mb-1">{product.brand}</h3>
                  <h2 style={{ fontFamily: 'var(--font-playfair), "Hiragino Mincho ProN W3", "Hiragino Mincho Pro W3", "Yu Mincho", serif' }} className="text-lg font-bold text-[#1a1a2e] mb-3">
                    {product.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Request Types */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.requestTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${requestTypeLabels[type].color}15`,
                          color: requestTypeLabels[type].color 
                        }}
                      >
                        {requestTypeLabels[type].icon}
                        {requestTypeLabels[type].label}
                      </span>
                    ))}
                  </div>

                  {/* Prize */}
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <Gift className="w-4 h-4" style={{ color: product.color }} />
                    </div>
                    <span className="font-bold text-lg" style={{ color: product.color }}>
                      賞金 ¥{product.prize.toLocaleString()}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-5 py-3 border-t border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>締切: {product.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{product.participants}人参加中</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full text-center py-3 rounded-full font-medium text-white transition-all hover:opacity-90 shadow-md hover:shadow-lg"
                    style={{ backgroundColor: product.color }}
                  >
                    サンプルを受け取って作品を作る
                    <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State / More Coming */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full text-gray-500 text-sm">
              <span>✨</span>
              <span>新しい商品は随時追加されます</span>
            </div>
            <Link 
              href="/contact"
              className="flex items-center justify-center gap-2 mt-6 text-[#ff6b35] hover:text-[#e55a2b] font-medium transition-colors group"
            >
              企業様はこちらから商品登録のお問い合わせ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA for Brands */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ff6b35]/10 to-[#4ecdc4]/10 rounded-bl-full" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">
                  企業様：商品を登録してクリエイターに依頼しませんか？
                </h3>
                <p className="text-gray-600">
                  あなたの商品を紹介する作品を複数のクリエイターから募集できます。
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#ff8f5c] text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                商品を登録する
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
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
