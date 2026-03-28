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

export default function ProductsPage() {
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

      {/* Hero Section */}
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
            <span className="text-4xl">📦</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e]">
              商品紹介
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mb-4">
            企業が作品制作を希望している商品一覧です。
            興味のある商品を選んで、あなたのクリエイティブで魅力を伝えましょう。
          </p>
          <div className="bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-xl p-4 mb-8">
            <p className="text-[#ff6b35] font-medium text-sm flex items-center gap-2">
              <span className="text-xl">🎁</span>
              すべての商品は<strong>サンプル無料提供</strong>！作品制作に必要な商品を企業から直接受け取れます
            </p>
          </div>

          {/* CTA for Brands */}
          <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#4ecdc4]/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">
                  企業様：商品を登録してクリエイターに依頼しませんか？
                </h3>
                <p className="text-gray-600 text-sm">
                  あなたの商品を紹介する作品を複数のクリエイターから募集できます。
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#ff6b35] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e55a2b] transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                商品を登録する
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div 
                  className="h-32 flex items-center justify-center"
                  style={{ backgroundColor: `${product.color}15` }}
                >
                  <div 
                    className="text-6xl"
                  >
                    {product.image}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
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
                  <h2 className="text-lg font-bold text-[#1a1a2e] mb-3">
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
                    <Gift className="w-4 h-4 text-[#ff6b35]" />
                    <span className="font-bold text-[#ff6b35]">
                      賞金 ¥{product.prize.toLocaleString()}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                    className="block w-full text-center py-3 rounded-full font-medium text-white transition-all hover:opacity-90"
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
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              新しい商品は随時追加されます。
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 mt-4 text-[#ff6b35] hover:underline"
            >
              企業様はこちらから商品登録のお問い合わせ
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
